import React, { useState } from "react";
type InputFieldProps = {
  name: string;
  label: string;
  error?: Record<string, string> | null;
  type?: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, setField] = useState<InputFieldProps>(props);

  React.useEffect(() => {
    if (props !== field) {
      setField(props);
    }
  }, [props]);
  return (
    <div>
      <label htmlFor={field.name} className="p">
        {field.label}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={field.type ? field.type : "text"}
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={field.label}
      />
      {/* may make an error component for this */}
      <div>{!!field.error && field.error[field.name]}</div>
    </div>
  );
};
