import { PrivateLayout } from "../components/layout/MainLayout";
import ManageProject from "../pages/ManageProject";
import ProjectDetail from "../pages/ProjectDetail";
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeDetail from "../pages/employees/EmployeeDetail";
import ManageEmployee from "../pages/employees/ManageEmployee";
import CreateEmployee from "../pages/employees/manageEmployee/CreateEmployee";
import CreateProject from "../pages/projects/components/createProject";

const routes = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "manageEmployees",
        children: [
          {
            path: "",
            element: <ManageEmployee />,
          },
          { path: "create", element: <CreateEmployee /> },
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
          { path: "createProject", element: <CreateProject /> },
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
