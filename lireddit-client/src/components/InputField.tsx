import React, { useState } from "react";
type InputFieldProps = {
  name: string;
  placeholder: string;
  type?: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, setField] = useState<InputFieldProps>(props);

  return (
    <input
      id={field.name}
      name={field.name}
      type={field.type ? field.type : "text"}
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder={field.placeholder}
    />
  );
};
