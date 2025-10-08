import useSWR from "swr";
import axiosInstance, { endpoints } from "../utils/axios";
import { PermissionsResponse } from "../types/Permissions";
import { useEffect, useState, useMemo } from "react";
import { getPermissionsDB, setPermissionDB } from "../indexDB/permission";
import { PermissionAtom } from "../atoms/permission";
import { useAtom } from "jotai";
import { toast } from "sonner";

// 🧠 API fetcher
const fetcher = async (url: string) => {
  const res = await axiosInstance.get<PermissionsResponse>(url);
  return res.data;
};

export const usePermissions = () => {
  const [permissions, setPermissions] = useAtom(PermissionAtom);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // 🌐 Watch online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // 🚫 Skip SWR fetch if offline
  const shouldFetch = !isOffline;

  const { data, error, isValidating, mutate } = useSWR<PermissionsResponse>(
    shouldFetch ? endpoints.permission.getAll : null,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  // 🔹 Load permissions from IndexedDB (first)
  useEffect(() => {
    const loadPermissionsFromDB = async () => {
      const stored = await getPermissionsDB();
      if (stored?.length) {
        setPermissions(stored);
        if (isOffline) console.log("🟡 Loaded permissions from IndexedDB (offline)");
      }
    };
    loadPermissionsFromDB();
  }, [isOffline, setPermissions]);

  // 🔹 When API data arrives, update both state and IndexedDB
  useEffect(() => {
    if (data?.data && !isOffline) {
      const permissionsWithId = data.data.map((p) => ({
        ...p,
        id: p.id ?? Date.now(),
      }));
      setPermissions(permissionsWithId);
      permissionsWithId.forEach(setPermissionDB);
    }
  }, [data, isOffline, setPermissions]);

  // 🔹 Show toast when offline
  useEffect(() => {
    if (isOffline) {
      toast.warning("You’re offline. Showing cached permissions.");
    }
  }, [isOffline]);

  const memoizedValue = useMemo(
    () => ({
      permissions,
      isOffline,
      isLoading: shouldFetch && !data && !error,
      isError: !!error,
      isValidating,
      mutate,
      error: error?.message,
    }),
    [permissions, isOffline, shouldFetch, data, error, isValidating, mutate]
  );

  return memoizedValue;
};
