import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function useContent() {
  const [contents, setContents] = useState([]);
  
  const token = localStorage.getItem("token");

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/v1/content`, {
        headers: { Authorization: `${token}` },
      });
      const data = res.data.content;
      setContents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch content:", err);
      setContents([]);
    }
  }, [token]); 

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10 * 1000); 
    return () => clearInterval(interval);
  }, [refresh]);

  return { contents, refresh };
}
