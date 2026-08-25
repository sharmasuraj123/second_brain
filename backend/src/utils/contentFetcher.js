import axios from "axios";
import * as cheerio from "cheerio";
import { YoutubeTranscript } from "youtube-transcript";

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
};

// Try to pull Open Graph / Twitter card meta tags as a fallback
// when full body-text scraping fails or returns too little.
function extractMetaFallback($) {
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogDesc = $('meta[property="og:description"]').attr("content");
  const twTitle = $('meta[name="twitter:title"]').attr("content");
  const twDesc = $('meta[name="twitter:description"]').attr("content");

  const title = ogTitle || twTitle;
  const desc = ogDesc || twDesc;

  if (!title && !desc) return null;

  return [title, desc].filter(Boolean).join(" — ");
}

// Fetch YouTube transcript, with an oEmbed metadata fallback
export async function fetchYouTubeContent(url) {
  try {
    const videoId = new URL(url).searchParams.get("v");
    if (!videoId) return "Could not extract video ID from URL.";

    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      const fullText = transcript.map((t) => t.text).join(" ");
      if (fullText && fullText.trim().length > 0) {
        return fullText.slice(0, 6000);
      }
    } catch (transcriptErr) {
      // fall through to oEmbed fallback below
    }

    // Fallback: no transcript available (captions disabled). Get at least
    // the title/channel via YouTube's free oEmbed endpoint so the AI has
    // something real to work with instead of nothing.
    try {
      const oembedRes = await axios.get(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
        { timeout: 6000 },
      );
      const { title, author_name } = oembedRes.data;
      return `Transcript unavailable for this video (captions may be disabled). Known info — Title: "${title}", Channel: "${author_name}".`;
    } catch (oembedErr) {
      return "Could not fetch YouTube transcript or video info. The video may have captions disabled or be unavailable.";
    }
  } catch (err) {
    return "Could not fetch YouTube transcript. The video may have transcripts disabled.";
  }
}

// Fetch article/link/document/linkedin content, with a meta-tag fallback
export async function fetchLinkContent(url) {
  try {
    const response = await axios.get(url, {
      timeout: 8000,
      headers: REQUEST_HEADERS,
      maxRedirects: 5,
    });

    const $ = cheerio.load(response.data);
    const $body = $.root().clone();

    // Remove unnecessary elements before extracting text
    $body.find("script, style, nav, footer, header, iframe, img").remove();

    const bodyText = $body
      .find("article, main, .content, .post, body")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();

    // If body scraping got a decent amount of text, use it
    if (bodyText && bodyText.length > 150) {
      return bodyText.slice(0, 6000);
    }

    // Fallback: many sites (LinkedIn included) block full scraping but
    // still expose Open Graph / Twitter card meta tags for link previews.
    const metaFallback = extractMetaFallback($);
    if (metaFallback) {
      return `Full page content was not accessible (site may require login or block scraping). Preview info found: ${metaFallback}`;
    }

    return bodyText
      ? bodyText.slice(0, 6000)
      : "Could not extract content from this link.";
  } catch (err) {
    return "Could not fetch content from this URL. The site may block automated requests.";
  }
}

// Fetch Twitter/X post content via Twitter's free, keyless oEmbed endpoint
export async function fetchTwitterContent(url) {
  try {
    const cleanUrl = url.replace("x.com", "twitter.com");
    const res = await axios.get(
      `https://publish.twitter.com/oembed?url=${encodeURIComponent(cleanUrl)}&omit_script=true`,
      { timeout: 6000 },
    );

    const html = res.data?.html;
    const author = res.data?.author_name;

    if (!html) {
      return `This is a Twitter/X post by ${author || "an unknown author"}. URL: ${url}. Full text could not be retrieved.`;
    }

    // The oEmbed response is a small HTML snippet containing the tweet text.
    // Strip the markup down to plain text.
    const $ = cheerio.load(html);
    $("script").remove();
    const text = $("blockquote").text().replace(/\s+/g, " ").trim();

    return text
      ? `Tweet by ${author || "unknown"}: "${text}"`
      : `This is a Twitter/X post by ${author || "an unknown author"}. URL: ${url}. Full text could not be retrieved.`;
  } catch (err) {
    return `This is a Twitter/X post. URL: ${url}. Note: the tweet's content could not be fetched (it may be deleted, private, or from a protected account). Please refer to the original link for full content.`;
  }
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
