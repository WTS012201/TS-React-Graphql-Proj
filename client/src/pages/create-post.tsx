import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      text: { value: string };
    };
    const { error } = await createPost({
      input: { title: target.title.value, text: target.text.value },
    });

    if (!error) {
      router.push("/");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form
            className="mt-8 space-y-6"
            action=""
            method="POST"
            onSubmit={onSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <InputField type="text" name="title" label="Title" />
              <InputField textarea type="text" name="text" label="Body" />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(CreatePost);
