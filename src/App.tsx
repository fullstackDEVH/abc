import { ConfigProvider } from "antd";
import "./App.css";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePath } from "@/routes/path";
import AuthRoute from "@/routes/AuthRoute";
import AppRoute from "@/routes/AppRoute";
import AppLayout from "@/layout";

const LoginPage = lazy(() => import('@/pages/AuthPage/LoginPage'))
const ForgotPassPage = lazy(() => import('@/pages/AuthPage/ForgotPassPage'))
const RegisterPage = lazy(() => import('@/pages/AuthPage/RegisterPage'))

const NotFoundPage = lazy(() => import('@/pages/misc/NotFoundPage'))
const ForbiddenPage = lazy(() => import('@/pages/misc/ForbidenPage'))

const DashboardPage = lazy(() => import('@/pages/AppPage/DashboardPage'))
const CameraPage = lazy(() => import('@/pages/AppPage/CameraPage'))
const EventPage = lazy(() => import('@/pages/AppPage/EventPage'))
const AreaPage = lazy(() => import('@/pages/AppPage/AreaPage'))

const authRoutes = [
  {
    path: RoutePath.Login,
    element: <LoginPage />
  },
  {
    path: RoutePath.ForgotPass,
    element: <ForgotPassPage />
  },
  {
    path: RoutePath.Register,
    element: <RegisterPage />
  }
];

const appRoutes = [
  {
    path: RoutePath.NotFound,
    element: <NotFoundPage />
  },
  {
    path: RoutePath.Forbidden,
    element: <ForbiddenPage />
  },
  {
    path: RoutePath.Dashboard,
    element: <DashboardPage />
  },
  {
    path: RoutePath.Cameras,
    element: <CameraPage />
  },
  {
    path: RoutePath.Events,
    element: <EventPage />
  },
  {
    path: RoutePath.Areas,
    element: <AreaPage />
  }
];

function App() {
  return <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1F68D4',
      borderRadius: 10,
      fontFamily: "Noto Sans, sans-serif",
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
      <Route path={RoutePath.Home} element={<Navigate to={RoutePath.Dashboard} replace />} />
      <Route path="*" element={<Navigate to={RoutePath.NotFound} replace />} />
    </Routes>
  </Suspense>
</ConfigProvider>;
}

export default App;
