import { ListTenantResponse } from "@/models/admin/tenant";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetListTenantQuery = (
  page: number,
  pagesize: number,
  searchVal: string
) => ["getListTenants", page, pagesize, searchVal];

export const useGetListTenants = (
  params: { page: number; pagesize: number; searchVal: string },
  queryOptions?: UseQueryOptions<ListTenantResponse, Error>
) => {
  // TODO: GET Authentication
  const getListTenantKey = useGetListTenantQuery(
    params.page,
    params.pagesize,
    params.searchVal
  );
  const response = useQuery<ListTenantResponse, Error>({
    queryKey: getListTenantKey,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/tenants?page=${
          params.page
        }&pagesize=${params.pagesize}&q=${params.searchVal}`
      );
      if (!res.ok) {
        const errMsg = await res.json();
        toast.error(errMsg?.detail || errMsg);
        return null;
      }
      return res.json();
    },
    ...queryOptions,
  });
  return {
    data: response.data,
    isFetching: response.isFetching,
    refetch: response.refetch,
    useGetQuery: useGetListTenantQuery,
  };
};
