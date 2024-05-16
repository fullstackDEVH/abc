type STAFF_ROLE = "QA_USER" | "ADMIN";

export type CreateStaffManagementRequest = {
  name: string;
  email: string;
  role: STAFF_ROLE;
  password: string | null;
};

export type ReadStaffManagement = {
  id: number;
  updated_at: Date;
  created_at: Date;
} & CreateStaffManagementRequest;

export type ListStaffManagementResponse = {
  total: number;
  data: ReadStaffManagement[];
};

export type UpdateStaffManagementRequest = {
  id: string;
  body: CreateStaffManagementRequest;
};
