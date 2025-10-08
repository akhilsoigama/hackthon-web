import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import axiosInstance, { endpoints, fetcher } from '../utils/axios';
import { IUserRolePermissionItem, ICreateUserRolePermission, IUpdateUserRolePermission } from '../types/Roles';
import axios from 'axios';
import { toast } from 'sonner';
import { deleteRolePermissionDB, getRolePermissionsDB, setRolePermissionDB } from './../indexDB/rolePermission';
import { useAtom } from 'jotai';
import { rolePermissionsAtom } from '../atoms/roleAtom';

// SWR Options
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetUserRolePermissions() {
  const [permissions, setPermissions] = useAtom(rolePermissionsAtom);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Online/offline detection
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

  const shouldFetch = !isOffline;

  const { data, isLoading, error, isValidating } = useSWR<{ data: IUserRolePermissionItem[] }>(
    shouldFetch ? endpoints.role.getAll : null,
    fetcher,
    swrOptions
  );

  // Load from IndexedDB first
  useEffect(() => {
    const loadFromDB = async () => {
      const stored = await getRolePermissionsDB();
      if (stored.length) {
        setPermissions(stored);
        if (isOffline) toast.warning("Offline: loaded cached roles");
      }
    };
    loadFromDB();
  }, [isOffline, setPermissions]);

  // Save API data to state + IndexedDB
  useEffect(() => {
    if (data?.data && !isOffline) {
      const permsWithId = data.data.map((p) => ({ ...p, id: p.id ?? Date.now() }));
      setPermissions(permsWithId);
      permsWithId.forEach(setRolePermissionDB);
    }
  }, [data, isOffline, setPermissions]);

  return useMemo(() => ({
    userRolePermissions: permissions,
    isLoading: shouldFetch ? isLoading : false,
    userRolePermissionsError: error,
    userRolePermissionsValidating: isValidating,
    userRolePermissionsEmpty: !isLoading && permissions.length === 0,
    isOffline,
  }), [permissions, isLoading, error, isValidating, shouldFetch, isOffline]);
}

// -------------------- Hook to fetch single permission --------------------
export function useGetUserRolePermission(permissionId: number) {
  const [permissions, setPermissions] = useAtom(rolePermissionsAtom);
  const [isOffline, setIsOffline] = useState(false);

  const url = endpoints.role.details(permissionId);
  const { data, isLoading, error, isValidating } = useSWR(url, fetcher);

  useEffect(() => {
    if (data?.data) {
      const perm: IUserRolePermissionItem = { ...data.data, id: data.data.id ?? Date.now() };
      setPermissions(prev => [...prev.filter(p => p.id !== perm.id), perm]);
      setRolePermissionDB(perm);
      setIsOffline(false);
    }
  }, [data, setPermissions]);

  return useMemo(() => ({
    userRolePermission: permissions.find(p => p.id === permissionId) || null,
    isLoading,
    userRolePermissionError: error,
    userRolePermissionValidating: isValidating,
    userRolePermissionEmpty: !data && !isLoading && !error,
    isOffline,
  }), [permissions, permissionId, data, isLoading, error, isValidating, isOffline]);
}

// -------------------- CRUD Functions --------------------
export async function createUserRolePermission(permissionData: ICreateUserRolePermission) {
  try {
    const res = await axiosInstance.post(endpoints.role.create, permissionData);
    if (res?.status === 201) {
      await setRolePermissionDB(res.data?.data);
      toast.success('User role permission created successfully');
      return res.data?.data?.id;
    }
    return null;
  } catch (error) {
    toast.error('Failed to create user role permission');
    return null;
  }
}

export async function updateUserRolePermission(permissionId: number, permissionData: IUpdateUserRolePermission, setPermissions: any) {
  try {
    const res = await axiosInstance.put(endpoints.role.update(permissionId), permissionData);
    if (res?.status === 200 && res.data?.data) {
      const updated = res.data.data;
      await setRolePermissionDB(updated);
      // Update atom
      setPermissions((prev: IUserRolePermissionItem[]) => [...prev.filter(p => p.id !== updated.id), updated]);
      toast.success('User role permission updated successfully');
    }
  } catch (error) {
    toast.error('Failed to update user role permission');
  }
}

export async function deleteUserRolePermission(permissionId: number) {
  try {
    const res = await axios.delete(endpoints.role.delete(permissionId));
    if (res?.data?.status === true) {
      await deleteRolePermissionDB(permissionId);
      toast.success('User role permission deleted successfully');
    }
    return res;
  } catch (error) {
    toast.error('Failed to delete user role permission');
    throw error;
  }
}
