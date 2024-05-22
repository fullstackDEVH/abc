// ProtectedRoute.tsx
import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import { USER_ROLE } from "@/models/user";

interface ProtectedRouteProps {
  roles: USER_ROLE[];
  element: React.ReactNode;
}

const ProtectedRoute = ({ roles, element }: ProtectedRouteProps) => {
  // const user = useSelector((state: RootState) => state.auth.user);

  // if (user && !roles.includes(user.role))
  //   return <Navigate to={"/404"} replace={true} />;
  console.log(roles);
  
  return element;
};

export default ProtectedRoute;
