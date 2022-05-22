import Link from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

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
        <Link href="/login">
          <a className="mr-2">Login</a>
        </Link>
        <Link href="/register">
          <a className="mr-2">Register</a>
        </Link>
      </div>
    );
  } else {
    body = (
      <div className="flex">
        <div className="mr-2 font-medium ">{data.me.username}</div>
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
      <div className="ml-auto">
        {body ? (
          body
        ) : (
          // client renders this first so it must match with server
          // server will always render this
          <div>
            <Link href="/login">
              <a className="mr-2">Login</a>
            </Link>
            <Link href="/register">
              <a className="mr-2">Register</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
