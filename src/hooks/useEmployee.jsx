import { useQuery } from "@tanstack/react-query";
import { getEmployeeAPI } from "../api/apiUrl";
import { createEmployeeAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { checkDuplicateEmployeeAPI } from "../api/apiUrl";

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

  const handleCreateEmployee = async (newEmployee) => {
    const isDuplicate = await checkDuplicateEmployeeAPI(
      "fieldName",
      newEmployee.fieldName,
    );
    console.log("Is Duplicate:", isDuplicate);

    if (!isDuplicate) {
      mutation.mutate(newEmployee);
    } else {
      console.log("Duplicate found. Not creating employee.");
    }
  };

  return { ...mutation, handleCreateEmployee };
};
