import "./index.css";
import toast from "react-hot-toast";
import { Form, FormProps, Input, Modal, Select, Typography } from "antd";

// components

// models
import { CreateStaffManagementRequest } from "@/models/admin/staff-management";

// services

interface IProps {
  onClose: () => void;
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const StaffAssingerPage = ({ onClose }: IProps) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<CreateStaffManagementRequest>["onFinish"] = () => {
    toast.success("delete");
  };

  const onFinishFailed: FormProps<CreateStaffManagementRequest>["onFinishFailed"] =
    (errorInfo) => {
      console.log("Failed:", errorInfo);
      toast.error(`Please revalidate the values of the entered fields?`);
    };

  return (
    <Modal
      className="inter_font"
      title={"Assign staff"}
      open={true}
      width="457PX"
      onOk={form.submit}
      maskClosable={false}
      onCancel={() => onClose()}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex justify-center items-end gap-6 h-[80px] border-t-2 border-[#f1f5f9]">
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
      okText="SUBMIT"
      cancelText="CANCEL"
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Form.Item className="mb-0 mt-6">
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Account
          </Typography.Title>
          <Form.Item name="name" rules={[{ required: true, whitespace: true }]}>
            <Input
              placeholder="Enter your account"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="mb-0">
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Area name <span className="text-red-700">*</span>
          </Typography.Title>
          <Form.Item name="role" rules={[{ required: true, whitespace: true }]}>
            <Select
              className="h-12"
              placeholder="Choose area"
              options={[
                { label: "Area 1", value: "1" },
                { label: "Area 2", value: "2" },
              ]}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="mb-0">
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Area address <span className="text-red-700">*</span>
          </Typography.Title>
          <Form.Item
            name="email"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input
              placeholder="Enter your email"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StaffAssingerPage;
