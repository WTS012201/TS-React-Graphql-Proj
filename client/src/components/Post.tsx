import React from "react";
import LikeSection from "./LikeSection";

type PostField = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  text: string;
  points: number;
  creator: {
    username: string;
    id: number;
  };
};
const Post: React.FC<PostField> = (props) => {
  const [liked, setLiked] = React.useState<Boolean | null>(null);

  return (
    <div key={props.id} className="p-2 shadow-md mt-2 border-2 flex">
      <LikeSection points={props.points} />
      <div>
        <h1 className=" font-medium text-lg">{props.title}</h1>
        <div>posted by {props.creator.username}</div>
        <p className="mt-1">{props.text}</p>
      </div>
    </div>
  );
};
export default Post;
