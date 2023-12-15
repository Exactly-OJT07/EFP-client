import { useQuery } from "@tanstack/react-query";
import { getProjectTotalAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetProjectTotal = (params) =>
  useQuery([QUERY_KEY.PROJECT_TOTAL, params.period], async () => {
    const { data } = await getProjectTotalAPI(params);
    return data;
  });
