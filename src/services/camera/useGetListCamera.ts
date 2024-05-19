import { ListCameraResponse } from "@/models/camera";
import { fetchWithAuth } from "@/utils/fetchAuth";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetListCameraQuery = (page: number, pagesize: number, areas: string[], searchVal: string) => ["getListCameras", page, pagesize, areas, searchVal];

export const useGetListCamera = (
    params: { page: number, pagesize: number, areas: string[], searchVal: string },
    queryOptions?: UseQueryOptions<ListCameraResponse, Error>
) => {
    // GET Authentication

    const getListCameraKey = useGetListCameraQuery(params.page, params.pagesize, params.areas, params.searchVal);
    const response = useQuery<ListCameraResponse, Error>(
        {
            queryKey: getListCameraKey,
            queryFn: async () => {
                let queryUrl = `page=${params.page}&pagesize=${params.pagesize}&q=${params.searchVal}`
                if (params.areas.length > 0) {
                    params.areas.forEach(area => queryUrl += `&areas=${area}`)
                }
                const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/v1/cameras?${queryUrl}`)
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
    };

};
