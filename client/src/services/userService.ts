import axios from "axios"
import type { IUser } from '../types'

const API = axios.create({
    baseURL: (import.meta.env.VITE_API_BASE) + "/api/users"
});

export const getUsers = async() : Promise<IUser[]> =>{
    const r = await API.get("/");
    return r.data
};
export const createUser = async(payload: IUser) : Promise<IUser>=>{
    const r = await API.post("/", payload)
    return r.data
};
export const updateUser = async(id: string, payload: IUser) : Promise<IUser>=>{
    const r = await API.put(`/${id}`, payload);
    return r.data
};
export const deleteUser = async(id:string) : Promise<void>=>{
    await API.delete(`/${id}`);
};

export const getDistances = async (latitude: number, longitude: number) => {
  const r = await axios.post((import.meta.env.VITE_API_BASE) + "/api/users/distance", { latitude, longitude });
  return r.data;
};
