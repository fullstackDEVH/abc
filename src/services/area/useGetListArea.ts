import { ListAreaResponse } from "@/models/area";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/areas?page=${params.page}&pagesize=${params.pagesize}&search=${params.searchVal}`)
                return res.json();
            },
            ...queryOptions,
        }
    );
    return {
        data: response.data,
        isFetching: response.isFetching,
        refetch: response.refetch,
    };

};
