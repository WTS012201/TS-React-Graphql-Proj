import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";
import React from "react";

export const LikeSection: React.FC<{ points: number }> = ({ points }) => {
  const [liked, setLiked] = React.useState<Boolean | null>(null);
  return (
    <div className="mr-2 min-w-max flex flex-col justify-center items-center">
      <button
        className="border-2"
        onClick={() => {
          setLiked(liked ? null : true);
        }}
      >
        <ArrowUpIcon
          className={`h-5 w-5 ${
            liked === true ? "text-blue-500" : "text-zinc-500"
          }`}
        />
      </button>
      {points}
      <button
        className="border-2"
        onClick={() => {
          setLiked(liked === false ? null : false);
        }}
      >
        <ArrowDownIcon
          className={`h-5 w-5 ${
            liked === false ? "text-red-500" : "text-zinc-500"
          }`}
        />
      </button>
    </div>
  );
};

export default LikeSection;
