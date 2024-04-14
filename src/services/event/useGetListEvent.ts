import { EventStatus, ListEventResponse } from "@/models/event";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useGetListEventQuery = (
    page: number, pagesize: number, cameras: string[], status: EventStatus[],
    event_time: Date[], event_type: string[], last_id: string
) => ["getListCameras", page, pagesize, cameras, status,
        event_time, event_type, last_id];

export const useGetListEvent = (
    params: {
        page: number, pagesize: number, cameras: string[], status: EventStatus[],
        event_time: Date[], event_type: string[], last_id: string
    },
    queryOptions?: UseQueryOptions<ListEventResponse, Error>
) => {
    // GET Authentication

    const getListCameraKey = useGetListEventQuery(
        params.page, params.pagesize, params.cameras, params.status,
        params.event_time, params.event_type, params.last_id
    );
    const response = useQuery<ListEventResponse, Error>(
        {
            queryKey: getListCameraKey,
            queryFn: async () => {
                return {
                    total: 4,
                    data: [
                        {
                            id: "event1",
                            event_type: "CM01",
                            camera: {
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
                            status: "OPEN",
                            image_url: "",
                            processed_image_url: "https://picsum.photos/id/1018/1000/600/",
                            event_time: new Date(),
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "event2",
                            event_type: "CM02",
                            camera: {
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
                            status: "VERIFIED",
                            image_url: "",
                            processed_image_url: "https://picsum.photos/id/1015/1000/600/",
                            event_time: new Date(),
                            updated_at: new Date(),
                            created_at: new Date(),
                        },
                        {
                            id: "event3",
                            event_type: "CM03",
                            camera: {
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
                            status: "ARCHIVE",
                            image_url: "",
                            processed_image_url: "https://picsum.photos/id/1019/1000/600/",
                            event_time: new Date(),
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
