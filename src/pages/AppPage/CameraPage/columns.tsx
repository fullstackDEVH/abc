import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import { Camera } from "@/models/camera";
import { defaultImage } from "@/constants";
import noImage from "@/assets/images/no_image.jpeg";

type CameraActionFn = (record: Camera) => void;

export const getColumns = (
  handleView: CameraActionFn,
  handleEdit: CameraActionFn,
  handleDeletes: (ids: string[]) => void
): ColumnsType<Camera> => {
  return [
    {
      title: "No",
      dataIndex: "id",
      width: "8.5%",
      fixed: "left",
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
      dataIndex: "screenshot_url",
      key: "screenshot_url",
      width: "15%",
      align: "center",
      render: (screenshot_url: string) => (
        <Image
          fallback={noImage}
          src={
            screenshot_url && screenshot_url !== defaultImage
              ? screenshot_url
              : defaultScreenshot
          }
          alt="screenshot"
          className="shadow-2xl w-full rounded-lg"
        />
      ),
    },
    {
      title: "Camera name",
      dataIndex: "name",
      align: "center",
      key: "name",
      width: "19%",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      align: "center",
      width: "22%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "18%",
      render: (status: string) => (
        <Tag color={status === "ONLINE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "15%",
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
            onClick={() => handleDeletes([record.id])}
          />
        </div>
      ),
    },
  ];
};
