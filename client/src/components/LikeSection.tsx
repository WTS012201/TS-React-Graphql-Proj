import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";
import Spinner from "./Spinner";

type PostField = {
  post: PostSnippetFragment;
};

export const LikeSection: React.FC<PostField> = ({ post }) => {
  const [liked, setLiked] = React.useState<Boolean | null>(null);
  const [, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = React.useState<
    "like-lo" | "unlike-lo" | "not-lo"
  >("not-lo");
  return (
    <div className="min-w-max flex flex-col justify-center items-center">
      {loadingState === "not-lo" ? (
        <div className="mr-2 min-w-max flex flex-col justify-center items-center">
          <button
            className="border-2"
            onClick={async () => {
              setLiked(liked ? null : true);
              setLoadingState("like-lo");
              await vote({
                postId: post.id,
                value: 1,
              });
              setLoadingState("not-lo");
            }}
          >
            <ArrowUpIcon
              className={`h-5 w-5 ${
                liked === true ? "text-blue-500" : "text-zinc-500"
              }`}
            />
          </button>
          {post.points}
          <button
            className="border-2"
            onClick={async () => {
              setLiked(liked === false ? null : false);
              setLoadingState("unlike-lo");
              await vote({
                postId: post.id,
                value: -1,
              });
              setLoadingState("not-lo");
            }}
          >
            <ArrowDownIcon
              className={`h-5 w-5 ${
                liked === false ? "text-red-500" : "text-zinc-500"
              }`}
            />
          </button>
        </div>
      ) : (
        <Spinner className="h-5 w-5 mr-3" />
      )}
    </div>
  );
};

export default LikeSection;
