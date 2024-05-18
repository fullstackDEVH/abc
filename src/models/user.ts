import { Tenant } from "./admin/tenant";

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
  assigned_tenants: unknown[];
  assigned_araes: unknown[];
  role: string;
  created_at: string;
  updated_at: string;
};

export type UserLoginResponse = {
  access_token: string | null;
  user: ReadUserResponse | null;
};
