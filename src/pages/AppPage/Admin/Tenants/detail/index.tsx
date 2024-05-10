import "./index.css";
import toast from "react-hot-toast";
import { Form, FormProps, Input, Modal, Typography } from "antd";

// components
import swalFire from "@/components/SweetAlert";

//model
import { Tenant } from "@/models/admin/tenant";

// services
import { useCreateTenantMutation } from "@/services/admin/tenants/useCreateTenant";
import { useUpdateTenantMutation } from "@/services/admin/tenants/useUpdateTenant";

interface IProps {
  onClose: () => void;
  tenant: Tenant | null;
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const TenantDetail = ({ tenant, onClose }: IProps) => {
  const createTenentMutation = useCreateTenantMutation();
  const updateTenantMutation = useUpdateTenantMutation();
  const [form] = Form.useForm();

  const onFinish: FormProps<Tenant>["onFinish"] = (values: Tenant) => {
    swalFire({
      title: "Are you sure?",
      text: `${tenant ? "Update" : "Create"} ${values.name}?`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!tenant) {
          createTenentMutation.mutateAsync(values, {
            onSuccess: async () => {
              toast.success(`Tenant ${values.name} created`);
              onClose();
            },
            onError: (err) => {
              toast.error(err.message);
            },
          });
        } else {
          updateTenantMutation.mutateAsync(
            { id: tenant?._id as string, body: values },
            {
              onSuccess: async () => {
                toast.success(`Tenant ${values.name} updated`);
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

  const onFinishFailed: FormProps<Tenant>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error(`Something went wrong`);
  };

  return (
    <Modal
      className="inter_font"
      title={tenant ? "Update Tenant" : `Create Tenant`}
      open={true}
      width="400px"
      onOk={form.submit}
      maskClosable={false}
      onCancel={() => onClose()}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex_center gap-3">
          <CancelBtn />
          <OkBtn />
        </div>
      )}
      okButtonProps={{
        disabled: false,
        className: "w-full h-[44px] font-semibold text-base",
      }}
      cancelButtonProps={{
        disabled: false,
        className: "w-full h-[44px] font-semibold text-base text-[#344054]",
      }}
      okText="Confirm"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ ...tenant }}
        validateMessages={validateMessages}
      >
        <Form.Item>
          <Typography.Title
            level={5}
            className="inter_font !font-medium !text-sm !text-[#344054]"
          >
            Name
          </Typography.Title>
          <Form.Item name="name" rules={[{ required: true, whitespace: true }]}>
            <Input
              placeholder="Enter your name"
              className="h-[44px] rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={5}
            className="inter_font !font-medium !text-sm !text-[#344054]"
          >
            Email
          </Typography.Title>
          <Form.Item
            name="email"
            rules={[{ required: true, type: "email", whitespace: true }]}
          >
            <Input
              placeholder="Enter your email"
              className="h-[44px] rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={5}
            className="inter_font !font-medium !text-sm !text-[#344054]"
          >
            Phone number
          </Typography.Title>
          <Form.Item name="phone_number">
            <Input
              placeholder="Enter your phone number"
              className="h-[44px] rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TenantDetail;
