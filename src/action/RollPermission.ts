

import useSWR from 'swr';
import { useMemo } from 'react';
import axiosInstance, { endpoints, fetcher } from '../utils/axios';
import { ICreateUserRolePermission, IUpdateUserRolePermission, IUserRolePermissionItem } from '../types/Roles';
import axios from 'axios';
import { toast } from 'sonner';



// ----------------------------------------------------------------------
// SWR Options for data fetching
const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------
// Hook to fetch user role permissions list
export function useGetUserRolePermissions() {
    const url = endpoints.role.getAll;

    const { data, isLoading, error, isValidating } = useSWR<{
        data: IUserRolePermissionItem[];
    }>(url, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            userRolePermissions: data?.data || [],
            isLoading,
            userRolePermissionsError: error,
            userRolePermissionsValidating: isValidating,
            userRolePermissionsEmpty: !isLoading && (!data?.data || data.data.length === 0),
        }),
        [data?.data, error, isLoading, isValidating]
    );

    return memoizedValue;
}

// Hook to fetch a single user role permission by ID
export function useGetUserRolePermission(permissionId: number) {
    const url = endpoints.role.details(permissionId);

    const { data, isLoading, error, isValidating } = useSWR(url, fetcher);
    const memoizedValue = useMemo(
        () => ({
            userRolePermission: data || null,
            isLoading,
            userRolePermissionError: error,
            userRolePermissionValidating: isValidating,
            userRolePermissionEmpty: !data && !isLoading && !error,
        }),
        [data, error, isLoading, isValidating]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------
// Create User Role Permission
// Create User Role Permission
export async function createUserRolePermission(permissionData: ICreateUserRolePermission) {
  const url = endpoints.role.create;
  try {
    const res = await axiosInstance.post(url, permissionData);
    if (res?.status === 201) {
      toast.success('User role permission created successfully');
      return res.data?.data?.id;
    }
    return null;
  } catch (error) {
    toast.error('Failed to create user role permission');
    return null;
  }
}

// Update User Role Permission
export async function updateUserRolePermission(
  permissionId: number,
  permissionData: IUpdateUserRolePermission
) {
  const url = endpoints.role.update(permissionId);
  try {
    const res = await axiosInstance.put(url, permissionData);
    if (res?.status === 200) {
      toast.success('User role permission updated successfully');
    }
  } catch (error) {
    toast.error('Failed to update user role permission');
  }
}


// Delete User Role Permission
export async function deleteUserRolePermission(permissionId: number) {
    const url = endpoints.role.delete(permissionId);
    try {
        const res = await axios.delete(url);
        if (res?.data?.status === true) {
            toast.success('User role permission deleted successfully');
        }
        return res;
    } catch (error) {
        toast.error(
            `Failed to delete user role permission:`
        );
        throw error;
    }
}
