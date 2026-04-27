// import { DeleteIcon } from "../icons/DeleteIcon";

// import axios from "axios";
// import SharelinkIcon from "../icons/shareLinkIcon";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;
// interface CardProps {
//   title: string;
//   link: string;
//   type: "twitter" | "youtube" | "link";
//   contentId?: string;
//   onDelete?: () => void;
//   deleteAllowed?: boolean;
// }

// function getYouTubeEmbedUrl(url: string) {
//   try {
//     const videoId = new URL(url).searchParams.get("v");
//     return `https://www.youtube.com/embed/${videoId}`;
//   } catch {
//     return url;
//   }
// }

// export function Card({
//   title,
//   link,
//   type,
//   contentId,
//   onDelete,
//   deleteAllowed,
// }: CardProps) {
//   async function handleDelete() {
//     if (deleteAllowed) {
//       const confirmed = window.confirm(
//         `Are you sure you want to delete "${title}"?`,
//       );
//       if (!confirmed) return;
//     }

//     try {
//       if (deleteAllowed) {
//         await axios.delete(`${backendUrl}/api/v1/content/delete`, {
//           headers: { Authorization: localStorage.getItem("token") },
//           data: { contentId },
//         });
//         onDelete?.();
//       }
//     } catch (err) {
//       alert("Failed to delete content. Please try again.");
//     }
//   }

//   async function handleShare() {
//     try {
//       const response = await axios.get(
//         `${backendUrl}/api/v1/contentShare/${contentId}`,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         },
//       );
//       const originalLink = response.data.link;

//       await navigator.clipboard.writeText(originalLink);

//       alert("Original source link copied to clipboard!");
//     } catch (err) {
//       console.error(err);
//       alert("Could not copy the link.");
//     }
//   }

//   return (
//     <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 min-h-48 min-w-72 border overflow-y-auto max-h-72">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center text-md group relative overflow-hidden">
//           <h3 className="font-semibold text-lg text-gray-800 truncate w-40">
//             {title}
//           </h3>
//           <div className="absolute left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded px-2 py-1 z-10 max-w-xs break-words shadow-lg pointer-events-none">
//             {title}
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleShare}
//             className="text-gray-400 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
//             title="Copy Source Link"
//           >
//             <SharelinkIcon />
//           </button>

//           <button
//             onClick={handleDelete}
//             className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
//             title="Delete"
//           >
//             <DeleteIcon />
//           </button>
//         </div>
//       </div>

//       <div className="pt-4">
//         {type === "youtube" && (
//           <iframe
//             className="aspect-video w-full rounded-md"
//             src={getYouTubeEmbedUrl(link)}
//             title={title}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           />
//         )}
//         {type === "twitter" && (
//           <blockquote className="twitter-tweet max-h-48">
//             <a href={link.replace("x.com", "twitter.com")}></a>
//           </blockquote>
//         )}
//         {type === "link" && (
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block p-4 border rounded-md hover:bg-gray-100 transition"
//           >
//             <h3 className="font-semibold text-lg text-blue-600 underline">
//               {title}
//             </h3>
//             <p className="text-sm text-gray-500 break-all">{link}</p>
//           </a>
//         )}

//         {(type === "link" || type === "linkedin" || type === "document") && (
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block p-4 border rounded-md hover:bg-gray-100 transition border-gray-100"
//           >
//             <h3 className="font-semibold text-md text-purple-700 underline capitalize">
//               {title}
//             </h3>
//             <p className="text-xs text-gray-400 break-all mt-2 italic">
//               {link}
//             </p>
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }

import { DeleteIcon } from "../icons/DeleteIcon";
import axios from "axios";
import SharelinkIcon from "../icons/shareLinkIcon";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "link" | "linkedin" | "document";
  contentId?: string;
  onDelete?: () => void;
  deleteAllowed?: boolean;
}

// RESTORED: Your original YouTube URL helper
function getYouTubeEmbedUrl(url: string) {
  try {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return url;
  }
}

export function Card({
  title,
  link,
  type,
  contentId,
  onDelete,
  deleteAllowed,
}: CardProps) {
  async function handleDelete() {
    if (deleteAllowed) {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${title}"?`,
      );
      if (!confirmed) return;
    }

    try {
      if (deleteAllowed) {
        await axios.delete(`${backendUrl}/api/v1/content/delete`, {
          headers: { Authorization: localStorage.getItem("token") },
          data: { contentId },
        });
        onDelete?.();
      }
    } catch (err) {
      alert("Failed to delete content. Please try again.");
    }
  }

  async function handleShare() {
    try {
      const response = await axios.get(
        `${backendUrl}/api/v1/contentShare/${contentId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      const originalLink = response.data.link;

      await navigator.clipboard.writeText(originalLink);
      alert("Original source link copied to clipboard!");
    } catch (err) {
      console.error(err);
      alert("Could not copy the link.");
    }
  }

  return (
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 min-h-48 min-w-72 border overflow-y-auto max-h-72">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-md group relative overflow-hidden">
          <h3 className="font-semibold text-lg text-gray-800 truncate w-40">
            {title}
          </h3>
          <div className="absolute left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded px-2 py-1 z-10 max-w-xs break-words shadow-lg pointer-events-none">
            {title}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="text-gray-400 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
            title="Copy Source Link"
          >
            <SharelinkIcon />
          </button>

          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
            title="Delete"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="aspect-video w-full rounded-md"
            src={getYouTubeEmbedUrl(link)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet max-h-48">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {/* ADDED: Support for Linkedin, Link, and Document without changing your layout */}
        {(type === "link" || type === "linkedin" || type === "document") && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded-md hover:bg-gray-100 transition border-gray-100"
          >
            <h3 className="font-semibold text-md text-purple-700 underline capitalize">
              {title}
            </h3>
            <p className="text-xs text-gray-400 break-all mt-2 italic">
              {link}
            </p>
          </a>
        )}
      </div>
    </div>
  );
}