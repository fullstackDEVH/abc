import { FC } from "react";
import { Avatar, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

// components
import Dropdown from "@/components/Dropdown/index";

// declarations supports
import { MenuAdmin } from "@/constants";
import { RoutePath } from "@/routes/path";

// icons
import logoIMG from "@/assets/logo_emg_admin.svg";
import { userLogout } from "@/redux/slice/authSlice";

// redux
import { useAppDispatch } from "@/redux/hook";

const { Content, Footer, Header } = Layout;

const AdminLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Layout className="h-screen inter_font">
      <Header className="flex justify-between bg-white h-[77px] px-8 pt-3 pb-2 border-b-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(RoutePath.Home)}
        >
          <img className="p-2" src={logoIMG} width={198} height={42} />
        </div>

        <div className="justify-items-end flex w-1/2 justify-between">
          <div className="flex gap-6 px-9 py-[9px]">
            <Dropdown
              title="Tenant management"
              dataVisible={MenuAdmin.DATA_TENANTS}
            />
            <Dropdown
              title="Staff management"
              dataVisible={MenuAdmin.DATA_STAFF}
            />
          </div>

          <div className="flex">
            <div className="pl-8 flex_center gap-[16px]">
              <Avatar
                className="w-[42px] h-[42px] cursor-pointer bg-[#fde3cf] text-[#f56a00]"
                onClick={() => dispatch(userLogout())}
              >
                A
              </Avatar>
            </div>
          </div>
        </div>
      </Header>
      <Layout>
        <Content className="h-full overflow-auto pt-2 pb-[55px] px-8">
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
