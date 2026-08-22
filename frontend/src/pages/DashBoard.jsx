import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "../Components/Button";
import { Card } from "../Components/Cards";
import { SideBar } from "../Components/SideBar";
import { CreateContentModal } from "../Components/CreateContentModal";
import { SearchBar } from "../Components/SearchBar"; 
import { AiChatPanel } from "../Components/AiChatPanel";

import { PlusIcon } from "../icons/PlusIcons";
import { ShareIcon } from "../icons/ShareIcon";

import { useContent } from "../Components/contentContext";
import { useSearch } from "../hooks/useSearch";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const { contentType } = useParams();
  const { contents, refresh } = useContent();

  const { query, setQuery, results } = useSearch(contents);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const filteredContents = contentType
    ? results.filter((item) => item.type === contentType)
    : results;

  async function handleShareBrain() {
    setShareLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") } },
      );
      const hash = res.data.hash;
      const shareUrl = `${window.location.origin}/share/${hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert(`Share link copied!\n\n${shareUrl}`);
    } catch (err) {
      alert("Failed to generate share link.");
    } finally {
      setShareLoading(false);
    }
  }

  return (
    <div>
      <SideBar />

      <div
        className={`p-4 min-h-screen bg-gray-100 border-2 transition-all duration-300 ${chatOpen ? "ml-72 mr-96" : "ml-72"}`}
      >
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="flex justify-between items-center flex-wrap gap-4">
          <SearchBar
            query={query}
            setQuery={setQuery}
            resultsCount={filteredContents.length}
            totalCount={contents.length}
          />

          <div className="flex gap-2">
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                chatOpen
                  ? "bg-purple-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-purple-50"
              }`}
            >
              🧠 {chatOpen ? "Close AI" : "Ask AI"}
            </button>

            <Button
              varient="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => setModalOpen(true)}
            />
            <Button
              varient="secondary"
              text={shareLoading ? "Generating..." : "Share Brain"}
              startIcon={<ShareIcon />}
              onClick={handleShareBrain}
              loading={shareLoading}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold capitalize mt-6 text-gray-800">
          {contentType ? `${contentType}s` : "All Content"}
        </h1>

        <div className="flex gap-4 mt-6 flex-wrap">
          {filteredContents.length === 0 && (
            <p className="text-gray-500 mt-10 w-full text-center">
              {query
                ? `No results for "${query}"`
                : `No ${contentType ?? "content"} found. Click "Add Content" to get started!`}
            </p>
          )}

          {filteredContents.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              link={item.link}
              type={item.type}
              contentId={item._id}
              deleteAllowed={true}
            />
          ))}
        </div>
      </div>

      <AiChatPanel
        contents={contents}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}
