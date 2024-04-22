import { Area } from "@/models/area";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import { Camera } from "@/models/camera";
import { defaultImage } from "@/constants";
import noImage from "@/assets/images/no_image.jpeg";

type CameraActionFn = (record: Camera) => void;

export const getColumns = (
  handleView: CameraActionFn,
  handleEdit: CameraActionFn,
  handleDeletes: (ids: string[]) => void,
): ColumnsType<Camera> => {
  return [
    {
      title: "",
      dataIndex: "screenshot_url",
      key: "screenshot_url",
      width: "12%",
      
      render: (screenshot_url: string) => (
        <Image
          fallback={noImage}
          src={screenshot_url && screenshot_url !== defaultImage ? screenshot_url : defaultScreenshot}
          alt="screenshot"
          className="shadow-2xl w-full rounded-lg"
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
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeletes([record._id])}
          />
        </div>
      ),
    },
  ];
};
