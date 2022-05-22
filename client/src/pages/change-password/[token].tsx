import { GraphQLEnumValueExtensions } from "graphql";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage = () => {
  const [tokenError, setTokenError] = React.useState("");
  const [errorMessage, seterrorMessage] = React.useState<Record<
    string,
    string
  > | null>(null);
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      newPassword: { value: string };
    };

    const response = await changePassword({
      newPassword: target.newPassword.value,
      token: typeof router.query.token === "string" ? router.query.token : "",
    });
    if (response.data?.changePassword.errors) {
      const errors = toErrorMap(response.data.changePassword.errors);
      //  tok error
      if ("token" in errors) {
        setTokenError(errors.token);
      }
      seterrorMessage(errors);
    } else if (response.data?.changePassword.user) {
      seterrorMessage(null);
      router.push("/");
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form
            className="mt-8 space-y-6"
            action=""
            method="POST"
            onSubmit={onSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <InputField
                type="password"
                name="newPassword"
                label="New Password"
                error={errorMessage}
              />
            </div>
            <div>
              {tokenError ? (
                <div className="flex">
                  <div className="mr-1 text-red-600">{tokenError}</div>
                  <Link href="/forgot-password">
                    <a>click here to get a new one</a>
                  </Link>
                </div>
              ) : null}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Change Passowrd
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
