import { EventStatus, Event } from "@/models/event";
import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetListEventQuery = (
    cameras: string[], status: EventStatus[],
    event_time: Date[], event_type: string[], last_id: string
) => ["getListCameras", cameras, status,
        event_time, event_type, last_id];

export const useGetListEvent = (
    params: {
        cameras: string[], status: EventStatus[],
        event_time: Date[], event_type: string[], last_id: string
    },
    queryOptions?: UseInfiniteQueryOptions<any, Error>
) => {
    // GET Authentication

    const getListCameraKey = useGetListEventQuery(
        params.cameras, params.status,
        params.event_time, params.event_type, params.last_id
    );
    const response = useInfiniteQuery<any, Error>(
        {
            queryKey: getListCameraKey,
            queryFn: async ({pageParam}) => {
                
                let queryUrl = `page=1&pagesize=10`
                if (pageParam) {
                    queryUrl += `&last_id=${pageParam}`
                }
                if (params.cameras.length > 0) {
                    params.cameras.forEach(camera => queryUrl += `&cameras=${camera}`)
                }
                if (params.status.length > 0) {
                    params.status.forEach(status => queryUrl += `&status=${status}`)
                }
                if (params.event_time.length > 0) {
                    params.event_time.forEach(event_time => queryUrl += `&event_time=${event_time}`)
                }
                if (params.event_type.length > 0) {
                    params.event_type.forEach(event_type => queryUrl += `&event_type=${event_type}`)
                }
                if (params.last_id) {
                    queryUrl += `&last_id=${params.last_id}`
                }
                const res = await fetch(`${import.meta.env.VITE_API_URL}/events?${queryUrl}`)
                if (!res.ok) {
                    const errMsg = await res.json();
                    toast.error(errMsg?.detail || errMsg);
                    return null
                }
                return res.json();
            },
            initialPageParam: 0,
            
            getNextPageParam: (lastPage) => {
                return (lastPage?.data[lastPage.data.length - 1] as Event)?._id
            },
            ...queryOptions,
        }
    );
    return {
        data: response.data,
        isFetching: response.isFetching,
        refetch: response.refetch,
        fetchNextPage: response.fetchNextPage
    };

};
