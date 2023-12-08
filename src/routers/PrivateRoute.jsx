import { PrivateLayout } from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import ManageProject from "../pages/ManageProject";
import ManageEmployee from "../pages/ManageEmployee";
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
        path: "Dashboard",
        children: [
          { path: "", element: <Dashboard /> },
        ],
      },
      {
        path: "manageUsers",
        element: <ManageEmployee />,
      },
      {
        path: "manageProjects",
        children: [
          {
            path: "",
            element: <ManageProject />
          },
          { path: "projectDetail/:id", element: <ProjectDetail /> }
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
