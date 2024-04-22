import { ModalModeType, defaultImage } from "@/constants";
import { Area } from "@/models/area";
import { Camera } from "@/models/camera";
import { useGetListArea } from "@/services/area/useGetListArea";
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
import swalFire from "@/components/SweetAlert";
import { useCreateCameraMutation } from "@/services/camera/useCreateCamera";
import { useUpdateCameraMutation } from "@/services/camera/useUpdateCamera";
import toast from "react-hot-toast";

type CameraModalProps = {
  toggle: () => void;
  mode: ModalModeType;
  camera: Camera | null;
};
const CameraDetailModal: FC<CameraModalProps> = (props) => {
  const { toggle, camera, mode } = props;
  const [form] = Form.useForm();
  const areaList = useGetListArea({ page: 1, pagesize: 10, searchVal: "" });
  const watchScreenshot = Form.useWatch("screenshot_url", form);
  const createCameraMutation = useCreateCameraMutation();
  const updateCameraMutation = useUpdateCameraMutation();

  const onFinish = (values: Camera) => {
    let mode: ModalModeType = "create";
    if (camera) {
      mode = "edit";
    }
    swalFire({
      title: "Are you sure?",
      text: `${mode === "create" ? "Create" : "Update"} ${values.name}?`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        if (mode === "create") {
          createCameraMutation.mutateAsync(values,
            {
              onSuccess: async() => {
                toast.success(`Camera ${values.name} created`);
                toggle();
              },
              onError: (err) => {
                toast.error(err.message);
              }
            }
          )
        } else {
          updateCameraMutation.mutateAsync({id: camera?._id as string, body: values},
            {
              onSuccess: async() => {
                toast.success(`Camera ${values.name} updated`);
                toggle();
              },
              onError: (err) => {
                toast.error(err.message);
              }
            }
          )
        }
      }
    });
  };

  const initValue: Camera = {
    ...camera,
    area: camera?.area
      ? {
          value: (camera?.area as Area)?._id,
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
                options={areaList.data?.data.map((area) => ({
                  label: area.name,
                  value: area._id,
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
                <Image
                  className={`rounded-lg ${mode === "info" ? "": "image"}`}
                  preview={false}
                  src={getImageURL(watchScreenshot)}
                />
                {mode !== "info" && <Button className="middle">
                  <UploadCloud size={25} />
                </Button>}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CameraDetailModal;
