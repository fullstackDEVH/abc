import "./index.css";
import { FC } from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  BankOutlined,
  CameraOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

// declarations supports
import { RoutePath } from "@/routes/path";

// components
import Avatar from "@/components/Avatar";

import logoIMG from "@/assets/logo.png";
import { useAppSelector } from "@/redux/hook";

const { Content, Footer, Header } = Layout;

const menus = [
  {
    label: "Dashboard",
    key: RoutePath.Dashboard,
    icon: <LaptopOutlined />,
  },
  {
    label: "Events",
    key: RoutePath.Events,
    icon: <NotificationOutlined />,
  },
  {
    label: "Cameras",
    key: RoutePath.Cameras,
    icon: <CameraOutlined />,
  },
  {
    label: "Areas",
    key: RoutePath.Areas,
    icon: <BankOutlined />,
  },
];

const AppLayout: FC = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Layout className="h-screen">
      <Header className="flex justify-between px-1 bg-white">
        <div
          className="flex w-1/2 items-center cursor-pointer"
          onClick={() => navigate(RoutePath.Home)}
        >
          <img
            className="p-2"
            src={
              user?.tenant?.logo
                ? `${import.meta.env.VITE_API_URL}/api/v1/blobs/${user.tenant.logo}`
                : logoIMG
            }
            width={70}
          />
          <p className="font-bold text-xl pl-3 truncate">EMagic Eyes</p>
        </div>

        <div className="flex_center w-full">
          <Menu
            items={menus}
            className="w-full pr-10 justify-end"
            mode="horizontal"
            selectedKeys={[
              menus.find((menu) => pathName.includes(menu.key))?.key as string,
            ]}
            onSelect={(e) => navigate(e.key as string)}
          />
          <div className="px-2">
            <Avatar />
          </div>
        </div>
      </Header>
      <Layout>
        <Content className="h-full p-2 overflow-auto">
          <Outlet />
        </Content>
        <Footer className="text-right p-2 artice-font">
          E-MagicEyes &copy; {new Date().getFullYear()} Created by Rye
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
