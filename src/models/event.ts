import { Camera } from "./camera";

export type EventStatus = 'OPEN' | 'VERIFIED' | 'ARCHIVE';
export type Event = {
    _id: string;
    event_type: string;
    status: EventStatus;
    image_url: string;
    video_url: string;
    camera: Camera;
    event_time: string;
    updated_at: string;
    created_at: string;
}

export type ListEventResponse = {
    total: number;
    data: Event[];
}