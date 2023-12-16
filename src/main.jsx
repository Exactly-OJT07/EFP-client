import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import i18n from "./helpers/i18n";

import { Spin } from "antd";

import router from "../src/routers/Routers";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
axios.defaults.baseURL = BASE_URL;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Spin />}>
        <RouterProvider router={router} />
      </Suspense>
    </I18nextProvider>
  </QueryClientProvider>,
);
