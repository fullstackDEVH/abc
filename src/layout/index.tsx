import { Avatar, Layout, Menu, theme } from "antd";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logoIMG from "@/assets/logo.png";
import {
  BankOutlined,
  CameraOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { RoutePath } from "@/routes/path";
import "./index.css"

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
  const navigate = useNavigate()
  const pathName = window.location.pathname
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Header
        className="flex justify-between px-1"
        style={{ background: colorBgContainer }}
      >
        <div className="flex w-full items-center cursor-pointer" onClick={() => navigate(RoutePath.Home)}>
          <img className="p-2" src={logoIMG} width={70} />
          <p className="font-bold text-xl pl-3 truncate">EMagic Eyes</p>
        </div>
       
        <div className="flex w-full">
          <Menu
              items={menus}
              className="w-full pr-10 justify-end"
              mode="horizontal"
              selectedKeys={[menus.find((menu) => pathName.includes(menu.key))?.key as string]}
              onSelect={(e) => navigate(e.key as string)}
            />
          <span>Admin</span>
          <div className="px-5">
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              A
            </Avatar>
          </div>
        </div>
      </Header>
      <Layout>
        <Layout>
          <Content className="h-full p-2" style={{ overflow: "auto" }}>
            <Outlet />
          </Content>
          <Footer className="text-right p-2 artice-font">
            E-MagicEyes &copy; {new Date().getFullYear()} Created by XXX
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
