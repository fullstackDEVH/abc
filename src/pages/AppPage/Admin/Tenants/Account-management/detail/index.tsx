import "./index.css";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Form, FormProps, Input, Modal, Select, Typography } from "antd";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

// components
import swalFire from "@/components/SweetAlert";

// models
import {
  AccountManagementRead,
  CreataAccountManagementRequest,
  ListAccountManagementResponse,
} from "@/models/admin/account-management";

// services
import { useCreateAccountManagementMutation } from "@/services/admin/account-management.ts/useCreateAccountManagement";
import { useUpdateAccountManagementMutation } from "@/services/admin/account-management.ts/useUpdateAccountManagement";

interface IProps {
  onClose: () => void;
  accountManagement: AccountManagementRead | null;
  onRefreshAccounts: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ListAccountManagementResponse, Error>>;
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
    url: "${label} is not a valid url!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AccountManagemenDetail = ({
  accountManagement,
  onClose,
  onRefreshAccounts,
}: IProps) => {
  const params = useParams();
  const tenantId = params.tenantId ?? "";

  const createTenentMutation = useCreateAccountManagementMutation();
  const updateTenantMutation = useUpdateAccountManagementMutation();
  const [form] = Form.useForm();

  const onFinish: FormProps<CreataAccountManagementRequest>["onFinish"] = (
    values: CreataAccountManagementRequest
  ) => {
    if (isNaN(+tenantId)) {
      toast.error("Current list accounts of tenant invalid!!");
    }

    values.tenant = +tenantId;

    if (!values.password) values.password = null;

    swalFire({
      title: `Are you sure ${
        accountManagement ? "update" : "create"
      } account ?`,
      text: `${accountManagement ? "Update" : "Create"} ${values.name}?`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!accountManagement) {
          createTenentMutation.mutateAsync(values, {
            onSuccess: async () => {
              toast.success(`Tenant ${values.name} created`);
              onRefreshAccounts();
              onClose();
            },
            onError: (err) => {
              toast.error(err.message);
            },
          });
        } else {
          updateTenantMutation.mutateAsync(
            { id: `${accountManagement?.id}` as string, body: values },
            {
              onSuccess: async () => {
                toast.success(`Tenant ${values.name} updated`);
                onRefreshAccounts();
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

  const onFinishFailed: FormProps<CreataAccountManagementRequest>["onFinishFailed"] =
    (errorInfo) => {
      console.log("Failed:", errorInfo);
      toast.error(`Please revalidate the values of the entered fields?`);
    };

  return (
    <Modal
      className="inter_font"
      title={accountManagement ? "Update Account" : `Add Account`}
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
          "w-full h-[56px] font-semibold text-base text-white bg-[#0E2259]",
      }}
      cancelButtonProps={{
        disabled: false,
        className:
          "w-full h-[56px] font-semibold text-base text-white bg-[#493CE7]",
      }}
      okText="SUBMIT"
      cancelText="CANCEL"
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ ...accountManagement }}
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
            Phone
          </Typography.Title>
          <Form.Item
            name="phone"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input
              placeholder="Enter your phone"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
          >
            Password
          </Typography.Title>
          <Form.Item
            name="password"
            rules={[
              { required: accountManagement ? false : true, whitespace: true },
            ]}
          >
            <Input
              placeholder="Enter your password"
              className="rounded-lg inter_font"
              type="password"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="w-full col-span-2">
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
              value={accountManagement?.role}
              options={[
                { label: "Staff", value: "USER" },
                { label: "Manager", value: "MANAGER" },
              ]}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountManagemenDetail;
