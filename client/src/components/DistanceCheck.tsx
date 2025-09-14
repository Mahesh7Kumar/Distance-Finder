import React, { useState } from "react";
import type { IUser } from "../types";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button.tsx";
import * as svc from "../services/userService";

interface Row {
  _id?: string;
  name: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export const DistanceCheck: React.FC<{
  initialLat?: number;
  initialLon?: number;
  onEditUser?: (u: IUser) => void;
  onDeleteUser?: (id: string) => void;
}> = ({ initialLat = 25.2048, initialLon = 55.2708, onEditUser, onDeleteUser }) => {
  const [lat, setLat] = useState(initialLat);
  const [lon, setLon] = useState(initialLon);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  const showDistances = async () => {
    setLoading(true);
    try {
      const data = await svc.getDistances(lat, lon);
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Input type="number" label="Your Latitude" value={lat} onChange={e => setLat(parseFloat(e.target.value) )} />
        <Input type="number" label="Your Longitude" value={lon} onChange={e => setLon(parseFloat(e.target.value) )} />
      </div>
      <div className="flex gap-2 mb-4">
        <Button onClick={showDistances}>Show Distances</Button>
      </div>

      {loading ? <div className="text-amber-50">Loading...</div> : (
        <div className="space-y-2 max-h-72 overflow-auto">
          {rows.length === 0 && <div className="text-sm text-slate-400">Press "Show Distances" to see list</div>}
          {rows.map(r => (
            <div key={r._id} className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-700">
              <div className="flex-1">
                <div className="font-medium text-amber-50">{r.name}</div>
                <div className="text-xs text-slate-400">Lat: {r.latitude} Lon: {r.longitude}</div>
                <div className="text-xs text-slate-300">
                  Distance: {typeof r.distance === "number" ? r.distance.toFixed(3) : "N/A"} km
                </div>

              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => onEditUser && onEditUser({ _id: r._id, name: r.name, latitude: r.latitude, longitude: r.longitude })} className="text-sm text-slate-200">Edit</button>
                <button onClick={() => onDeleteUser && onDeleteUser(r._id!)} className="text-sm text-pink-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
