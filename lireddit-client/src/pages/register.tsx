import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const [errorMsg, setErrorMsg] = React.useState("");
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const response = await register({
      username: target.username.value,
      password: target.password.value,
    });
    if (response.data?.register.errors) {
      const errors = response.data.register.errors;
      setErrorMsg("");

      errors.forEach(({ field, message }) => {
        setErrorMsg(errorMsg + " " + message);
      });
      console.log(errorMsg);
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
            onSubmit={login}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <InputField type="text" name="username" label="Username" />
              <InputField type="password" name="password" label="Password" />
            </div>
            <div>{errorMsg}</div>
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
