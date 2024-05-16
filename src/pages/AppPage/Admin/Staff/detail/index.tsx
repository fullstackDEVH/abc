import "./index.css";
import toast from "react-hot-toast";
import { Form, FormProps, Input, Modal, Select, Typography } from "antd";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

// components
import swalFire from "@/components/SweetAlert";

// models
import {
  CreateStaffManagementRequest,
  ListStaffManagementResponse,
  ReadStaffManagement,
} from "@/models/admin/staff-management";

// services
import { useCreateStaffManagementMutation } from "@/services/admin/staff-management/useCreateStaffManagement";
import { useUpdateStaffManagementMutation } from "@/services/admin/staff-management/useUpdateStaffManagement";

interface IProps {
  onClose: () => void;
  staffManagement: ReadStaffManagement | null;
  onRefreshStaff: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ListStaffManagementResponse, Error>>;
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const StaffManagemenDetail = ({
  staffManagement,
  onClose,
  onRefreshStaff,
}: IProps) => {
  const createStaffMutation = useCreateStaffManagementMutation();
  const updateStaffMutation = useUpdateStaffManagementMutation();
  const [form] = Form.useForm();

  const onFinish: FormProps<CreateStaffManagementRequest>["onFinish"] = (
    values: CreateStaffManagementRequest
  ) => {
    if (!values.password) values.password = null;

    swalFire({
      title: `Are you sure ${staffManagement ? "update" : "create"} staff ?`,
      text: `${staffManagement ? "Update" : "Create"} ${values.name}?`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!staffManagement) {
          createStaffMutation.mutateAsync(values, {
            onSuccess: async () => {
              toast.success(`Staff ${values.name} created`);
              onRefreshStaff();
              onClose();
            },
            onError: (err) => {
              toast.error(err.message);
            },
          });
        } else {
          updateStaffMutation.mutateAsync(
            { id: `${staffManagement?.id}` as string, body: values },
            {
              onSuccess: async () => {
                toast.success(`Staff ${values.name} updated`);
                onRefreshStaff();
                onClose();
              },
              onError: (err) => {
                toast.error(err.message);
              },
            }
          );
        }
      }
    });
  };

  const onFinishFailed: FormProps<CreateStaffManagementRequest>["onFinishFailed"] =
    (errorInfo) => {
      console.log("Failed:", errorInfo);
      toast.error(`Please revalidate the values of the entered fields?`);
    };

  return (
    <Modal
      className="inter_font"
      title={staffManagement ? "Update QA members" : `Add QA members`}
      open={true}
      width="615px"
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
        initialValues={{ ...staffManagement }}
        validateMessages={validateMessages}
        className="grid grid-cols-2 gap-6 my-6"
      >
        <Form.Item>
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
        <Form.Item>
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Email
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

        <Form.Item>
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Set up password
          </Typography.Title>
          <Form.Item
            name="password"
            rules={[
              { required: staffManagement ? false : true, whitespace: true },
            ]}
          >
            <Input
              placeholder="Enter your password"
              className="rounded-lg inter_font"
              type="password"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Role
          </Typography.Title>
          <Form.Item name="role" rules={[{ required: true, whitespace: true }]}>
            <Select
              className="h-12"
              placeholder="Choose role"
              value={staffManagement?.role}
              options={[
                { label: "QA", value: "QA_USER" },
                { label: "Admin", value: "ADMIN" },
              ]}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StaffManagemenDetail;
