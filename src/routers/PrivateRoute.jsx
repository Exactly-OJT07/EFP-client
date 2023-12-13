import { PrivateLayout } from "../components/layout/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageProject from "../pages/ManageProject";
import ManageEmployee from "../pages/employees/ManageEmployee";
import EmployeeDetail from "../pages/employees/EmployeeDetail";
import ProjectDetail from "../pages/ProjectDetail";
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
