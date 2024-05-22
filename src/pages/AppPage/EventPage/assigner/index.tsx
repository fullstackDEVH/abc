import "./index.css";
import toast from "react-hot-toast";
import { Form, FormProps, Modal, Select, Typography } from "antd";

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

const EventAssingerPage = ({ onClose }: IProps) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<CreateStaffManagementRequest>["onFinish"] = () => {
    toast.success("success");
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
        <Form.Item className="mb-0 mt-8">
          <Typography.Title
            level={5}
            className="!text-[14px] !font-medium !leading-[20px] !text-[#344054]"
          >
            Area name <span className="text-red-700">*</span>
          </Typography.Title>
          <Form.Item name="role" rules={[{ required: true, whitespace: true }]}>
            <Select
              className="h-12"
              placeholder="Choose area"
              options={[
                { label: "Nguyen Van A", value: "1" },
                { label: "Nguyen Van B", value: "2" },
                { label: "Nguyen Van C", value: "3" },
                { label: "Nguyen Van D", value: "4" },
                { label: "Nguyen Van E", value: "5" },
              ]}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventAssingerPage;
