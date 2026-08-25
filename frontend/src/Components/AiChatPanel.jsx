import { useState, useRef, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function AiChatPanel({ contents, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/ai/chat`,
        {
          messages: updatedMessages,
          cards: contents,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      const assistantMessage = {
        role: "assistant",
        content: response.data.reply,
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: `Error: ${err?.response?.data?.error || "Something went wrong. Please try again."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-dark-surface shadow-2xl border-l border-dark-border flex flex-col z-50">
      <div className="flex items-center justify-between px-4 py-3 bg-dark-surfaceAlt border-b border-dark-border text-white">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <div>
            <h2 className="font-display font-semibold text-sm">
              Ask your Second Brain
            </h2>
            <p className="text-xs text-gray-400">
              {contents.length} cards loaded • Powered by Groq
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10 space-y-2">
            <p className="text-3xl">🧠</p>
            <p className="text-sm font-medium text-gray-300">
              Ask anything about your saved content
            </p>
            <div className="text-xs text-left bg-dark-surfaceAlt border border-dark-border rounded-lg p-3 space-y-2 mt-4">
              <p className="font-semibold text-gray-400 mb-2">Try asking:</p>
              <p
                className="text-accent cursor-pointer hover:text-accent-hover hover:underline"
                onClick={() => setInput("What YouTube videos do I have?")}
              >
                → What YouTube videos do I have?
              </p>
              <p
                className="text-accent cursor-pointer hover:text-accent-hover hover:underline"
                onClick={() => setInput("Summarize what topics I am learning")}
              >
                → Summarize what topics I am learning
              </p>
              <p
                className="text-accent cursor-pointer hover:text-accent-hover hover:underline"
                onClick={() =>
                  setInput("Find me anything related to JavaScript")
                }
              >
                → Find me anything related to JavaScript
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-br-none"
                  : "bg-dark-surfaceAlt text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-surfaceAlt text-gray-400 px-3 py-2 rounded-2xl rounded-bl-none text-sm">
              <span className="animate-pulse">
                Fetching content & thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-dark-border">
        <div className="flex items-center gap-2 border-2 border-dark-border bg-dark-surfaceAlt rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-accent transition-all duration-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your saved content..."
            className="flex-1 outline-none text-sm text-white placeholder-gray-500 bg-transparent"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-accent text-white rounded-lg px-3 py-1 text-sm font-medium hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">
          Groq — free & fast ⚡
        </p>
      </div>
    </div>
  );
}
