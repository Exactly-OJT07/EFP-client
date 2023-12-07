import { PrivateLayout } from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import ManageProject from "../pages/ManageProject";
import ManageEmployee from "../pages/employees/ManageEmployee";
import EmployeeDetail from "../pages/employees/EmployeeDetail";
import ProjectDetail from "../pages/ProjectDetail";

const routes = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "manageUsers",
        element: <ManageEmployee />,
        children: [
          {
            path: "",
            element: <ManageProject />,
          },
          { path: "employeeDetail/:id", element: <EmployeeDetail /> },
        ],
      },
      {
        path: "manageProjects",
        children: [
          {
            path: "",
            element: <ManageProject />,
          },
          { path: "projectDetail/:id", element: <ProjectDetail /> },
        ],
      },
      {
        path: "404",
        element: <div>404</div>,
      },
    ],
  },
];

export default routes;
