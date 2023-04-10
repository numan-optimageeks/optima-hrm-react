import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
const Dashboard = Loader(lazy(() => import("src/pages/dashboard/Dashboard")));

const Hr = Loader(lazy(() => import("src/pages/hr/Hr")));
const Recruiter = Loader(lazy(() => import("src/pages/recruiter/Recruiter")));

const SettingPage = Loader(lazy(() => import("src/pages/settings/Settings")));

const LoginPage = Loader(lazy(() => import("src/pages/auth/login/Login")));

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "hr",
        element: <Hr />,
      },
      {
        path: "recruiter",
        element: <Recruiter />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
      {
        path: "*",
        element: <Navigate to="dashboard" replace />,
      },
    ],
  },
];

export default routes;
