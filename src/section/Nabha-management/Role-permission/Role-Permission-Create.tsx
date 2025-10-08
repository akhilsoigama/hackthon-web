import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaSave, FaUserShield, FaKey } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { usePermissions } from '../../../action/permission';
import RHFCheckbox from '../../../components/hook-form/RHFCheckbox';
import RHFFormField from '../../../components/hook-form/RHFFormFiled';
import {  ICreateUserRolePermission, IUserRolePermissionItem } from '../../../types/Roles';
import { mutate } from 'swr';
import { endpoints, fetcher } from '../../../utils/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserRolePermission } from '../../../action/RollPermission';

// Schema
const schema = z.object({
  roleName: z.string().min(1, 'Role Name is required'),
  roleKey: z.string().min(1, 'Role Key is required'),
  roleDescription: z.string().min(0, 'Description is required').optional(),
  isDefault: z.boolean().optional(), // Make optional to match the interface
  permissionIds: z.array(z.number()).optional(),
});

// Permission structure
interface PermissionEntity {
  name: string;
  keys: {
    create: number;
    view: number;
    update: number;
    delete: number;
    [key: string]: number;
  };
}

interface RolePermissionCreateProps {
  role?: IUserRolePermissionItem; // For editing
  onSuccess?: () => void; // Callback for closing modal or redirecting
}
type FormData = z.infer<typeof schema>;

