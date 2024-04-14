import { ListCameraResponse } from "@/models/camera";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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
                return {
                    total: 4,
                    data: [
                        {
                            id: "cam1",
                            name: "Camera 1",
                            url: "",
                            screenshot_url: "",
                            status: "ONLINE",
                            roi_list: [],
                            area: {
                                id: "area_1",
                                name: "Area 1",
                                address: "Address 1",
                                updated_at: new Date(),
                                created_at: new Date(),
                            },
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "cam2",
                            name: "Camera 2",
                            url: "",
                            screenshot_url: "",
                            status: "OFFLINE",
                            roi_list: [],
                            area: {
                                id: "area_1",
                                name: "Area 1",
                                address: "Address 1",
                                updated_at: new Date(),
                                created_at: new Date(),
                            },
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "cam3",
                            name: "Camera 3",
                            url: "",
                            screenshot_url: "",
                            status: "ONLINE",
                            roi_list: [],
                            area: {
                                id: "area_2",
                                name: "Area 2",
                                address: "Address 2",
                                updated_at: new Date(),
                                created_at: new Date(),
                            },
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "cam4",
                            name: "Camera 4",
                            url: "",
                            screenshot_url: "",
                            status: "ONLINE",
                            roi_list: [],
                            area: {
                                id: "area_2",
                                name: "Area 2",
                                address: "Address 2",
                                updated_at: new Date(),
                                created_at: new Date(),
                            },
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
