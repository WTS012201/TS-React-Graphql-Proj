import Link from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <Link href="/login">
          <a className="mr-2">Login</a>
        </Link>
        <Link href="/register">
          <a className="mr-2">Register</a>
        </Link>
      </>
    );
  } else {
    body = (
      <div className="flex">
        <div className="mr-2 font-medium ">{data.me.username}</div>
        <Link href="">
          <a className="font-medium text-gray-500 hover:text-blue-500">
            logout
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-amber-100 p-1 flex">
      <div className="ml-auto">{body}</div>
    </div>
  );
};
