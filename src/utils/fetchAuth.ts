import { getToken } from "./sesstionStorage";

type FetchOptions = RequestInit & {
  headers?: {
    [key: string]: string;
  };
};

export const fetchWithAuth = (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const token = getToken();

  if (!options.headers) {
    options.headers = {};
  }

  options.headers["Authorization"] = `Bearer ${token}`;
  return fetch(url, options);
};
