import "./index.css";
import toast from "react-hot-toast";
import { Form, FormProps, Input, Modal, Typography } from "antd";

// models
import { Area, CreataAreaRequest } from "@/models/area";

interface IProps {
  onClose: () => void;
  AreaDetail: Area | null;
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const AreaDetailModal = ({ AreaDetail, onClose }: IProps) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<CreataAreaRequest>["onFinish"] = () => {
    toast.success(`Are you sure ${AreaDetail ? "update" : "create"} staff ?`);
  };

  const onFinishFailed: FormProps<CreataAreaRequest>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    toast.error(`Please revalidate the values of the entered fields?`);
  };

  return (
    <Modal
      className="inter_font"
      title={AreaDetail ? "Update area" : `Create area`}
      open={true}
      width="469px"
      onOk={form.submit}
      maskClosable={false}
      onCancel={() => onClose()}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex justify-center items-end gap-6 pt-6 border-t-2 border-[#f1f5f9]">
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
      okText="OK"
      cancelText="CANCEL"
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ ...AreaDetail }}
        validateMessages={validateMessages}
      >
        <Form.Item className="mb-0 mt-6">
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Name
          </Typography.Title>
          <Form.Item name="name" rules={[{ required: true, whitespace: true }]}>
            <Input
              placeholder="Enter your name"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="mb-0">
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Address
          </Typography.Title>
          <Form.Item
            className="mb-6"
            name="address"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input
              placeholder="Enter your address"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AreaDetailModal;
