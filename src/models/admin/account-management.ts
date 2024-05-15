type ACCOUNT_ROLE = "Manager" | "Staff";

export type CreataAccountManagementRequest = {
  name: string;
  email: string;
  role: ACCOUNT_ROLE;
  tenant: number;
  password: string;
};

export type AccountManagementRead = {
  id: number;
  updated_at: Date;
  created_at: Date;
} & CreataAccountManagementRequest;

export type ListAccountManagementResponse = {
  total: number;
  data: AccountManagementRead[];
};

export type UpdateAccountManagementRequest = {
  id: string;
  body: CreataAccountManagementRequest;
};
