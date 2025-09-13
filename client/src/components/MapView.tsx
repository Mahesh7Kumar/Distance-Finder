import React from "react";
import type { IUser } from "../types";
import { haversineDistance } from "@/utils/distance";

interface Props {
  center: { latitude: number; longitude: number };
  users: IUser[];
  maxRadiusKm?: number;
}

export const MapView: React.FC<Props> = ({ center, users, maxRadiusKm = 30 }) => {
  const data = users.map(u => {
    const d = haversineDistance(center.latitude, center.longitude, u.latitude, u.longitude);
    return { ...u, distanceKm: d };
  });
// map distance 
  const maxD = Math.max(...data.map(d => d.distanceKm), maxRadiusKm);
  const size = 600;
  const cx = size / 2;
  const cy = size / 2;
  const scale = (size / 2 - 60) / maxD;

  const toPoint = (lat: number, lon: number) => {
    const dx = lon - center.longitude;
    const dy = lat - center.latitude;

    
    const ang = Math.atan2(dy, dx);
    const dist = haversineDistance(center.latitude, center.longitude, lat, lon);
    const r = dist * scale;
    return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang), r, dist };
  };
  return (
     <div className="bg-slate-900 rounded-md p-3 border border-slate-500">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="400" className="rounded">
        {/* translucent circle */}
        <circle cx={cx} cy={cy} r={maxRadiusKm * scale} fill="rgba(255,100,150,0.08)" stroke="rgba(255,100,150,0.25)" strokeWidth={2} />
        {/* center point */}
        <circle cx={cx} cy={cy} r={8} fill="#ff5c8a" />
        <text x={cx + 12} y={cy - 12} fontSize={21} fill="#ff9fb5">You</text>

        {/* users */}
        {data.map(u => {
          const p = toPoint(u.latitude, u.longitude);
          const small = 6;
          return (
            <g key={u._id}>
              <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" />
              <circle cx={p.x} cy={p.y} r={small} fill="#8bd3ff" stroke="#7cc0ff" />
              <text x={p.x + 8} y={p.y - 6} fontSize={21} fill="#cfefff">{u.name} ({p.dist.toFixed(2)} km)</text>
            </g>
          );
        })}
      </svg>
    </div>
  )
}