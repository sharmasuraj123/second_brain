import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function getYouTubeEmbedUrl(url: string) {
  const videoId = new URL(url).searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}`;
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-8 bg-white rounded-md border-gray-200 max-w-96 border min-h-48 min-w-72">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center ">
          <div className="text-gray-500 pr-2">
            <a href={link} target="_blank">
              <ShareIcon />
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon />
          </div>
        </div>
      </div>

      <div className="pt-4  w-full">
        {type === "youtube" && (
          <iframe
            className="w-full h-full"
            width="560"
            height="315"
            src={getYouTubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
