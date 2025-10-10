import { atom, useAtom } from "jotai";
import useSWR from "swr";
import fetcher, { endpoints } from "../utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUserDB, getUserDB, clearUserDB } from "../indexDB/user";

// -----------------------------
// Types
// -----------------------------
interface ApiResponse {
  success: boolean;
  authType: string;
  data: User;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  authType: string;
  data?: any;
}

// -----------------------------
// Jotai Atom (global user state)
// -----------------------------
export const userAtom = atom<User | null>(null);

// -----------------------------
// Hook: useUser()
// -----------------------------
export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  // Fetch user from API
  const { data, error, isLoading } = useSWR<ApiResponse>(
    endpoints.auth.me,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  // ✅ Load user from IndexedDB when app starts (offline mode)
  useEffect(() => {
    const loadUserFromDB = async () => {
      try {
        const storedUser = await getUserDB();
        if (storedUser) {
          setUser(storedUser);
          console.log("✅ Loaded user from IndexedDB:", storedUser);
        }
      } catch (err) {
        console.error("❌ Failed to load user from IndexedDB:", err);
      }
    };
    loadUserFromDB();
  }, [setUser]);

  // ✅ Handle API response
  useEffect(() => {
    if (data?.data) {
      const userData: User = {
        ...data.data,
        id: data.data.id || `user-${Date.now()}`,
      };
      setUser(userData);
      setUserDB(userData); // Save to IndexedDB
    }
  }, [data, setUser]);

  // ❌ Handle API errors
  useEffect(() => {
    if (error) {
      (async () => {
        const storedUser = await getUserDB();
        if (!storedUser) {
          console.warn("No user in IndexedDB → Redirecting to login");
          await clearUserDB();
          setUser(null);
          navigate(endpoints.auth.signIn, { replace: true });
        }
      })().catch((err) => {
        console.error("useUser error:", err);
        toast.error("Session expired. Please log in again.");
        setUser(null);
        navigate(endpoints.auth.signIn, { replace: true });
      });
    }
  }, [error, navigate, setUser]);

  // 🌐 Network status logging (optional)
  useEffect(() => {
    const handleOnline = () => console.log("🔵 Online");
    const handleOffline = () => console.log("🔴 Offline");
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return {
    user,
    setUser,
    isLoading,
    isError: !!error && !user,
    isOffline: !navigator.onLine,
  };
};
