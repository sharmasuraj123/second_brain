
import { Router } from "express";
import { fetchCardContent } from "../utils/contentFetcher.js";
import Groq from "groq-sdk";

const router = Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { messages, cards } = req.body;

  if (!messages || !cards) {
    res.status(400).json({ error: "messages and cards are required" });
    return;
  }

  try {
    // Build basic cards context (titles + types + links)
    const basicContext = cards
      .map(
        (c, i) =>
          `${i + 1}. Title: "${c.title}" | Type: ${c.type} | Link: ${c.link} | ID: ${c._id}`,
      )
      .join("\n");

    // Check if user is asking about a specific card
    const lastUserMessage = (messages[messages.length - 1]?.content ?? "").toLowerCase();

    // Find if any card title matches the query
    const mentionedCard = cards.find(
      (card) =>
        lastUserMessage.includes(card.title.toLowerCase()) ||
        lastUserMessage.includes(card.type.toLowerCase()),
    );

    let enrichedContext = "";

    if (mentionedCard) {
      console.log(`Fetching content for: ${mentionedCard.title}`);
      const cardContent = await fetchCardContent(
        mentionedCard.type,
        mentionedCard.link,
      );
      enrichedContext = `
DETAILED CONTENT FOR "${mentionedCard.title}" (${mentionedCard.type}):
${cardContent}
      `;
    }

    const referenceWords = [
      "this video",
      "this article",
      "this tweet",
      "this link",
      "this post",
      "the video",
      "the article",
      "it",
      "this",
    ];

    const isReferencing = referenceWords.some((word) =>
      lastUserMessage.includes(word),
    );

    if (!mentionedCard && isReferencing && messages.length > 1) {
      const previousMessages = messages.slice(0, -1);
      for (const msg of previousMessages.reverse()) {
        const matchedCard = cards.find((card) =>
          msg.content.toLowerCase().includes(card.title.toLowerCase()),
        );
        if (matchedCard) {
          const cardContent = await fetchCardContent(
            matchedCard.type,
            matchedCard.link,
          );
          enrichedContext = `
DETAILED CONTENT FOR "${matchedCard.title}" (${matchedCard.type}):
${cardContent}
          `;
          break;
        }
      }
    }

    const systemPrompt = `You are a helpful assistant for a "Second Brain" app.

The user has saved the following content in their second brain:
${basicContext}

${enrichedContext ? enrichedContext : ""}

IMPORTANT RULES:
- Answer based on the content above
- If detailed content is provided for a card, use it to give thorough answers
- If asked to summarize a YouTube video, use the transcript provided
- If asked about something not in their saved content, say "I don't see anything about that in your second brain"
- Keep answers helpful and well structured
- When referencing a card, mention its title and type`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    });

    res.json({
      reply:
        response.choices[0]?.message?.content ||
        "Sorry, I could not generate a response.",
    });
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;