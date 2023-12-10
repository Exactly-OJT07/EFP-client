import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getEmployeeAPI, getEmployeeDetailApi, createEmployeeAPI } from "../api/apiUrl";
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

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newEmployee) => createEmployeeAPI(newEmployee),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.EMPLOYEE]);
      },
    },
  );

  return mutation;
};

export const useGetOneEmployee = (id) => {
  return useQuery([QUERY_KEY.EMPLOYEE, id], async () => {
    const { data } = await getEmployeeDetailApi(id);
    return data;
  });
};
