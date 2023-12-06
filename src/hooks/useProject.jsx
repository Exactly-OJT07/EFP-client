import { useQuery } from "@tanstack/react-query";
import { getProjectApi } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

// export const useGetClients = (params) =>
//   useQuery(
//     {
//       queryKey: [QUERY_KEY.PROJECT, params.page, params.take],
//       queryFn: async () => {
//         const { data } = await getProjectApi(params);
//         return data;
//       },
//     },
//     {
//       cacheTime: 0,
//     }
//   );

export const useGetData = (params) =>
  useQuery([QUERY_KEY.PROJECT], async () => {
    const { data } = await getProjectApi(params);
    return data;
  });
