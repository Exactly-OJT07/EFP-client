import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjectApi } from "../api/apiUrl";
import { createProjectAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";
import { openNotificationWithIcon } from "../components/notification/notification";
import { NotificationType } from "../constants/constants";

export const useGetData = (params) =>
  useQuery(
    [QUERY_KEY.PROJECT, params.page, params.take, params.search, params.status],
    async () => {
      const { data } = await getProjectApi(params);
      return data;
    },
  );

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((newProject) => createProjectAPI(newProject), {
    onSuccess: (data) => {
      console.log(data, "data00");
      queryClient.refetchQueries([QUERY_KEY.PROJECT]);
      openNotificationWithIcon("success", data.data.message);
    },
  });
  return mutation;
};
