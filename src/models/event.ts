import { Camera } from "./camera";

export type EventStatus = 'OPEN' | 'VERIFIED' | 'ARCHIVE';
export type Event = {
    _id: string;
    event_type: string;
    status: EventStatus;
    image_url: string;
    video_url: string;
    camera: Camera;
    event_time: Date;
    updated_at: Date;
    created_at: Date;
}

export type ListEventResponse = {
    total: number;
    data: Event[];
}