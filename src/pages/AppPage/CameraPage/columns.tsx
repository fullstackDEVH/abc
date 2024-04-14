import { Area } from "@/models/area";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import { Camera } from "@/models/camera";

type CameraActionFn = (record: Camera) => void;

export const getColumns = (
  handleView: CameraActionFn,
  handleEdit: CameraActionFn,
  handleDelete: CameraActionFn
): ColumnsType<Camera> => {
  return [
    {
      title: "",
      dataIndex: "screenshot_url",
      key: "screenshot_url",
      width: "12%",
      render: (screenshot_url: string) => (
        <img
          src={screenshot_url ? screenshot_url : defaultScreenshot}
          alt="screenshot"
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: string) => (
        <Tag color={status === "ONLINE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      width: "15%",
      render: (area: Area) => area.name,
    },
    {
      title: "Created Time",
      dataIndex: "created_at",
      key: "created_at",
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
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];
};