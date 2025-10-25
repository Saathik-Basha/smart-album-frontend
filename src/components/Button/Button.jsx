import React from "react";

export const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};
