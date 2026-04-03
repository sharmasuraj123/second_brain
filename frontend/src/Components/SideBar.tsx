import { BrainlyIcon } from "../icons/BrainlyIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItems";

export function SideBar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="text-2xl flex pt-8 items-center">
        <div className="pr-2 cursor-pointer">
          <BrainlyIcon currentColor={"#9f50d3"} />
        </div>
        Brainly
      </div>
      <div className="pt-8 pl-4">
        <SideBarItem text="Twitter" icon={<TwitterIcon />} />
        <SideBarItem
          text="YouTube"
          icon={<YouTubeIcon currentColor={"#FF0000"} />}
        />
      </div>
    </div>
  );
}
