import { useQuery } from "@tanstack/react-query";
import { getManagerAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetManager = (params) =>
  useQuery([QUERY_KEY.MANAGER], async () => {
    const { data } = await getManagerAPI(params);
    return data;
  });
