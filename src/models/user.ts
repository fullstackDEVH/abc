import { Tenant } from "./admin/tenant";

export type USER_ROLE = "ADMIN" | "QA_USER" | "MANAGER" | "USER";

export type UserLoginRequest = {
  email: string;
  password: string;
};

export type ReadUserResponse = {
  id: number;
  email: string;
  phone: string;
  name: string;
  tenant: Tenant;
  avatar?: string;
  assigned_tenants: unknown[];
  assigned_araes: unknown[];
  role: USER_ROLE;
  created_at: string;
  updated_at: string;
};

export type UserLoginResponse = {
  access_token: string | null;
  user: ReadUserResponse | null;
};
