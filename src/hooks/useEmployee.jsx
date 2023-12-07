import { useQuery } from "@tanstack/react-query";
import { getEmployeeAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetClients = (params) =>
  useQuery(
    [QUERY_KEY.EMPLOYEE, params.page, params.take, params.search],
    async () => {
      const { data } = await getEmployeeAPI(params);
      return data;
    },
  );
