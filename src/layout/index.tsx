import "./index.css";
import { FC } from "react";
import { Layout } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

// declarations supports
import { RoutePath } from "@/routes/path";

// components
import Avatar from "@/components/Avatar";

import logoIMG from "@/assets/logo_customer.svg";

const { Content, Footer, Header } = Layout;

const menus = [
  {
    label: "Dashboard",
    key: RoutePath.Dashboard,
  },
  {
    label: "Events",
    key: RoutePath.Events,
  },
  {
    label: "Cameras",
    key: RoutePath.Cameras,
  },
  {
    label: "Areas",
    key: RoutePath.Areas,
  },
  {
    label: "Staff",
    key: RoutePath.ManagerStaff,
  },
];

const AppLayout: FC = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  return (
    <Layout className="h-screen">
      <Header className="flex justify-between bg-white h-[77px] px-[30px] pt-3 pb-2 border-b-2">
        {/* logo */}
        <div
          className="flex_center gap-[14px] cursor-pointer"
          onClick={() => navigate(RoutePath.Home)}
        >
          <img src={logoIMG} width={38} height={39} />
          <p className="text-[#0F172A] text-[23.2px] leading-[29px] tracking-[-0.29px] font-extrabold">
            Customer’s logo
          </p>
        </div>

        {/* menu */}
        <div className="flex justify-between items-center min-w-[60%]">
          <div className="flex_center gap-5 px-9">
            {menus.map((menu, index) => (
              <Link
                to={menu.key}
                key={index}
                className={`block ${
                  pathName === menu.key
                    ? "text-[#493CE7]"
                    : "text-[#64748B] hover:text-[#493CE7]"
                } text-[16px] leading-[19.36px] font-semibold transition-all p-[10px]`}
              >
                {menu.label}
              </Link>
            ))}
          </div>
          <div className="px-2">
            <Avatar />
          </div>
        </div>
      </Header>
      <Layout>
        <Content className="h-full overflow-auto">
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
