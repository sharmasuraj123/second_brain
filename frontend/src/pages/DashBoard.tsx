import { Button } from "../Components/Button";
import { Card } from "../Components/Cards";
import { PlusIcon } from "../icons/PlusIcons";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "../Components/CreateContentModal";
import { useState } from "react";
import { SideBar } from "../Components/SideBar";
export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);

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
        <div className="flex justify-end gap-4 ">
          <Button
            varient="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
            onClick={() => setModalOpen(true)}
          ></Button>
          <Button
            varient="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          ></Button>
        </div>

        <div className="flex gap-4">
          <Card
            title="new posts"
            link="https://x.com/heyshrutimishra/status/2039953723791995100"
            type="twitter"
          />
          <Card
            title="best python course"
            link="https://www.youtube.com/watch?v=Rq5gJVxz55Q"
            type="youtube"
          />
        </div>
      </div>
    </div>
  );
}


