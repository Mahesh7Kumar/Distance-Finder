import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<Props> = ({ label, ...rest }) => (
  <label className="block text-sm">
    {label && <div className="text-xs text-slate-300 mb-1">{label}</div>}
    <input
      {...rest}
      className="w-full px-3 py-2 rounded-md bg-slate-800 border text-amber-50 border-slate-700 focus:border-pink-500 outline-none"
    />
  </label>
);
