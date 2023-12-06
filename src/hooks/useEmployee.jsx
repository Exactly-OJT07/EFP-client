import { useQuery } from "@tanstack/react-query";
import { getEmployeeAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetClients = (params) =>
  useQuery({
    queryKey: [QUERY_KEY.EMPLOYEE],
    queryFn: async () => {
      const { data } = await getEmployeeAPI(params);
      return data;
    },
  });
