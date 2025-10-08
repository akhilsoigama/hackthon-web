import useSWR from 'swr'
import axiosInstance, { endpoints } from '../utils/axios'
import { PermissionsResponse } from '../types/Permissions'

const fetcher = async (url: string) => {
  try {
    const res = await axiosInstance.get<PermissionsResponse>(url)
    return res.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch permissions')
  }
}

export const usePermissions = () => {
  const { data, error, isValidating, mutate } = useSWR<PermissionsResponse, Error>(
    endpoints.permission.getAll,
    fetcher,
    { revalidateOnFocus: false }
  )

  return {
    permissions: data?.data || [],
    isLoading: !data && !error,
    isError: !!error,
    isValidating,
    mutate,
    error: error?.message
  }
}
