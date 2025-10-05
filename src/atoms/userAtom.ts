import { atom, useAtom } from "jotai";
import useSWR from "swr";
import fetcher from "../utils/axios";
import { useEffect } from "react";

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
   data : any;
}

// Define the atom with null as the initial value
export const userAtom = atom<User | null>(null);

// Custom hook to fetch user data and sync with atom
export const useUser = () => {
    const [user, setUser] = useAtom(userAtom);
    const { data, error, isLoading } = useSWR<ApiResponse>('/profile', fetcher,{
        revalidateOnFocus: false, // Prevents refetching when window regains focus
        revalidateOnReconnect: true, // Refetch when internet reconnects
        shouldRetryOnError: true, // Retry on error
        errorRetryCount: 3, // Retry up to 3 times
    });

    useEffect(() => {
         if (data?.data) {
            setUser(data.data);
        } else if (error) {
            // Optionally clear user on error
            setUser(null);
        }
    }, [data,error, setUser]);

    return {
        user,
        isLoading,
        isError: error,
    };
};