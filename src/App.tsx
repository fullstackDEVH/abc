import { ConfigProvider } from "antd";
import "./App.css";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePath } from "./routes/path";
import AuthRoute from "./routes/AuthRoute";
import AppRoute from "./routes/AppRoute";
import AppLayout from "./layout";
const LoginPage = lazy(() => import('./pages/LoginPage'))
const HomePage = lazy(() => import('./pages/HomePage'))

const authRoutes = [
  {
    path: RoutePath.Login,
    element: <LoginPage />
  }
];

const appRoutes = [
  {
    path: RoutePath.Home,
    element: <HomePage />
  }
];

function App() {
  return <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1F68D4',
      borderRadius: 10
    }
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
      <Route path="*" element={<Navigate to={RoutePath.Home} replace />} />
    </Routes>
  </Suspense>
</ConfigProvider>;
}

export default App;
