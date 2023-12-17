import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjectApi,
  getProjectDetailApi,
  deleteProjectApi,
  patchStatusApi,
  createProjectAPI,
} from "../api/apiUrl";
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

export const useProjectStatusUpdate = () => {
  const queryClient = useQueryClient();

  const projectStatusUpdate = async ({ projectId, status }) => {
    await patchStatusApi(projectId, status);
  };

  return useMutation(projectStatusUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.PROJECT]);
      openNotificationWithIcon("success", "Change Status Successfully");
    },
  });
};

export const useGetProjectData = (id) =>
  useQuery([QUERY_KEY.PROJECT, id], async () => {
    const { data } = await getProjectDetailApi(id);
    return data;
  });

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const deleteProject = async (projectId) => {
    await deleteProjectApi(projectId);
  };

  return useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.PROJECT);
      openNotificationWithIcon("success", "Delete Project Successfully");
    },
  });
};

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
