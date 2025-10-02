import { atom } from 'jotai';

// --- API Data Structures ---
// These interfaces match the JSON response from your backend

export interface ApiPermission {
  id: number;
  permissionName: string;
  permissionKey: string;
}

export interface ApiRole {
  id: number;
  roleName: string;
  roleDescription: string;
  isDefault: boolean;
  createdAt: string;
  permissions: ApiPermission[];
}

// --- Frontend Data Structures ---
// These are the interfaces your components currently use
export interface Permission {
  [key: string]: boolean;
}

export interface Role {
  id: string;
  roleName: string;
  description: string;
  permissions: Permission;
  userCount: number;
  createdAt: string;
  isDefault: boolean;
}

// Permission categories based on routes
export const permissionCategories: { [key: string]: string[] } = {
  Dashboard: [
    'OVERVIEW_LIST',
    'PROGRESS_LIST',
    'EVENTS_LIST',
    'MESSAGES_LIST',
    'SETTINGS_LIST',
  ],
  NabhaManagement: [
    'INSTITUTE_CREATE',
    'INSTITUTE_LIST',
    'INSTITUTE_UPDATE',
    'INSTITUTE_DELETE',
    'SURVEY_MASTER_CREATE',
    'SURVEY_MASTER_LIST',
    'SURVEY_MASTER_UPDATE',
    'SURVEY_MASTER_DELETE',
    'ROLE_PERMISSION_CREATE',
    'ROLE_PERMISSION_LIST',
    'ROLE_PERMISSION_UPDATE',
    'ROLE_PERMISSION_DELETE',
  ],
  InstituteManagement: [
    'FACULTY_CREATE',
    'FACULTY_LIST',
    'FACULTY_UPDATE',
    'FACULTY_DELETE',
    'STUDENT_CREATE',
    'STUDENT_LIST',
    'STUDENT_UPDATE',
    'STUDENT_DELETE',
    'INSTITUTE_SURVEY_CREATE',
    'INSTITUTE_SURVEY_LIST',
    'INSTITUTE_SURVEY_UPDATE',
    'INSTITUTE_SURVEY_DELETE',
  ],
  StudentManagement: [
    'ASSIGNMENT_CREATE',
    'ASSIGNMENT_LIST',
    'ASSIGNMENT_UPDATE',
    'ASSIGNMENT_DELETE',
    'LESSON_CREATE',
    'LESSON_LIST',
    'LESSON_UPDATE',
    'LESSON_DELETE',
    'QUIZ_CREATE',
    'QUIZ_LIST',
    'QUIZ_UPDATE',
    'QUIZ_DELETE',
  ],
  LeaveManagement: [
    'LEAVE_CREATE',
    'LEAVE_LIST',
    'LEAVE_UPDATE',
    'LEAVE_DELETE',
    'LEAVE_APPROVAL_DONE',
    'LEAVE_APPROVAL_REJECT',
  ],
  StudentUpload: [
    'ASSIGNMENT_UPLOAD_UPLOAD',
    'ASSIGNMENT_UPLOAD_LIST',
    'LESSON_UPLOAD_UPLOAD',
    'LESSON_UPLOAD_LIST',
  ],
  Communication: ['CHATBOT_LIST'],
};

// Sample roles data
const sampleRoles: Role[] = [
//   {
//     id: '1',
//     roleName: 'Administrator',
//     description: 'Full system access with all permissions',
//     permissions: Object.values(permissionCategories)
//       .flat()
//       .reduce((acc, perm) => ({ ...acc, [perm]: true }), {}),
//     userCount: 5,
//     createdAt: '2023-01-15',
//     isDefault: false
//   },
  // ... other roles from sampleRoles
];

export const rolesAtom = atom<Role[]>(sampleRoles);

/** Atom to store all available permissions fetched from the API. */
export const allPermissionsAtom = atom<ApiPermission[]>([]);

// --- Data Transformation ---
// This function converts the API response into the format your frontend expects.

export const transformApiRolesToFrontendRoles = (apiRoles: ApiRole[]): Role[] => {
  const allPermissionKeys = Object.values(permissionCategories).flat();

  return apiRoles.map((apiRole : ApiRole) => {
    // Initialize all permissions to false
    const permissions: Permission = allPermissionKeys.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as Permission);

    // Set the permissions from the API to true
    apiRole.permissions.forEach(p => {
      const frontendKey = p.permissionKey.toUpperCase();
      if (frontendKey in permissions) {
        permissions[frontendKey] = true;
      }
    });

    return {
      id: apiRole.id.toString(),
      roleName: apiRole.roleName,
      description: apiRole.roleDescription,
      permissions,
      userCount: 0, // Default value, as it's not in the API response
      createdAt: new Date(apiRole.createdAt).toISOString().split('T')[0],
      isDefault: apiRole.isDefault,
    };
  });
};
