import classNames from "classnames";
import React from "react";

export const Button = ({ children, disabled, onClick, light }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "rounded transition duration-200",
        {
          "text-white bg-blue-500 hover:bg-blue-700 py-2 px-4": !light,
          "p-1 text-blue-500 hover:text-blue-700": light,
        }
      )}
    >
      {children}
    </button>
  );
};
