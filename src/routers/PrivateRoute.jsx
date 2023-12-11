import { PrivateLayout } from "../components/layout/MainLayout";
import Dashboard from '../pages/Dashboard'
import ManageProject from "../pages/ManageProject";
import ManageEmployee from "../pages/ManageEmployee";

const routes = [
    {
        element: <PrivateLayout />,
        children: [
        {
            path: "",
            element: <Dashboard/>,
        },
        {
            path: "Dashboard",
            children: [
            { path: "", element: <Dashboard/> },
                // {
                // path: 'create',
                // element: <div>ád</div>,
                // },
                // {
                //   path: 'update/:id',
                //   element: < />,
                // },
                // {
                //   path: ':id',
                //   element: < />,
                // },
                ],
        },
        {
            path: "manageUsers",
            element: <ManageEmployee/>,
        },
        {
            path: "manageProjects",
            element: <ManageProject/>,
        },
        {
            path: "404",
            element: <div>404</div>,
        },
        ],
    },
];

export default routes;