const RolePermissionCreate: React.FC<RolePermissionCreateProps> = ({ role }) => {
  const [isSubmitting] = useState(false);
  const { permissions, isLoading, isError, error } = usePermissions();
  const [permissionMatrix, setPermissionMatrix] = useState<PermissionEntity[]>([]);
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleName: role?.roleName || '',
      roleKey: role?.roleKey || '',
      roleDescription: role?.roleDescription || '',
      isDefault: role?.isDefault || false,
      permissionIds: role?.permissions ? JSON.parse(role.permissions).map((id: string) => parseInt(id)) : [],
    },
  });

  const { handleSubmit, setValue, reset, formState: { errors, isDirty } } = methods;

  const selectedPermissions = useWatch({
    control: methods.control,
    name: 'permissionIds',
    defaultValue: [],
  }) ?? [];

  // Transform permissions into matrix
  useEffect(() => {
    if (permissions && permissions.length > 0) {
      const grouped: Record<string, PermissionEntity['keys']> = {};

      permissions.forEach(perm => {
        const key = perm.permissionKey ?? '';
        const id = perm.id; // Assuming permissions have an 'id' field
        const [entityRaw, actionRaw] = key.split('_');
        const entity = entityRaw?.toLowerCase();
        const action = actionRaw?.toLowerCase();

        if (!entity || !action || !id) return;

        if (!grouped[entity]) {
          grouped[entity] = { create: 0, view: 0, update: 0, delete: 0 };
        }

        const normalizedAction = action === 'read' ? 'view' : action;
        grouped[entity][normalizedAction] = id;
      });

      const matrix: PermissionEntity[] = Object.entries(grouped)
        .map(([name, keys]) => ({
          name: name.toUpperCase(),
          keys,
        }))
        .filter(entity => Object.values(entity.keys).some(id => id));

      setPermissionMatrix(matrix);

      if (!role) {
        const defaultSelected: number[] = [];
        matrix.forEach(entity => {
          ['create', 'view'].forEach(action => {
            if (entity.keys[action]) {
              defaultSelected.push(entity.keys[action]);
            }
          });
        });
        setValue('permissionIds', defaultSelected, { shouldValidate: true });
      }
    }
  }, [permissions, setValue, role]);

  // Optimize checkbox handlers
  const togglePermission = useCallback(
    (id: number) => {
      const newPerms = selectedPermissions?.includes(id)
        ? selectedPermissions.filter((k: number) => k !== id)
        : [...selectedPermissions, id];
      setValue('permissionIds', newPerms, { shouldValidate: true });
    },
    [selectedPermissions, setValue]
  );

  const toggleAll = useCallback(
    (entityKeys: Record<string, number>) => {
      const entityPerms = Object.values(entityKeys).filter(Boolean);
      const allExist = entityPerms.every((p: number) => selectedPermissions?.includes(p));
      const newPerms = allExist
        ? selectedPermissions?.filter((p: number) => !entityPerms.includes(p))
        : [...new Set([...selectedPermissions, ...entityPerms])];
      setValue('permissionIds', newPerms, { shouldValidate: true });
    },
    [selectedPermissions, setValue]
  );

  const toggleAllPermissions = useCallback(() => {
    const allPerms = permissionMatrix.flatMap(e => Object.values(e.keys).filter(Boolean));
    const newPerms = selectedPermissions?.length === allPerms.length ? [] : allPerms;
    setValue('permissionIds', newPerms, { shouldValidate: true });
  }, [permissionMatrix, selectedPermissions, setValue]);

  const isChecked = useMemo(
    () => (id?: number) => id ? selectedPermissions?.includes(id) : false,
    [selectedPermissions]
  );

  const isAllChecked = useMemo(
    () => (keys: Record<string, number>) => {
      const validKeys = Object.values(keys).filter(Boolean);
      return validKeys.length > 0 && validKeys.every((k: number) => selectedPermissions?.includes(k));
    },
    [selectedPermissions]
  );

  // Submit
  const onSubmit = handleSubmit(async (data) => {
  try {
    const payload: ICreateUserRolePermission = {
      ...data,
      permissionIds: data.permissionIds ?? [],
    };

    await createUserRolePermission(payload);

    mutate(endpoints.role.getAll);
    await mutate(
      `${endpoints.role.getAll}?searchFor=create`,
      fetcher(`${endpoints.role.getAll}?searchFor=create`),
      { revalidate: true }
    );
    reset()
  } catch (error) {
    console.error('Error:', error);
  }
});


  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isError) return <div className="min-h-screen text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <FaUserShield className="mr-2" /> {role ? 'Edit Role' : 'Role & Permission Management'}
          </h1>
          <p className="text-gray-600">{role ? 'Update role details and permissions.' : 'Create and manage roles with specific permissions.'}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key="create-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaKey className="mr-2 text-indigo-500" /> {role ? 'Edit Role' : 'Create New Role'}
            </h2>

            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <RHFFormField
                    name="roleName"
                    label="Role Name"
                    type="text"
                    placeholder="Enter role name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <RHFFormField
                    name="roleKey"
                    label="Role Key"
                    type="text"
                    placeholder="Enter role key"
                    required
                  />
                </div>
                <div className="mb-4">
                  <RHFFormField
                    name="roleDescription"
                    label="Role Description"
                    type="text"
                    placeholder="Enter role description"
                  />
                </div>
                <div className="mb-4">
                  <RHFCheckbox
                    name="isDefault"
                    label="Set as Default Role"
                    checked={methods.watch('isDefault')}
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Permissions</h3>
                    <button
                      type="button"
                      onClick={toggleAllPermissions}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      {selectedPermissions?.length ===
                        permissionMatrix.flatMap(e => Object.values(e.keys).filter(Boolean)).length
                        ? 'Deselect All'
                        : 'Select All'}
                    </button>
                  </div>

                  {permissionMatrix.length > 0 ? (
                    <div className="rounded-md border-2 border-gray-400 overflow-hidden">
                      <div className="overflow-y-auto scrollbar-hide max-h-[300px]">
                        <Table stickyHeader>
                          <TableHead className="bg-zinc-100">
                            <TableRow>
                              <TableCell className="w-[200px] font-bold">Permissions</TableCell>
                              <TableCell className="text-center font-medium">All</TableCell>
                              {['create', 'view', 'update', 'delete'].map(action => (
                                <TableCell key={action} className="text-center font-medium capitalize">
                                  {action}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {permissionMatrix.map(entity => (
                              <TableRow key={entity.name} className="hover:bg-zinc-50">
                                <TableCell className="font-medium">{entity.name}</TableCell>
                                <TableCell className="text-center">
                                  <RHFCheckbox
                                    name={`permissionIds.${entity.name}.all`}
                                    label=""
                                    checked={isAllChecked(entity.keys)}
                                    onChange={() => toggleAll(entity.keys)}
                                    size="small"
                                  />
                                </TableCell>
                                {['create', 'view', 'update', 'delete'].map(action => {
                                  const id = entity.keys[action];
                                  return (
                                    <TableCell key={action} className="text-center">
                                      {id ? (
                                        <RHFCheckbox
                                          name={`permissionIds.${id}`}
                                          label=""
                                          checked={isChecked(id)}
                                          onChange={() => togglePermission(id)}
                                          size="small"
                                          disabled={!id}
                                        />
                                      ) : (
                                        <span>-</span>
                                      )}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No permissions available</div>
                  )}
                  {errors.permissionIds && (
                    <p className="text-red-500 text-sm mt-2">{errors.permissionIds.message}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className={`flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center ${isSubmitting || !isDirty ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <FaSave className="mr-2" /> {role ? 'Update Role' : 'Create Role'}
                      </>
                    )}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => reset()}
                    disabled={!isDirty || isSubmitting}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </FormProvider>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RolePermissionCreate;