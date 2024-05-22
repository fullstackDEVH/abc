import { Area } from "@/models/area";
import { Image, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import { Event } from "@/models/event";
import { Camera } from "@/models/camera";
import noImage from "@/assets/images/no_image.jpeg";

import helpGreyIcon from "@/assets/logo/help/help_grey.svg";
import plusIcon from "@/assets/logo/plus/plus_blue.svg";

export const getColumns = (assignClick: () => void): ColumnsType<Event> => {
  return [
    {
      title: "No",
      dataIndex: "id",
      width: "6%",
      // fixed: "left",
      align: "left",
      ellipsis: {
        showTitle: true,
      },
      render: (_, __, index) => (
        <div className="text-[#64748B] font-medium text-base">{index + 1}</div>
      ),
    },
    {
      title: "Image/video",
      dataIndex: "processed_image_url",
      align: "center",
      key: "processed_image_url",
      width: "15.5%",
      render: (processed_image_url: string) => (
        <Image
          preview={false}
          width={120}
          height={60}
          fallback={noImage}
          src={processed_image_url ? processed_image_url : defaultScreenshot}
          alt="image_url"
          className="rounded-lg"
        />
      ),
    },
    {
      title: "Event type",
      dataIndex: "event_type",
      align: "center",
      key: "event_type",
      width: "14%",
      render: (event_type: string) => <Tag color="blue">{event_type}</Tag>,
    },

    {
      title: () => {
        return (
          <div className="flex_center gap-1">
            Camera
            <img src={helpGreyIcon} alt="helpGreyIcon" width={16} height={16} />
          </div>
        );
      },
      align: "center",
      dataIndex: "camera",
      key: "camera",
      width: "14%",
      render: (camera: Camera) => `${camera.name}`,
    },
    {
      title: () => {
        return (
          <div className="flex_center gap-1">
            Area
            <img src={helpGreyIcon} alt="helpGreyIcon" width={16} height={16} />
          </div>
        );
      },
      dataIndex: "area",
      key: "area",
      width: "14%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { camera }) => (
        <div className="text-[#475467] text-sm">
          {(camera.area as Area).name}
        </div>
      ),
    },
    {
      title: "Event Time",
      dataIndex: "event_time",
      key: "event_time",
      align: "center",
      width: "15%",
      render: (date: Date) => dayjs(date).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "Assignee",
      dataIndex: "id",
      key: "id",
      width: "18%",
      align: "center",
      render: () => (
        <div className="flex_center cursor-pointer" onClick={assignClick}>
          <img src={plusIcon} alt="helpGreyIcon" width={24} height={24} />
        </div>
      ),
    },
  ];
};
