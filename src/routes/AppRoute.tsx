import React, { FC } from "react";

type AppRouteProps = {
  children: React.ReactNode;
};
const AppRoute: FC<AppRouteProps> = (props) => {
  const { children } = props;
  return children;
};
export default AppRoute;
