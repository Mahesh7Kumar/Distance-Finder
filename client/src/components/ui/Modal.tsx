import React from "react";

export const Modal: React.FC<{ open: boolean; onClose: () => void; title?: string; children?: React.ReactNode }> = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl p-4">
        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-amber-50 font-semibold">{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
