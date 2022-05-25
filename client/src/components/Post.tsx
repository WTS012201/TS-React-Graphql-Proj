import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";
import LikeSection from "./LikeSection";

type PostField = {
  post: PostSnippetFragment;
};
const Post: React.FC<PostField> = ({ post }) => {
  const [liked, setLiked] = React.useState<Boolean | null>(null);

  return (
    <div key={post.id} className="p-2 shadow-md mt-2 border-2 flex">
      <LikeSection post={post} />
      <div>
        <h1 className=" font-medium text-lg">{post.title}</h1>
        <div>posted by {post.creator.username}</div>
        <p className="mt-1">{post.text}</p>
      </div>
    </div>
  );
};
export default Post;
