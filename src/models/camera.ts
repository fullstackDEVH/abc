import { CameraStatus } from "@/constants";
import { Area } from "./area";
import { DefaultOptionType } from "antd/es/select";

export type Camera = {
    id: number;
    name: string;
    url: string;
    screenshot: string | File | null;
    status: CameraStatus;
    area: Area | string | DefaultOptionType;
    updated_at: string;
    created_at: string;
};

export type ListCameraResponse = {
    total: number;
    data: Camera[];
};

export type UpdateCameraRequest = {
    id: string;
    body: Camera;
};
