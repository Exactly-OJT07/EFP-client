import { useQuery } from "@tanstack/react-query";
import { getEmployeeAPI } from "../api/apiUrl";
import { createEmployeeAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";
import { useQueryClient, useMutation } from "@tanstack/react-query";

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

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newEmployee) => createEmployeeAPI(newEmployee),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([QUERY_KEY.EMPLOYEE]);
      },
    },
  );

  return mutation;
};
