import { ModalModeType, defaultImage } from "@/constants";
import { Area } from "@/models/area";
import { Camera } from "@/models/camera";
import { UploadCloud } from "react-feather";
import defaultScreenshot from "@/assets/images/screenshot.jpeg";
import "./index.css";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
  Upload,
} from "antd";
import { FC } from "react";
import toast from "react-hot-toast";
import FlvPlayer from "@/components/FlvPlayer";

type CameraModalProps = {
  toggle: () => void;
  mode: ModalModeType;
  camera: Camera | null;
};

const areaData = {
  total: 3,
  data: [
    {
      id: 7198643381730451,
      name: "area5",
      address: "area5 qng",
      tenant: {
        id: 7197873089592599,
        name: "RAINSCALE",
        logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
        contact: "Admin Rainscale",
        phone: "0000000000",
        website: "https://rainscale.com.vn",
        email: "admin1@rainscale.com.vn",
        created_at: "2024-05-19T08:17:54.574980+00:00",
        updated_at: "2024-05-19T08:17:54.575001+00:00",
      },
      created_at: "2024-05-21T11:18:46.531347+00:00",
      updated_at: "2024-05-21T11:18:46.531358+00:00",
    },
    {
      id: 7198640659119645,
      name: "DN Area3",
      address: "QNG",
      tenant: {
        id: 7197873089592599,
        name: "RAINSCALE",
        logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
        contact: "Admin Rainscale",
        phone: "0000000000",
        website: "https://rainscale.com.vn",
        email: "admin1@rainscale.com.vn",
        created_at: "2024-05-19T08:17:54.574980+00:00",
        updated_at: "2024-05-19T08:17:54.575001+00:00",
      },
      created_at: "2024-05-21T11:07:57.410475+00:00",
      updated_at: "2024-05-21T11:07:57.410486+00:00",
    },
    {
      id: 7197875081807307,
      name: "RS Area 2",
      address: "Address of area 1",
      tenant: {
        id: 7197873089592599,
        name: "RAINSCALE",
        logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
        contact: "Admin Rainscale",
        phone: "0000000000",
        website: "https://rainscale.com.vn",
        email: "admin1@rainscale.com.vn",
        created_at: "2024-05-19T08:17:54.574980+00:00",
        updated_at: "2024-05-19T08:17:54.575001+00:00",
      },
      created_at: "2024-05-19T08:25:49.555895+00:00",
      updated_at: "2024-05-21T09:44:38.831735+00:00",
    },
  ],
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
      width="70%"
      onOk={form.submit}
      maskClosable={false}
      onCancel={toggle}
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
              />
            </Form.Item>
            <Form.Item
              name="area"
              label="Area"
              rules={[{ required: true, message: "Area is required!" }]}
            >
              <Select
                placeholder="Area"
                disabled={mode === "info"}
                options={areaData.data.map((area) => ({
                  label: area.name,
                  value: area.id,
                }))}
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
            <Form.Item name="screenshot_url">
              <Upload
                disabled={mode === "info"}
                accept="image/*"
                beforeUpload={() => {
                  return false;
                }}
                className="container cursor-pointer"
                showUploadList={false}
                onChange={(e) => {
                  form.setFieldValue("screenshot_url", e.file);
                }}
              >
                {mode === "info" && <FlvPlayer url={camera?.url} />}
                {mode !== "info" && (
                  <>
                    <Image
                      className="rounded-lg image"
                      preview={false}
                      src={getImageURL(watchScreenshot)}
                    />
                    <Button className="middle">
                      <UploadCloud size={25} />
                    </Button>
                  </>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CameraDetailModal;
