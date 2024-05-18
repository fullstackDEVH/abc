import "./index.css";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logoLogin from "@/assets/logo_login.svg";
import { Button, Checkbox, Form, FormProps, Input, Typography } from "antd";

// models
import { UserLoginRequest, UserLoginResponse } from "@/models/user";

// services
import { useUserLoginMutation } from "@/services/auth/useUserLogin";

// redux
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCredentials } from "@/redux/slice/authSlice";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { access_token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userLoginMutation = useUserLoginMutation();

  const onFinish: FormProps<UserLoginRequest>["onFinish"] = (
    values: UserLoginRequest
  ) => {
    userLoginMutation.mutateAsync(values, {
      onSuccess: async (data: UserLoginResponse) => {
        dispatch(setCredentials(data));
        toast.success(`User login successfully.`);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const onFinishFailed: FormProps<UserLoginRequest>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    toast.error(`Please revalidate the values of the entered fields?`);
  };

  useEffect(() => {
    if (access_token || user) navigate("/");
  }, [access_token, user, navigate]);

  return (
    <div className="flex_center flex-col w-screen h-screen">
      <img src={logoLogin} alt="logoLogin" width={48} height={48} />
      <h4 className="text-[30px] leading-[38px] font-semibold text-[#101828] mt-6 mb-8">
        Log in
      </h4>

      <div className="w-[360px]">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Typography.Title
              level={5}
              className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
            >
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              style={{ marginBottom: 20 }}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input
                placeholder="Enter your email"
                className="rounded-lg inter_font"
              />
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Typography.Title
              level={5}
              className="!text-[14px] !font-bold !leading-[22.4px] !text-[#0C1D46]"
            >
              Password
            </Typography.Title>
            <Form.Item
              name="password"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, whitespace: true }]}
            >
              <Input
                placeholder="Enter your password"
                className="rounded-lg inter_font"
                type="password"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "24px", marginTop: "24px" }}
            className="checkbox_forgot"
          >
            <Form.Item
              valuePropName="checked"
              className="w-1/2 inline-block mb-0"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Typography.Title
              level={5}
              className="inline-block text-end !text-[14px] !font-semibold !leading-[22.4px] !text-[#493CE7] !mb-0"
            >
              Forgot password?
            </Typography.Title>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 !text-[#F0EDFF] text-sm font-semibold leading-[22.4px]"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
