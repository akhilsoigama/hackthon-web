import { Permission } from "./Permissions";


export interface Role {
  id: string;
  roleName: string;
  description: string;
  permissions: Permission;
  userCount: number;
  createdAt: string;
  isDefault: boolean;
  roleDescription?: string;
  roleKey?: string;
}
