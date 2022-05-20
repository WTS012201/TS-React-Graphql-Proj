import React from "react";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

export const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const [complete, setComplete] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    await forgotPassword({ email: target.email.value });
    setComplete(true);
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
            <div>
              {complete ? (
                <div>
                  If an account with that email exists, we sent you an email
                </div>
              ) : (
                <div>
                  <div className="rounded-md shadow-sm -space-y-px">
                    <InputField type="email" name="email" label="Email" />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3 "></span>
                    Forgot Password
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(ForgotPassword);
