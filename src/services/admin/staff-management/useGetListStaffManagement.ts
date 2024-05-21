import toast from "react-hot-toast";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ListStaffManagementResponse } from "@/models/admin/staff-management";
import { fetchWithAuth } from "@/utils/fetchAuth";
import { USER_ROLE } from "@/models/user";

const useGetListStaffManagementQuery = (
  page: number,
  pagesize: number,
  searchVal: string,
  roles: USER_ROLE[]
) => [`getListStaffManagement`, page, pagesize, searchVal, roles];

export const useGetListStaffManagement = (
  params: {
    page: number;
    pagesize: number;
    searchVal: string;
    roles: USER_ROLE[];
  },
  queryOptions?: UseQueryOptions<ListStaffManagementResponse, Error>
) => {
  // TODO: GET Authentication
  const getListStaffManagement = useGetListStaffManagementQuery(
    params.page,
    params.pagesize,
    params.searchVal,
    params.roles
  );

  const response = useQuery<ListStaffManagementResponse, Error>({
    queryKey: getListStaffManagement,
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      searchParams.append("q", params.searchVal);
      searchParams.append("page", params.page.toString());
      searchParams.append("pagesize", params.pagesize.toString());
      params.roles.forEach((role) => searchParams.append("role", role));

      const res = await fetchWithAuth(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/users?${searchParams.toString()}`
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
