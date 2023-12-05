import { Suspense } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Spin } from "antd";

import router from "../src/routers/Routers";

const BASE_URL = import.meta.env.VITE_BASR_URL_API;
axios.defaults.baseURL = BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<Spin />}>
    <RouterProvider router={router} />
  </Suspense>
)