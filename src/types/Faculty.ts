import {Institute} from "./Institute";
import {Department} from "./department";
import {IUserRolePermissionItem} from "./Roles";


interface Faculty {
  id: number;
  facultyName: string;
  facultyId: string;
  designation: string;
  facultyEmail: string;
  facultyMobile: string;
  departmentId: number;
  instituteId: number;
  roleId: number;
  isActive: boolean;
  createdAt: string;

  // Nested objects
  department: Department;
  institute: Institute;
  role: IUserRolePermissionItem;
}

export default Faculty;