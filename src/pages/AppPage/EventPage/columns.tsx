import { Area } from "@/models/area";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import { Event, EventStatus } from "@/models/event";
import { Camera } from "@/models/camera";
import noImage from "@/assets/images/no_image.jpeg";

type EventActionFn = (record: Event) => void;

export const getColumns = (
  handleView: EventActionFn,
  handleEdit: EventActionFn,
  handleDelete: EventActionFn
): ColumnsType<Event> => {
  return [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: EventStatus) => (
        <Tag color={status === "VERIFIED" ? "green" :  status === "OPEN" ? "orange" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "",
      dataIndex: "processed_image_url",
      align: "center",
      key: "processed_image_url",
      width: "15%",
      render: (processed_image_url: string) => (
        <Image
          preview={false}
          height={100}
          fallback={noImage}
          src={processed_image_url ? processed_image_url : defaultScreenshot}
          alt="image_url"
          className="shadow-2xl w-full rounded-lg"
        />
      ),
    },
    {
      title: "Event type",
      dataIndex: "event_type",
      key: "event_type",
      width: "10%",
      render: (event_type: string) => (<Tag color="blue">{event_type}</Tag>)
    },
    
    {
      title: "Camera",
      dataIndex: "camera",
      key: "camera",
      width: "30%",
      render: (camera: Camera) => `${camera.name} - ${(camera.area as Area).name}`,
    },
    {
        title: "Event Time",
        dataIndex: "event_time",
        key: "event_time",
        width: "17%",
        render: (date: Date) => dayjs(date).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "12%",
      align: "center",
      render: (_, record, index) => (
        <div className="space-x-2" key={index}>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record)
            }}
          />
          <Button
            type="primary"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(record)
            }}
          />
        </div>
      ),
    },
  ];
};
