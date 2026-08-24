import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../Components/Cards";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function SharedBrain() {
  const { hash } = useParams();
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/v1/brainsharelink/${hash}`)
      .then((res) => {
        setUsername(res.data.userName);
        setContents(Array.isArray(res.data.content) ? res.data.content : []);
      })
      .catch(() => {
        setError("This shared brain link is invalid or has been removed.");
      })
      .finally(() => setLoading(false));
  }, [hash]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">
        {username}'s Second Brain
      </h1>
      <div className="flex gap-4 flex-wrap">
        {contents.length === 0 && (
          <p className="text-gray-500 w-full text-center mt-10">
            This brain has no shared content yet.
          </p>
        )}
        {contents.map((item) => (
          <Card
            key={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            contentId={item._id}
            deleteAllowed={false}
          />
        ))}
      </div>
    </div>
  );
}
