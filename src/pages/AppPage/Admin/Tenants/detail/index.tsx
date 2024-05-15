import "./index.css";
import toast from "react-hot-toast";
import {
  Form,
  Input,
  Modal,
  Upload,
  FormProps,
  Typography,
  UploadProps,
} from "antd";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

// icons
import CloudUploadIcon from "@/assets/logo/cloud-upload.svg";

// components
import swalFire from "@/components/SweetAlert";

//model
import {
  CreateTenantRequestWithLogo,
  ListTenantResponse,
  Tenant,
} from "@/models/admin/tenant";

// services
import { useCreateTenantMutation } from "@/services/admin/tenants/useCreateTenant";
import { useUpdateTenantMutation } from "@/services/admin/tenants/useUpdateTenant";

interface IProps {
  onClose: () => void;
  tenant: Tenant | null;
  onRefreshTenants: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ListTenantResponse, Error>>;
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

const { Dragger } = Upload;

const TenantDetail = ({ tenant, onClose, onRefreshTenants }: IProps) => {
  const createTenentMutation = useCreateTenantMutation();
  const updateTenantMutation = useUpdateTenantMutation();
  const [form] = Form.useForm();

  const props: UploadProps = {
    accept: ".png,.jpeg",
    beforeUpload: (file) => {
      const allowedFileTypes = ["image/png", "image/jpeg"];
      const isAllowedType = allowedFileTypes.includes(file.type);
      if (!isAllowedType)
        toast.error("Invalid file type. Please upload PNG or JPG image.");

      return isAllowedType ? false : Upload.LIST_IGNORE;
    },
    maxCount: 1,
    defaultFileList: tenant?.logo
      ? [
          {
            thumbUrl: `${import.meta.env.VITE_API_URL}/api/v1/blobs/${
              tenant.logo
            }`,
            uid: "-1",
            name: "Current logo of tenant",
          },
        ]
      : [],
  };

  const onFinish: FormProps<CreateTenantRequestWithLogo>["onFinish"] = (
    values: CreateTenantRequestWithLogo
  ) => {
    const { logo, ...validValues } = values;

    const dataRequest = { ...validValues, logo: logo.file };
    console.log("dataRequest : ", dataRequest);

    swalFire({
      title: `Are you sure ${tenant ? "update" : "create"} tenant ?`,
      text: `${tenant ? "Update" : "Create"} ${values.name}?`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!tenant) {
          createTenentMutation.mutateAsync(dataRequest, {
            onSuccess: async () => {
              toast.success(`Tenant ${dataRequest.name} created`);
              onRefreshTenants();
              onClose();
            },
            onError: (err) => {
              toast.error(err.message);
            },
          });
        } else {
          updateTenantMutation.mutateAsync(
            { id: `${tenant?.id}` as string, body: dataRequest },
            {
              onSuccess: async () => {
                toast.success(`Tenant ${dataRequest.name} updated`);
                onRefreshTenants();
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

  const onFinishFailed: FormProps<CreateTenantRequestWithLogo>["onFinishFailed"] =
    (errorInfo) => {
      console.log("Failed:", errorInfo);
      toast.error(`Please revalidate the values of the entered fields?`);
    };

  return (
    <Modal
      className="inter_font"
      title={tenant ? "Update Tenant" : `Create Tenant`}
      open={true}
      width="613px"
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
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ ...tenant }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="logo"
          className="p-[16px] mb-0"
          rules={[
            {
              required: true,
              message: "logo is required!",
            },
          ]}
        >
          <Dragger height={200} multiple={false} listType="picture" {...props}>
            <div className="flex_center flex-col gap-4">
              <img
                src={CloudUploadIcon}
                alt="CloudUploadIcon"
                width={56}
                height={56}
              />
              <p className="text-base leading-[19.36px] text-[#64748B]">
                Click or drag file to this area to upload
              </p>
            </div>
          </Dragger>
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#475467]"
          >
            Company Name
          </Typography.Title>
          <Form.Item
            className="mb-0"
            name="name"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input
              placeholder="Enter your company name"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#475467]"
          >
            Website
          </Typography.Title>
          <Form.Item
            className="mb-0"
            name="website"
            rules={[
              { required: true, whitespace: true },
              { type: "url", warningOnly: true },
            ]}
          >
            <Input
              placeholder="Enter your website"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Typography.Title
            level={5}
            className="!text-[14px] !font-bold !leading-[22.4px] !text-[#475467]"
          >
            Email
          </Typography.Title>
          <Form.Item
            className="mb-0"
            name="email"
            rules={[{ required: true, type: "email", whitespace: true }]}
          >
            <Input
              placeholder="Enter your email"
              className="rounded-lg inter_font"
            />
          </Form.Item>
        </Form.Item>

        <div className="flex_center gap-6 group_input_class_name">
          <Form.Item>
            <Typography.Title
              level={5}
              className="!text-[14px] !font-bold !leading-[22.4px] !text-[#475467]"
            >
              Contact Person
            </Typography.Title>
            <Form.Item
              className="mb-0"
              name="contact"
              rules={[{ required: true, whitespace: true }]}
            >
              <Input
                placeholder="Enter your contact person"
                className="rounded-lg inter_font"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Typography.Title
              level={5}
              className="!text-[14px] !font-bold !leading-[22.4px] !text-[#475467]"
            >
              Phone number
            </Typography.Title>
            <Form.Item
              className="mb-0"
              name="phone"
              rules={[
                {
                  validator: (_, value) => {
                    const phoneNumberPattern = /^\+?\d{10,}$/;
                    if (phoneNumberPattern.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("phone number invalid"));
                  },
                },
              ]}
            >
              <Input
                placeholder="Enter your phone number"
                className="rounded-lg inter_font"
              />
            </Form.Item>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default TenantDetail;
