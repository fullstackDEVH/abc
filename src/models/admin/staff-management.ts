import { USER_ROLE } from "../user";
import { Tenant } from "./tenant";

export type CreateStaffManagementRequest = {
  name: string;
  email: string;
  role: USER_ROLE;
  phone:string;
  tenant : Tenant;
  password: string | null;
};

export type ReadStaffManagement = Omit<CreateStaffManagementRequest, "password"> & {
  id: number;
  updated_at: string;
  created_at: string;
};

export type ListStaffManagementResponse = {
  total: number;
  data: ReadStaffManagement[];
};

export type UpdateStaffManagementRequest = {
  id: string;
  body: CreateStaffManagementRequest;
};
