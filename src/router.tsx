import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";

import SuspenseLoader from "src/components/SuspenseLoader";
import { LOGIN } from "./constants/routeConstants";
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
const Dashboard = Loader(lazy(() => import("src/pages/dashboard/Dashboard")));

const Emplooyes = Loader(lazy(() => import("src/pages/hr/employees")));
const DepartmentList = Loader(
  lazy(() => import("src/pages/hr/departments/list/DepartmentList"))
);
const Designations = Loader(lazy(() => import("src/pages/hr/designations")));
const Applicants = Loader(lazy(() => import("src/pages/recruiter/applicants")));
const Interviews = Loader(lazy(() => import("src/pages/recruiter/interviews")));

const Users = Loader(lazy(() => import("src/pages/settings/users")));

const LoginPage = Loader(lazy(() => import("src/pages/auth/login/Login")));
const CreateDepartment = Loader(
  lazy(() => import("src/pages/hr/departments/create/CreateDepartment"))
);

const routes: RouteObject[] = [
  {
    path: LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        element: <ProtectedRoute />,
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
            path: "employees",
            element: <Emplooyes />,
          },
          {
            path: "departments",
            children: [
              {
                index: true,
                element: <DepartmentList />,
              },
              {
                path: "create",
                element: <CreateDepartment />,
              },
            ],
          },
          {
            path: "designations",
            element: <Designations />,
          },
          {
            path: "applicants",
            element: <Applicants />,
          },
          {
            path: "interviews",
            element: <Interviews />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to="dashboard" replace />,
  },
];

export default routes;
