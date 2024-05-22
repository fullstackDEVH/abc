import { Tenant } from "./admin/tenant";

export type Area = {
  id: number;
  name: string;
  address: string;
  tenant : Tenant
  updated_at: string;
  created_at: string;
};

export type ListAreaResponse = {
  total: number;
  data: Area[];
};

export type CreataAreaRequest = {
  name: string;
  address: string;
};

export type UpdateAreaRequest = {
  id: string;
  body: CreataAreaRequest;
};
