export enum RoutePath {
  Home = "/",
  Login = "/login",
  ForgotPass = "/forgot-password",
  Register = "/register",
  Dashboard = "/dashboard",
  Events = "/events",
  Cameras = "/cameras",
  Areas = "/areas",
  NotFound = "/404",
  Forbidden = "/403",

  // admin site
  Tenants = "/admin/tenants",
  AccountManagement = "/admin/account-management/:tenantId",
  Staff = "/admin/staff",
}
