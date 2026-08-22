import axios from "axios";
import * as cheerio from "cheerio";
import { YoutubeTranscript } from "youtube-transcript";

// Fetch YouTube transcript
export async function fetchYouTubeContent(url) {
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (!videoId) return "Could not extract video ID from URL.";

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcript.map((t) => t.text).join(" ");

    return fullText.slice(0, 6000);
  } catch (err) {
    return "Could not fetch YouTube transcript. The video may have transcripts disabled.";
  }
}

// Fetch article/link content
export async function fetchLinkContent(url) {
  try {
    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    $("script, style, nav, footer, header, iframe, img").remove();

    const text = $("article, main, .content, .post, body")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 6000);

    return text || "Could not extract content from this link.";
  } catch (err) {
    return "Could not fetch content from this URL.";
  }
}

// Fetch Twitter/X post content
export async function fetchTwitterContent(url) {
  return `This is a Twitter/X post. URL: ${url}. 
  Note: Twitter content cannot be fetched directly due to restrictions. 
  Please refer to the original link for full content.`;
}

// Main function — decides which fetcher to use based on type
export async function fetchCardContent(type, url) {
  switch (type) {
    case "youtube":
      return await fetchYouTubeContent(url);
    case "link":
    case "document":
    case "linkedin":
      return await fetchLinkContent(url);
    case "twitter":
      return await fetchTwitterContent(url);
    default:
      return "Unknown content type.";
  }
}
