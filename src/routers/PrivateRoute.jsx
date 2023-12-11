import { PrivateLayout } from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import ManageProject from "../pages/ManageProject";
import ManageEmployee from "../pages/employees/ManageEmployee";
import EmployeeDetail from "../pages/employees/EmployeeDetail";
import ProjectDetail from "../pages/ProjectDetail";
import Circleprogress from "../components/circle-progress/Circleprogress"

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
          { path: "projectDetail/:id", element: <ProjectDetail /> },
        ],
      },
      {
        path: "circle-progress",
        element: <Circleprogress />,
      },
      {
        path: "404",
        element: <div>404</div>,
      },
    ],
  },
];

export default routes;
