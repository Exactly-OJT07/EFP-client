import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjectApi, patchStatusApi  } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";
import { openNotificationWithIcon } from '../components/notification/notification';

export const useGetData = (params) =>
  useQuery(
    [QUERY_KEY.PROJECT, params.page, params.take, params.search, params.status],
    async () => {
      const { data } = await getProjectApi(params);
      return data;
    }
  );
  export const useProjectStatusUpdate = () => {
    const queryClient = useQueryClient();  
  
    const projectStatusUpdate = async ({ projectId, status }) => {
      await patchStatusApi(projectId, status);
    };
  
    return useMutation(projectStatusUpdate, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.PROJECT]);
        openNotificationWithIcon('success', 'Change Status Successfully');
      }
    });
  };
  