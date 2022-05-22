import React from "react";

type PostField = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  text: string;
};
const Post: React.FC<PostField> = (props) => {
  return (
    <div key={props.id} className="p-2 shadow-md mt-2 border-2">
      <h1 className=" font-medium text-lg">{props.title}</h1>
      <p className="mt-1">{props.text}</p>
    </div>
  );
};
export default Post;
