import { atom, useAtom } from "jotai";
import useSWR from "swr";
import fetcher, { endpoints } from "../utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for redirect

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

    const { data, error, isLoading } = useSWR<ApiResponse>(endpoints.auth.me, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: true,
        errorRetryCount: 3,
    });
    useEffect(() => {
        if (data?.data) {
            setUser(data.data);
        }
    }, [data, setUser]);
    
    useEffect(() => {
        if (error) {
            setUser(null);
            navigate(endpoints.auth.signIn, { replace: true });
        }
    }, [error, navigate, setUser]);

    return {
        user,
        isLoading,
        isError: !!error,
    };
};
