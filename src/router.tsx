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

const Employees = Loader(
  lazy(() => import("src/pages/hr/employees/list/EmployeeList"))
);
const DepartmentList = Loader(
  lazy(() => import("src/pages/hr/departments/list/DepartmentList"))
);
const Designations = Loader(
  lazy(() => import("src/pages/hr/designations/list/DesignationList"))
);
const Applicants = Loader(
  lazy(() => import("src/pages/recruiter/applicants/list/ApplicantList"))
);
const Interviews = Loader(
  lazy(() => import("src/pages/recruiter/interviews/list/InterviewList"))
);

const Users = Loader(
  lazy(() => import("src/pages/settings/users/list/UsersList"))
);

const LoginPage = Loader(lazy(() => import("src/pages/auth/login/Login")));
const CreateDepartment = Loader(
  lazy(() => import("src/pages/hr/departments/create/CreateDepartment"))
);
const ViewDepartment = Loader(
  lazy(() => import("src/pages/hr/departments/view/ViewDepartment"))
);
const CreateDesignation = Loader(
  lazy(() => import("src/pages/hr/designations/create/CreateDesignation"))
);
const ViewDesignation = Loader(
  lazy(() => import("src/pages/hr/designations/view/ViewDesignation"))
);
const CreateEmployee = Loader(
  lazy(() => import("src/pages/hr/employees/create/CreateEmployee"))
);
const ViewEmployee = Loader(
  lazy(() => import("src/pages/hr/employees/view/ViewEmployee"))
);

const CreateUser = Loader(
  lazy(() => import("src/pages/settings/users/create/CreateUser"))
);

const ViewUser = Loader(
  lazy(() => import("src/pages/settings/users/view/ViewUser"))
);
const CreateApplicant = Loader(
  lazy(() => import("src/pages/recruiter/applicants/create/CreateApplicant"))
);

const ViewApplicant = Loader(
  lazy(() => import("src/pages/recruiter/applicants/view/ViewApplicant"))
);
const InterviewDetails = Loader(
  lazy(() => import("src/pages/recruiter/interviews/details/InterviewDetails"))
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
            children: [
              {
                index: true,
                element: <Employees />,
              },
              {
                path: "create",
                element: <CreateEmployee />,
              },
              { path: "view", element: <ViewEmployee /> },
            ],
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
              { path: "view", element: <ViewDepartment /> },
            ],
          },
          {
            path: "designations",
            children: [
              {
                index: true,
                element: <Designations />,
              },
              {
                path: "create",
                element: <CreateDesignation />,
              },
              { path: "view", element: <ViewDesignation /> },
            ],
          },
          {
            path: "applicants",

            children: [
              {
                index: true,
                element: <Applicants />,
              },
              {
                path: "create",
                element: <CreateApplicant />,
              },
              { path: "view", element: <ViewApplicant /> },
            ],
          },
          {
            path: "interviews",

            children: [
              {
                index: true,
                element: <Interviews />,
              },
              {
                path: "details",
                element: <InterviewDetails />,
              },
              {
                path: "create",
                element: <CreateUser />,
              },
              { path: "view", element: <ViewUser /> },
            ],
          },
          {
            path: "users",

            children: [
              {
                index: true,
                element: <Users />,
              },
              {
                path: "create",
                element: <CreateUser />,
              },
              { path: "view", element: <ViewUser /> },
            ],
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
