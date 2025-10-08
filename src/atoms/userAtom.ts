import { atom, useAtom } from 'jotai';
import useSWR from 'swr';
import fetcher, { endpoints } from '../utils/axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearUserDB, getUserDB} from '../indexDB/user';
import { toast } from 'sonner';

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
  data: any;
}

export const userAtom = atom<User | null>(null);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

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

  // Load user from IndexedDB on mount
  useEffect(() => {
    const loadUserFromDB = async () => {
      try {
        const storedUser = await getUserDB();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    };
    loadUserFromDB();
  }, [setUser]);

  // Handle API response
  useEffect(() => {
    if (data?.data) {
      const userData = {
        ...data.data,
        id: data.data.id || `user-${Date.now()}`,
      };

      setUser(userData);
    }
  }, [data, setUser]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      getUserDB()
        .then(storedUser => {
          if (!storedUser) {
            setUser(null);
            clearUserDB().catch(err => console.error('useUser: Error clearing IndexedDB', err));
            navigate(endpoints.auth.signIn, { replace: true });
          }
        })
        .catch(err => {
          toast.error( err);
          setUser(null);
          navigate(endpoints.auth.signIn, { replace: true });
        });
    }
  }, [error, navigate, setUser]);

  useEffect(() => {
    const handleOnline = () => {
      console.warn('useUser: Network online');
    };
    const handleOffline = () => {
      console.warn('useUser: Network offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    user,
    isLoading,
    isError: !!error && !user,
    isOffline: !navigator.onLine,
  };
};