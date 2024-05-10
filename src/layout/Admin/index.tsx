import { FC } from "react";
import { Avatar, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

// components
import Dropdown from "@/components/Dropdown/index";

// declarations supports
import { DATA_ADMIN } from "@/constants";
import { RoutePath } from "@/routes/path";

// icons
import logoIMG from "@/assets/logo.png";
import bellGreyIcon from "@/assets/logo/bell/bell_grey.svg";

const { Content, Footer, Header } = Layout;

const AdminLayout: FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="h-screen inter_font">
      <Header className="flex justify-between bg-white py-5 px-8 border-b-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(RoutePath.Home)}
        >
          <img className="p-2" src={logoIMG} width={70} />
          <p className="font-bold text-xl pl-3 truncate">EMagic Eyes</p>
        </div>

        <div className="justify-items-end flex">
          <div className="flex gap-6">
            <Dropdown
              title="Tenant management"
              dataVisible={DATA_ADMIN.DATA_TENANTS}
            />
            <Dropdown
              title="Staff management"
              dataVisible={DATA_ADMIN.DATA_STAFF}
            />
          </div>

          <div className="flex">
            <div className="pl-8 pr-6 flex_center gap-[16px]">
              <div className="cursor-pointer">
                <img
                  src={bellGreyIcon}
                  alt="bellGreyIcon"
                  width={24}
                  height={24}
                />
              </div>
              <Avatar className="cursor-pointer bg-[#fde3cf] text-[#f56a00]">
                A
              </Avatar>
            </div>
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

export default AdminLayout;
