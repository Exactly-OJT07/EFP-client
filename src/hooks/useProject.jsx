import { useQuery } from "@tanstack/react-query";
import { getProjectApi } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetData = (params) =>
  useQuery(
    [QUERY_KEY.PROJECT, params.page, params.take, params.search, params.status],
    async () => {
      const { data } = await getProjectApi(params);
      return data;
    }
  );
