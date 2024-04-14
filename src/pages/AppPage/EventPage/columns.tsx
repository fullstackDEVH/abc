import { Area } from "@/models/area";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import { Event, EventStatus } from "@/models/event";
import { Camera } from "@/models/camera";

type EventActionFn = (record: Event) => void;

export const getColumns = (
  handleView: EventActionFn,
  handleEdit: EventActionFn,
  handleDelete: EventActionFn
): ColumnsType<Event> => {
  return [
    {
      title: "",
      dataIndex: "processed_image_url",
      key: "processed_image_url",
      width: "12%",
      render: (processed_image_url: string) => (
        <img
          src={processed_image_url ? processed_image_url : defaultScreenshot}
          alt="image_url"
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Event type",
      dataIndex: "event_type",
      key: "event_type",
      width: "15%",
      render: (event_type: string) => (<Tag color="blue">{event_type}</Tag>)
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: EventStatus) => (
        <Tag color={status === "VERIFIED" ? "green" :  status === "OPEN" ? "orange" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "Camera",
      dataIndex: "camera",
      key: "camera",
      width: "20%",
      render: (camera: Camera) => `${camera.name} - ${(camera.area as Area).name}`,
    },
    {
        title: "Event Time",
        dataIndex: "event_time",
        key: "event_time",
        width: "15%",
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
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record)
            }}
          />
          <Button
            type="primary"
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
