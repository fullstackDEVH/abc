import "./index.css";
import { ModalModeType, defaultImage } from "@/constants";
import { Area } from "@/models/area";
import { Camera } from "@/models/camera";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import {
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { FC } from "react";
import toast from "react-hot-toast";

type CameraModalProps = {
  toggle: () => void;
  mode: ModalModeType;
  camera: Camera | null;
};

const CameraDetailModal: FC<CameraModalProps> = (props) => {
  const { toggle, camera, mode } = props;
  const [form] = Form.useForm();
  const watchScreenshot = Form.useWatch("screenshot", form);

  const onFinish = () => {
    toast.success("click");
  };

  const initValue: Camera = {
    ...camera,
    area: camera?.area
      ? {
          value: (camera?.area as Area)?.id,
          label: (camera?.area as Area)?.name,
        }
      : "",
  } as Camera;

  const getImageURL = (file: File | string) => {
    if (!file) {
      return defaultScreenshot;
    }
    if (typeof file === "string") {
      if (file === defaultImage) {
        return defaultScreenshot;
      }
      return file;
    }
    return URL.createObjectURL(file);
  };
  return (
    <Modal
      title={camera ? `${camera.name}` : `Create camera`}
      open={true}
      className="!max-w-[824px] !w-full"
      onOk={form.submit}
      maskClosable={false}
      onCancel={toggle}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex justify-center items-end gap-6 border-t-2 border-[#f1f5f9]">
          <CancelBtn />
          <OkBtn />
        </div>
      )}
      okButtonProps={{
        disabled: false,
        className:
          "w-full h-[48px] font-semibold text-base text-white bg-[#0E2259]",
      }}
      cancelButtonProps={{
        disabled: false,
        className:
          "w-full h-[48px] font-semibold text-base text-white bg-[#493CE7]",
      }}
      okText="OKE"
      cancelText="CANCEL"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initValue}
        onFinish={onFinish}
      >
        <Row>
          <Col span={10} className="p-2">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Camera name is required!" }]}
            >
              <Input placeholder="Camera name" disabled={mode === "info"} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Status is required!" }]}
            >
              <Select
                placeholder="Status"
                disabled={mode === "info"}
                options={[
                  { label: "ONLINE", value: "ONLINE" },
                  { label: "OFFLINE", value: "OFFLINE" },
                ]}
                optionRender={(item) => (
                  <Tag color={item.value === "ONLINE" ? "green" : "red"}>
                    {item.label}
                  </Tag>
                )}
                labelRender={(item) => (
                  <Tag color={item.value === "ONLINE" ? "green" : "red"}>
                    {item.label}
                  </Tag>
                )}
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="url"
              label="Stream URL"
              rules={[{ required: true, message: "Stream URL is required!" }]}
            >
              <Input placeholder="rtsp://" disabled={mode === "info"} />
            </Form.Item>
          </Col>
          <Col span={14} className="p-2 w-full">
            <Typography.Title level={5}>Camera Preview</Typography.Title>
            <Form.Item name="screenshot_url" className="mb-0">
              <Image
                className="rounded-lg image"
                preview={false}
                src={getImageURL(watchScreenshot)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CameraDetailModal;
