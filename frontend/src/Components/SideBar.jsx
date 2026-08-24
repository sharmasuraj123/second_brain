import { useNavigate } from "react-router-dom";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { BrainlyIcon } from "../icons/BrainlyIcon";
import { LinkedinIcon } from "../icons/LinkdinIcon";
import { SideBarItem } from "./SideBarItems";
import { AllIcon } from "../icons/ALLIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { UserProfile } from "./UserProfile";

export function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 flex flex-col justify-between">
      <div className="flex-1">
        <div
          className="text-2xl flex pt-8 items-center cursor-pointer"
          onClick={() => navigate("/Dashboard")}
        >
          <div className="pr-2">
            <BrainlyIcon currentColor={"#9f50d3"} />
          </div>
          Second Brain
        </div>

        <div className="pt-8 pl-4 flex flex-col gap-2">
          <div
            onClick={() => navigate("/Dashboard")}
            className="cursor-pointer"
          >
            <SideBarItem text="All Content" icon={<AllIcon />} />
          </div>
          <div
            onClick={() => navigate("/Dashboard/twitter")}
            className="cursor-pointer"
          >
            <SideBarItem text="Twitter" icon={<TwitterIcon />} />
          </div>
          <div
            onClick={() => navigate("/Dashboard/youtube")}
            className="cursor-pointer"
          >
            <SideBarItem
              text="YouTube"
              icon={<YouTubeIcon currentColor={"#FF0000"} />}
            />
          </div>
          <div
            onClick={() => navigate("/Dashboard/linkedin")}
            className="cursor-pointer"
          >
            <SideBarItem text="Linkedin" icon={<LinkedinIcon />} />
          </div>
          <div
            onClick={() => navigate("/Dashboard/link")}
            className="cursor-pointer"
          >
            <SideBarItem text="Links" icon={<LinkIcon />} />
          </div>
          <div
            onClick={() => navigate("/Dashboard/document")}
            className="cursor-pointer"
          >
            <SideBarItem text="Documents" icon={<DocumentIcon />} />
          </div>
        </div>
      </div>

      <div className="mb-6 mr-6">
        <UserProfile />
      </div>
    </div>
  );
}
