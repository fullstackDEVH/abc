import toast from "react-hot-toast";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ListAccountManagementResponse } from "@/models/admin/account-management";

const useGetListAccountManagementQuery = (
  page: number,
  pagesize: number,
  searchVal: string
) => ["getListAccountManagement", page, pagesize, searchVal];

export const useGetListAccountManagement = (
  params: { page: number; pagesize: number; searchVal: string },
  queryOptions?: UseQueryOptions<ListAccountManagementResponse, Error>
) => {
  // TODO: GET Authentication
  const getListAccountManagement = useGetListAccountManagementQuery(
    params.page,
    params.pagesize,
    params.searchVal
  );

  const response = useQuery<ListAccountManagementResponse, Error>({
    queryKey: getListAccountManagement,
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
    useGetQuery: useGetListAccountManagementQuery,
  };
};
