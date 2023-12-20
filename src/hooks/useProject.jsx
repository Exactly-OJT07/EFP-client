import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjectApi,
  getProjectDetailApi,
  deleteProjectApi,
  patchStatusApi,
  assignEmployee,
  createProjectAPI,
  editProjectDetailApi,
  unassignEmployee,
  updateProject,
} from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";
import { openNotificationWithIcon } from "../components/notification/notification";

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
export const useEditProjectDetailData = (projectId) => {
  const queryClient = useQueryClient();
  const editProjectDetails = async ({ updatedData, startDate, endDate }) => {
    await editProjectDetailApi(projectId, {
      ...updatedData,
      startDate,
      endDate,
    });
  };
  return useMutation(editProjectDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.PROJECT]);
      openNotificationWithIcon("success", "Edit Project Details Successfully");
    },
  });
};
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
export const useAssignEmp = () => {
  const queryClient = useQueryClient();

  return useMutation((params) => assignEmployee(params), {
    onSuccess: () => {
      queryClient.refetchQueries([QUERY_KEY.PROJECT]);
      openNotificationWithIcon("success", "success");
    },
  });
};

export const useUnAssignEmp = () => {
  const queryClient = useQueryClient();

  return useMutation((params) => unassignEmployee(params), {
    onSuccess: () => {
      queryClient.refetchQueries([QUERY_KEY.PROJECT]);
      openNotificationWithIcon("success", "success");
    },
  });
};

export const useUpdateProject = (id) => {
  const queryClient = useQueryClient();
  return useMutation((params) => updateProject(id, params), {
    onSuccess: () => {
      openNotificationWithIcon("success", "success");
    },
  });
};
