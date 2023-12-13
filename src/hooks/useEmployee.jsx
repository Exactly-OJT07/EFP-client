import { useQuery } from "@tanstack/react-query";
import { getEmployeeAPI, getEmployeeDetailApi } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetClients = (params) =>
  useQuery(
    [
      QUERY_KEY.EMPLOYEE,
      params.page,
      params.take,
      params.searchByName,
      params.searchByEmail,
    ],
    async () => {
      const { data } = await getEmployeeAPI(params);
      return data;
    },
  );

export const useGetOneEmployee = (id) => {
  return useQuery([QUERY_KEY.EMPLOYEE, id], async () => {
    const { data } = await getEmployeeDetailApi(id);
    return data;
  });
};
