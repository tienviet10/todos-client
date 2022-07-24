import React from "react";

export const DisableButtonWithColorAndText = ({ buttonColor, buttonText }) => {
  return (
    <button
      disabled
      className={`py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {buttonText}
    </button>
  );
};
