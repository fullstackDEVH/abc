import React, { FC } from "react";

type AuthRouteProps = {
  children: React.ReactNode;
};

const AuthRoute: FC<AuthRouteProps> = (props) => {
  const { children } = props;
  return children;
};
export default AuthRoute;
