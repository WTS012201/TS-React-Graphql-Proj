import React from "react";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  const [errorMessage, seterrorMessage] = React.useState<Record<
    string,
    string
  > | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
      email: { value: string };
    };
    const values = {
      username: target.username.value,
      password: target.password.value,
      email: target.email.value,
    };
    const response = await register({ options: values });
    console.log("here");
    if (response.data?.register.errors) {
      const errors = toErrorMap(response.data.register.errors);
      seterrorMessage(errors);
    } else if (response.data?.register.user) {
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
                type="text"
                name="username"
                label="Username"
                error={errorMessage}
              />
              <InputField
                type="text"
                name="email"
                label="Email"
                error={errorMessage}
              />
              <InputField
                type="password"
                name="password"
                label="Password"
                error={errorMessage}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(Register);
