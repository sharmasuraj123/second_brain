// import { Button } from "../Components/Button";
// import { Card } from "../Components/Cards";
// import { SideBar } from "../Components/SideBar";

// import { PlusIcon } from "../icons/PlusIcons";
// import { ShareIcon } from "../icons/ShareIcon";
// import { CreateContentModal } from "../Components/CreateContentModal";
// import { useEffect, useState } from "react";

// import { useContent } from "../hooks/useContent";
// import axios from "axios";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export function DashBoard() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [shareLoading, setShareLoading] = useState(false);
//   const { contents, refresh } = useContent();

//   useEffect(() => {
//     refresh();
//   }, [modalOpen,refresh]);

//   async function handleShareBrain() {
//     setShareLoading(true);
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/v1/brain/share`,
//         { share: true },
//         { headers: { Authorization: localStorage.getItem("token") } },
//       );
//       const hash = res.data.hash;
//       const shareUrl = `${window.location.origin}/share/${hash}`;
//       await navigator.clipboard.writeText(shareUrl);
//       alert(`Share link copied to clipboard!\n\n${shareUrl}`);
//     } catch (err) {
//       alert("Failed to generate share link. Please try again.");
//     } finally {
//       setShareLoading(false);
//     }
//   }

//   return (
//     <div>
//       <SideBar />
//       <div className="p-4 min-h-screen bg-gray-100 ml-72 border-2">
//         <CreateContentModal
//           open={modalOpen}
//           onClose={() => {
//             setModalOpen(false);
//           }}
//         />
//         <div className="flex justify-end gap-4 ">
//           <Button
//             varient="primary"
//             text="Add Content"
//             startIcon={<PlusIcon />}
//             onClick={() => setModalOpen(true)}
//           ></Button>
//           <Button
//             varient="secondary"
//             text={shareLoading ? "Generating..." : "Share Brain"}
//             startIcon={<ShareIcon />}
//             onClick={handleShareBrain}
//             loading={shareLoading}
//           />
//         </div>

//         <div className="flex gap-4 mt-10 flex-wrap">
//           {contents.length === 0 && (
//             <p className="text-gray-500 mt-10 w-full text-center">
//               No content yet. Click "Add Content" to get started!
//             </p>
//           )}
//           {contents.map((item: any) => (
//             <Card
//               key={item._id}
//               title={item.title}
//               link={item.link}
//               type={item.type}
//               contentId={item._id}
//               onDelete={refresh}
//               deleteAllowed={true}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Components
import { Button } from "../Components/Button";
import { Card } from "../Components/Cards";
import { SideBar } from "../Components/SideBar";
import { CreateContentModal } from "../Components/CreateContentModal";

// Icons
import { PlusIcon } from "../icons/PlusIcons";
import { ShareIcon } from "../icons/ShareIcon";

// Hooks
import { useContent } from "../hooks/useContent";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  const { contentType } = useParams();
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  const filteredContents = contentType
    ? contents.filter((item: any) => item.type === contentType)
    : contents;

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
      alert(`Share link copied to clipboard!\n\n${shareUrl}`);
    } catch (err) {
      alert("Failed to generate share link. Please try again.");
    } finally {
      setShareLoading(false);
    }
  }

  return (
    <div>
      <SideBar />

      <div className="p-4 min-h-screen bg-gray-100 ml-72 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <div className="flex justify-end gap-4">
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

        <h1 className="text-2xl font-bold capitalize mt-6 text-gray-800">
          {contentType ? `${contentType}s` : "All Content"}
        </h1>

        <div className="flex gap-4 mt-6 flex-wrap">
          {filteredContents.length === 0 && (
            <p className="text-gray-500 mt-10 w-full text-center">
              No {contentType ? contentType : "content"} found. Click "Add
              Content" to get started!
            </p>
          )}

          {filteredContents.map((item: any) => (
            <Card
              key={item._id}
              title={item.title}
              link={item.link}
              type={item.type}
              contentId={item._id}
              onDelete={refresh}
              deleteAllowed={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

