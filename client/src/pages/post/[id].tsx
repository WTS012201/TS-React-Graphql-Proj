import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { usePostQuery } from "../../generated/graphql";
import Head from "next/head";
import { NavBar } from "../../components/NavBar";
export const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (fetching) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!data?.post) {
    return (
      <div>
        <NavBar />
        <div>Could not find post</div>
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <div className="m-auto w-1/2">
        <h1 className="text-5xl font-bold mt-4">{data.post.title}</h1>
        <div className="mt-4">{data.post.text}</div>
      </div>
    </div>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
