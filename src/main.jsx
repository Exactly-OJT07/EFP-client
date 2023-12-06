import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Spin } from "antd";

import router from "../src/routers/Routers";

const BASE_URL = import.meta.env.VITE_BASR_URL_API;
axios.defaults.baseURL = BASE_URL;
console.log(BASE_URL);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<Spin />}>
      <RouterProvider router={router} />
    </Suspense>
  </QueryClientProvider>
);
