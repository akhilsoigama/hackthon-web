import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import useSWR from 'swr';
import Faculty from "../types/Faculty";
import api, { endpoints } from "../utils/axios";

export const facultyAtom = atom<Faculty[]>([]);

// Custom fetcher to extract the array from the API response's 'data' property
const facultyListFetcher = async (url: string): Promise<Faculty[]> => {
  const response = await api.get(url);
  return response.data.data; // The actual array is nested here
};

export const useFaculty = () => {
  const [faculties, setFaculties] = useAtom(facultyAtom);

  // Fetch faculty data with SWR
  const {
    data: fetchedData,
    error,
    isLoading,
    mutate,
  } = useSWR<Faculty[]>(endpoints.faculty.getAll, facultyListFetcher);

  // Update atom when data changes
  useEffect(() => {
    if (fetchedData) {
      setFaculties(fetchedData);
    }
  }, [fetchedData, setFaculties]);

  return {
    faculties,
    isLoading,
    isError: !!error,
    mutate,
  };
};
