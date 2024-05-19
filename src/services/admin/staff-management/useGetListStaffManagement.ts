import toast from "react-hot-toast";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ListStaffManagementResponse } from "@/models/admin/staff-management";
import { fetchWithAuth } from "@/utils/fetchAuth";

const useGetListStaffManagementQuery = (
  page: number,
  pagesize: number,
  searchVal: string
) => [`getListStaffManagement`, page, pagesize, searchVal];

export const useGetListStaffManagement = (
  params: {
    page: number;
    pagesize: number;
    searchVal: string;
  },
  queryOptions?: UseQueryOptions<ListStaffManagementResponse, Error>
) => {
  // TODO: GET Authentication
  const getListStaffManagement = useGetListStaffManagementQuery(
    params.page,
    params.pagesize,
    params.searchVal
  );

  const response = useQuery<ListStaffManagementResponse, Error>({
    queryKey: getListStaffManagement,
    queryFn: async () => {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/v1/users?page=${
          params.page
        }&pagesize=${params.pagesize}&role=ADMIN&role=QA_USER&q=${
          params.searchVal
        }`
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
    useGetQuery: useGetListStaffManagementQuery,
  };
};
