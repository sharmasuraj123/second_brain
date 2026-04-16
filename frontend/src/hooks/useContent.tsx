import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "link" | "document";
  userId: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const token = localStorage.getItem("token");

  const refresh = useCallback(() => {
    axios
      .get(`${backendUrl}/api/v1/content`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setContents(res.data.content);
      })
      .catch((err) => {
        console.error("Failed to fetch content:", err);
      });
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return { contents, refresh };
}
