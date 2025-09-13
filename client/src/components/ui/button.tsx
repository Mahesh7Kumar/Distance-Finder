import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={`px-3 py-1.5 rounded-md bg-purple-700 hover:bg-blue-500 text-white text-sm ${className}`}
    >
      {children}
    </button>
  );
};
