import { UploadFile } from "antd";

export type Tenant = {
  id: number;
  name: string;
  website: string;
  contact: string;
  logo: string;
  email: string;
  phone: string;
  updated_at: string;
  created_at: string;
};

export type ListTenantResponse = {
  total: number;
  data: Tenant[];
};

export type CreateTenantRequest = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  logo: File;
  website: string;
};

export type CreateTenantRequestWithLogo = Omit<CreateTenantRequest, "logo"> & {
  logo: {
    file: File;
    fileList: UploadFile[];
  };
};

export type UpdateTenantRequest = {
  id: string;
  body: CreateTenantRequest;
};
