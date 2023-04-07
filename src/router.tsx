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
const OptimaDaashBoard = Loader(lazy(() => import("src/content/dashboards")));

const HrPage = Loader(lazy(() => import("src/content/hr")));
const RecruiterPage = Loader(lazy(() => import("src/content/recruiter")));

const SettingPage = Loader(lazy(() => import("src/content/settings")));

const LoginPage = Loader(
  lazy(() => import("src/content/pages/Auth/Login/Login"))
);

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
        element: <OptimaDaashBoard />,
      },
      {
        path: "",
        element: <Navigate to="hr" replace />,
      },
      {
        path: "hr",
        element: <HrPage />,
      },
      {
        path: "",
        element: <Navigate to="recruiter" replace />,
      },
      {
        path: "recruiter",
        element: <RecruiterPage />,
      },
      {
        path: "",
        element: <Navigate to="settings" replace />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
    ],
  },
];

export default routes;
