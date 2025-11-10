import classNames from "classnames";
import React from "react";

export const Button = ({ children, disabled, onClick, light, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "rounded transition duration-200 flex items-center justify-center font-medium",
        {
          // Normal variant
          "text-white bg-blue-500 hover:bg-blue-700 py-2 px-4":
            !light && !disabled,
          // Disabled variant (dimmed)
          "text-white bg-blue-400 cursor-not-allowed py-2 px-4":
            !light && disabled,
          // Light variant
          "p-1 text-blue-500 hover:text-blue-700": light && !disabled,
          "p-1 text-blue-400 cursor-not-allowed": light && disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};
