export type Area = {
  id: string;
  name: string;
  address: string;
  updated_at: Date;
  created_at: Date;
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
