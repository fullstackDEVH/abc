import { ListAreaResponse } from "@/models/area";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useGetListAreaQuery = (page: number, pagesize: number, searchVal: string) => ["getListAreas", page, pagesize, searchVal];

export const useGetListArea = (
    params: { page: number, pagesize: number, searchVal: string },
    queryOptions?: UseQueryOptions<ListAreaResponse, Error>
) => {
    // GET Authentication

    const getListAreaKey = useGetListAreaQuery(params.page, params.pagesize, params.searchVal);
    const response = useQuery<ListAreaResponse, Error>(
        {
            queryKey: getListAreaKey,
            queryFn: async () => {
                return {
                    total: 4,
                    data: [
                        {
                            id: "1",
                            name: "Area 1",
                            address: "Address 1",
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "2",
                            name: "Area 2",
                            address: "Address 2",
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "3",
                            name: "Area 3",
                            address: "Address 3",
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "4",
                            name: "Area 4",
                            address: "Address 4",
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                    ]
                }
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
