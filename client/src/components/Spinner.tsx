import React from "react";

type SpinnerField = {
  className?: string;
};

const Spinner: React.FC<SpinnerField> = ({ className }) => {
  if (className) {
    className +=
      " border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent";
  } else {
    className =
      "w-10 h-10 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent";
  }
  return (
    <div>
      <div className={className}></div>
    </div>
  );
};
export default Spinner;
