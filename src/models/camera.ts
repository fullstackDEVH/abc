import { CameraStatus } from "@/constants";
import { Area } from "./area";
import { DefaultOptionType } from "antd/es/select";

export type Camera = {
    id: string;
    name: string;
    url: string;
    screenshot_url: string | File | null;
    status: CameraStatus;
    roi_list: Array<string>;
    area: Area | string | DefaultOptionType;
    updated_at: Date;
    created_at: Date;
};

export type ListCameraResponse = {
    total: number;
    data: Camera[];
};