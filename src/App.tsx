import "./App.css";
import { ConfigProvider } from "antd";
import { Suspense, lazy, useEffect } from "react";
import { RouteObject, useNavigate, useRoutes } from "react-router-dom";

import AppLayout from "@/layout";
import AdminLayout from "@/layout/Admin";

// redux
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { getCurrentUserAsyncThunk } from "./redux/action/authAction";

// routes
import { RoutePath } from "@/routes/path";

// components
const LoginPage = lazy(() => import("@/pages/AuthPage/LoginPage"));
const ForgotPassPage = lazy(() => import("@/pages/AuthPage/ForgotPassPage"));
const RegisterPage = lazy(() => import("@/pages/AuthPage/RegisterPage"));

const NotFoundPage = lazy(() => import("@/pages/misc/NotFoundPage"));
const ForbiddenPage = lazy(() => import("@/pages/misc/ForbidenPage"));

const DashboardPage = lazy(() => import("@/pages/AppPage/DashboardPage"));
const CameraPage = lazy(() => import("@/pages/AppPage/CameraPage"));
const EventPage = lazy(() => import("@/pages/AppPage/EventPage"));
const AreaPage = lazy(() => import("@/pages/AppPage/AreaPage"));
const StaffManager = lazy(() => import("@/pages/AppPage/Staff"));

const ProtectedRoute = lazy(() => import("@/components/Protected-router"));
const RediectRouterByRole = lazy(() => import("@/components/Redirect-router"));

/**
 * Admin site routes
 */
const TenantAdminsPage = lazy(() => import("@/pages/AppPage/Admin/Tenants"));
const StaffAdminPage = lazy(() => import("@/pages/AppPage/Admin/Staff"));
const EventAdminPage = lazy(() => import("@/pages/AppPage/Admin/Event"));
const AccountManagement = lazy(
  () => import("@/pages/AppPage/Admin/Tenants/Account-management")
);

const authRoutes: RouteObject = {
  path: "/",
  children: [
    {
      path: RoutePath.Login,
      element: <LoginPage />,
    },
    {
      path: RoutePath.ForgotPass,
      element: <ForgotPassPage />,
    },
    {
      path: RoutePath.Register,
      element: <RegisterPage />,
    },
    {
      path: RoutePath.Home,
      element: <RediectRouterByRole />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: RoutePath.NotFound,
      element: <NotFoundPage />,
    },
  ],
};

const appRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      path: RoutePath.Forbidden,
      element: <ForbiddenPage />,
    },
    {
      path: RoutePath.Dashboard,
      element: (
        <ProtectedRoute
          element={<DashboardPage />}
          roles={["USER", "MANAGER"]}
        />
      ),
    },
    {
      path: RoutePath.Cameras,
      element: (
        <ProtectedRoute element={<CameraPage />} roles={["USER", "MANAGER"]} />
      ),
    },
    {
      path: RoutePath.Events,
      element: (
        <ProtectedRoute element={<EventPage />} roles={["USER", "MANAGER"]} />
      ),
    },
    {
      path: RoutePath.Areas,
      element: (
        <ProtectedRoute element={<AreaPage />} roles={["USER", "MANAGER"]} />
      ),
    },
    {
      path: RoutePath.ManagerStaff,
      element: (
        <ProtectedRoute
          element={<StaffManager />}
          roles={["USER", "MANAGER"]}
        />
      ),
    },
  ],
};

/**
 * Admin site includes Tenants page, Staff page.
 */
const adminRoutes: RouteObject = {
  path: "/",
  element: <AdminLayout />,
  children: [
    {
      path: RoutePath.Tenants,
      element: (
        <ProtectedRoute element={<TenantAdminsPage />} roles={["ADMIN"]} />
      ),
    },
    {
      path: RoutePath.AccountManagement,
      element: (
        <ProtectedRoute element={<AccountManagement />} roles={["ADMIN"]} />
      ),
    },
    {
      path: RoutePath.AdminStaff,
      element: (
        <ProtectedRoute element={<StaffAdminPage />} roles={["ADMIN"]} />
      ),
    },
    {
      path: RoutePath.EventsAdmin,
      element: (
        <ProtectedRoute element={<EventAdminPage />} roles={["QA_USER"]} />
      ),
    },
  ],
};

function App() {
  const { access_token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routes = useRoutes([authRoutes, appRoutes, adminRoutes]);

  useEffect(() => {
    if (access_token && !user) {
      dispatch(getCurrentUserAsyncThunk(access_token));
    } else if (!access_token) {
      navigate("/login");
    }
  }, [access_token, user, dispatch, navigate]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1F68D4",
          borderRadius: 10,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <Suspense>{routes}</Suspense>
    </ConfigProvider>
  );
}

export default App;
