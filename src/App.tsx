import "./App.css";
import { ConfigProvider } from "antd";
import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import AppLayout from "@/layout";
import AdminLayout from "@/layout/Admin";

// redux
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { getCurrentUserAsyncThunk } from "./redux/action/authAction";

// routes
import { RoutePath } from "@/routes/path";
import AuthRoute from "@/routes/AuthRoute";
import AppRoute from "@/routes/AppRoute";

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

/**
 * Admin site routes
 */
const TenantAdminsPage = lazy(() => import("@/pages/AppPage/Admin/Tenants"));
const StaffAdminPage = lazy(() => import("@/pages/AppPage/Admin/Staff"));
const AccountManagement = lazy(
  () => import("@/pages/AppPage/Admin/Tenants/Account-management")
);

const authRoutes = [
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
];

const appRoutes = [
  {
    path: RoutePath.NotFound,
    element: <NotFoundPage />,
  },
  {
    path: RoutePath.Forbidden,
    element: <ForbiddenPage />,
  },
  {
    path: RoutePath.Dashboard,
    element: <DashboardPage />,
  },
  {
    path: RoutePath.Cameras,
    element: <CameraPage />,
  },
  {
    path: RoutePath.Events,
    element: <EventPage />,
  },
  {
    path: RoutePath.Areas,
    element: <AreaPage />,
  },
];

/**
 * Admin site includes Tenants page, Staff page.
 */
const adminRoutes = [
  {
    path: RoutePath.Tenants,
    element: <TenantAdminsPage />,
  },
  {
    path: RoutePath.AccountManagement,
    element: <AccountManagement />,
  },
  {
    path: RoutePath.Staff,
    element: <StaffAdminPage />,
  },
];

function App() {
  const { access_token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      <Suspense>
        <Routes>
          {authRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<AuthRoute>{route.element}</AuthRoute>}
            />
          ))}

          <Route
            element={
              <AppRoute>
                <AdminLayout />
              </AppRoute>
            }
          >
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          <Route
            element={
              <AppRoute>
                <AppLayout />
              </AppRoute>
            }
          >
            {appRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          <Route
            path={RoutePath.Home}
            element={<Navigate to={RoutePath.Dashboard} replace />}
          />
          <Route
            path="*"
            element={<Navigate to={RoutePath.NotFound} replace />}
          />
        </Routes>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
