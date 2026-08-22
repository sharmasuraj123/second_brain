import Fuse from "fuse.js";
import { useMemo, useState } from "react";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "link" | "document" | "linkedin";
  userId: string;
}

export function useSearch(contents: Content[]) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(contents, {
      keys: ["title", "link", "type"],
      threshold: 0.4, 
      includeScore: true,
      minMatchCharLength: 2, 
    });
  }, [contents]);

  const results = useMemo(() => {
    if (!query || query.trim().length < 2) return contents;
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, contents]);

  return { query, setQuery, results };
}
