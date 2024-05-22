import { ReadUserResponse } from "@/models/user";
import { useAppSelector } from "@/redux/hook";
import { Navigate } from "react-router-dom";

const RediectRouterByRole = () => {
  const { user } = useAppSelector((state) => state.auth);

  const redirectToDefaultPage = (
    userInfor: ReadUserResponse
  ): React.ReactNode => {
    switch (userInfor.role) {
      case "ADMIN":
        return <Navigate to="/admin/tenants" replace={true} />;

      case "QA_USER":
        return <Navigate to="/admin/events" replace={true} />;

      case "MANAGER":
      case "USER":
        return <Navigate to="/events" replace={true} />;

      default:
        return <Navigate to="/events" replace={true} />;
    }
  };
  return user ? redirectToDefaultPage(user) : null;
};

export default RediectRouterByRole;
