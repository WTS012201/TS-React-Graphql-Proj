import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import Spinner from "./Spinner";

interface NavBarProps {}

//  render on client side
export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  }); //  4:09
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    //  logout will set me to null and go to else
    body = (
      <div>
        <NextLink href="/login">
          <a className="mr-2">Login</a>
        </NextLink>
        <NextLink href="/register">
          <a className="mr-2">Register</a>
        </NextLink>
      </div>
    );
  } else {
    body = (
      <div className="flex h-max items-center">
        <NextLink href="/create-post">
          <a className="mr-2 border-2 bg-slate-50 rounded-lg p-1">
            Create Post
          </a>
        </NextLink>
        <div className="mr-2 font-medium">{data.me.username}</div>
        <button
          disabled={logoutFetching}
          onClick={() => {
            console.log("TEST");
            logout();
          }}
          className="font-medium text-gray-500 hover:text-blue-500"
        >
          logout
        </button>
      </div>
    );
  }
  return (
    <div className="bg-amber-100 p-1 flex sticky top-0 z-1">
      <div className="flex self-center m-auto flex-1 max-w-4xl">
        <NextLink href="/">
          <a className="text-5xl font-medium">Coolsite</a>
        </NextLink>
        <div className="ml-auto flex items-center">
          {body ? (
            body
          ) : (
            // client renders this first so it must match with server
            // server will always render this
            <div>
              <NextLink href="/login">
                <a className="mr-2">Login</a>
              </NextLink>
              <NextLink href="/register">
                <a className="mr-2">Register</a>
              </NextLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
