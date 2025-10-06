// hooks/useLectures.ts
import useSWR from 'swr';
import { useMemo } from 'react';
import axiosInstance, { endpoints, fetcher } from '../utils/axios';
import { ICreateLecture, ILecture, IUpdateLecture } from '../types/material';
import { toast } from 'sonner';

// ----------------------------------------------------------------------
// SWR Options
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------
// Fetch all lectures
export function useGetLectures(searchFor?: string) {
  const url =
    searchFor === 'create'
      ? `${endpoints.material.getAll}?searchFor=${searchFor}`
      : endpoints.material.getAll;

  const { data, error, isLoading, isValidating } = useSWR<{ data: ILecture[] }>(
    url,
    fetcher,
    swrOptions
  );

  return useMemo(
    () => ({
      lectures: data?.data || [],
      isLoading,
      lecturesError: error,
      lecturesValidating: isValidating,
      lecturesEmpty: !isLoading && (!data?.data || data.data.length === 0),
    }),
    [data?.data, error, isLoading, isValidating]
  );
}

// ----------------------------------------------------------------------
// Fetch single lecture
export function useGetLecture(lectureId: number) {
  const url = endpoints.material.details(lectureId);

  const { data, error, isLoading, isValidating } = useSWR<{ data: ILecture }>(
    url,
    fetcher,
    swrOptions
  );

  return useMemo(
    () => ({
      lecture: data?.data || null,
      isLoading,
      lectureError: error,
      lectureValidating: isValidating,
      lectureEmpty: !data && !isLoading && !error,
    }),
    [data, error, isLoading, isValidating]
  );
}

// ----------------------------------------------------------------------
// Create Lecture
export async function createLecture(lectureData: ICreateLecture) {
  try {
    const res = await axiosInstance.post(endpoints.lecture.create, lectureData);
    toast.success('Lecture created successfully');
    
    return res.data?.lecture || null;
  } catch (error: any) {
    toast.error(`Failed to create lecture: ${error?.response?.data?.message || error.message}`);
    return null;
  }
}


export async function updateLecture(lectureId: number, lectureData: IUpdateLecture) {
  try {
    const res = await axiosInstance.put(endpoints.material.update(lectureId), lectureData);
    toast.success('Lecture updated successfully');
    return res.data?.lecture || null;
  } catch (error: any) {
    toast.error(`Failed to update lecture: ${error?.response?.data?.message || error.message}`);
    return null;
  }
}

export async function deleteLecture(lectureId: number) {
  try {
    const res = await axiosInstance.delete(endpoints.material.delete(lectureId));
    toast.success('Lecture deleted successfully');
    return res;
  } catch (error: any) {
    toast.error(`Failed to delete lecture: ${error?.response?.data?.message || error.message}`);
    throw error;
  }
}
