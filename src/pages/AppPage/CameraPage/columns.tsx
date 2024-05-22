import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
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
          width={120}
          height={60}
          className="rounded-lg"
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
      render: (status: string) => {
        const renderTextAndStylesByRole = () => {
          switch (status) {
            case "ONLINE":
              return {
                text: "Online",
                styles:
                  "text-[#0DB670] bg-[#EEF4FF] border-[#C7D7FE] font-medium",
              };
            case "OFFLINE":
              return {
                text: "Offline",
                styles:
                  "text-[#64748B] bg-[#F9F5FF] border-[#E9D7FE] font-medium",
              };
            default:
              return {
                text: "None",
                styles: "text-[#475467] font-medium",
              };
          }
        };
        const { styles, text } = renderTextAndStylesByRole();

        return (
          <div className={`flex_center`}>
            <div
              className={`text-sm ${styles} border px-[18px] rounded-full py-1`}
            >
              {text}
            </div>
          </div>
        );
      },
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
            onClick={() => handleDeletes([`${record.id}`])}
          />
        </div>
      ),
    },
  ];
};
