export type Tenant = {
  _id: string;
  name: string;
  website: string;
  contact_person: string;
  email: string;
  address: string;
  phone_number: string;
  updated_at: Date;
  created_at: Date;
};

export type ListTenantResponse = {
  total: number;
  data: Tenant[];
};
export type CreataTenantRequest = {
  name: string;
  address: string;
};

export type UpdateTenantRequest = {
  id: string;
  body: Tenant;
};
