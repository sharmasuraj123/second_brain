import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [contents, setContents] = useState([]);

  const refresh = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/v1/content`, {
        headers: { Authorization: token },
      });
      const data = res.data.content;
      setContents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch content:", err);
      setContents([]);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ contents, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context)
    throw new Error("useContent must be used inside ContentProvider");
  return context;
}
