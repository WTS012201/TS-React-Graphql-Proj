import React from "react";
import { InputField } from "../components/InputField";

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    console.log(target.email.value, target.password.value);
  };
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form
            className="mt-8 space-y-6"
            action=""
            method="POST"
            onSubmit={login}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <InputField
                  name="email"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <InputField
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
