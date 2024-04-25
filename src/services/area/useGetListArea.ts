import { ListAreaResponse } from "@/models/area";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetListAreaQuery = (page: number, pagesize: number, searchVal: string) => ["getListAreas", page, pagesize, searchVal];

export const useGetListArea = (
    params: { page: number, pagesize: number, searchVal: string },
    queryOptions?: UseQueryOptions<ListAreaResponse, Error>
) => {
    // TODO: GET Authentication
    const getListAreaKey = useGetListAreaQuery(params.page, params.pagesize, params.searchVal);
    const response = useQuery<ListAreaResponse, Error>(
        {
            queryKey: getListAreaKey,
            queryFn: async () => {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/areas?page=${params.page}&pagesize=${params.pagesize}&q=${params.searchVal}`)
                if (!res.ok) {
                    const errMsg = await res.json();
                    toast.error(errMsg?.detail || errMsg);
                    return null
                }
                return res.json();
            },
            ...queryOptions,
        }
    );
    return {
        data: response.data,
        isFetching: response.isFetching,
        refetch: response.refetch,
        useGetQuery: useGetListAreaQuery,
    };

};
