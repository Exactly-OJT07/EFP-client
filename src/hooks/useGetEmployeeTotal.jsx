import { useQuery } from "@tanstack/react-query";
import { getEmployeeTotalAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetEmployeeTotal = (params) =>
  useQuery([QUERY_KEY.EMPLOYEE_TOTAL, params.period], async () => {
    const { data } = await getEmployeeTotalAPI(params);
    return data;
  });
