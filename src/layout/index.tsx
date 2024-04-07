import { Avatar, Layout, Menu, theme } from "antd";
import React, { FC, useState } from "react";
import type { MenuProps } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import logoIMG from "../assets/logo.png";
import "./index.css";

const { Content, Sider, Footer, Header } = Layout;

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const AppLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="h-screen">
      <Header
        className="flex justify-between px-1"
        style={{ background: colorBgContainer }}
      >
        <div className="flex items-center">
          <img className="p-2" src={logoIMG} width={70} />
          <p className="font-bold text-xl pl-3">EMagic Eyes</p>
        </div>
        <div className="flex">
          <span>Admin</span>
          <div className="px-5">
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              A
            </Avatar>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          width="15%"
          style={{
            background: colorBgContainer,
            overflowY: "auto",
            overflowX: "-moz-hidden-unscrollable",
            height: "100%",
            position: "relative",
          }}
          collapsed={collapsed}
        >
          <button
            className="collapsed-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
          </button>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={items2}
            style={{ maxHeight: "100vh" }}
          />
        </Sider>
        <Layout>
          <Content className="h-full p-5" style={{ overflow: "initial" }}>
            <Outlet />
          </Content>
          <Footer className="text-right p-2">
            EMagicEyes ©{new Date().getFullYear()} Created by XXX
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
