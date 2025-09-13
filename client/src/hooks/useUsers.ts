import { useEffect, useState } from "react";
import type { IUser } from "../types";
import * as svc from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const u = await svc.getUsers();
      setUsers(u);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return { users, setUsers, loading, refresh: fetch };
};
