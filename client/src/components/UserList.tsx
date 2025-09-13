import React from "react";
import type { IUser } from "../types";
import { Button } from "./ui/button.tsx";

interface Props {
  users: IUser[];
  onEdit: (u: IUser) => void;
  onDelete: (id: string) => void;
}

export const UserList: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="space-y-2">
      {users.map(u => (
        <div key={u._id} className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-700">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="text-sm text-amber-50 font-medium">{u.name}</div>
              <div className="text-xs text-slate-400">Lat: {u.latitude.toFixed(4)}</div>
              <div className="text-xs text-slate-400">Lon: {u.longitude.toFixed(4)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => onEdit(u)} className="bg-slate-700">Edit</Button>
            <Button onClick={() => onDelete(u._id!)} className="bg-pink-700">Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
