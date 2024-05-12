export type Tenant = {
  id: number;
  name: string;
  website: string;
  contact: string;
  logo: string;
  email: string;
  phone: string;
  updated_at: Date;
  created_at: Date;
};

export type ListTenantResponse = {
  total: number;
  data: Tenant[];
};
export type CreataTenantRequest = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  logo?: string;
  website?: string;
};

export type UpdateTenantRequest = {
  id: string;
  body: Tenant;
};
