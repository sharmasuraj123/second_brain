import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcons";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Link = "link",
  Document = "document",
}

export function CreateContentModal({ open, onClose }: ContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(
      `${backendUrl}/api/v1/content`,
      {
        link,
        type,
        title,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    alert("Content added");
    onClose();
  }

  return (
    <div onClick={onClose}>
      {open && (
        <div className="z-50 w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-slate-500/60 flex justify-center">
          <div
            onClick={(e) => e.stopPropagation()}
            className=" flex flex-col justify-center"
          >
            <span className="bg-white opacity-100 p-4 rounded  ">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input placeholder={"Title"} reference={titleRef} />
                <Input placeholder={"Link"} reference={linkRef} />
                <select
                  className="px-4 py-2 m-2 rounded border"
                  value={type}
                  onChange={(e) => setType(e.target.value as ContentType)}
                >
                  <option value={ContentType.Youtube}>YouTube</option>
                  <option value={ContentType.Twitter}>Twitter</option>
                  <option value={ContentType.Link}>Link</option>
                </select>
              </div>
              <div className="flex justify-center">
                <Button onClick={addContent} varient="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
