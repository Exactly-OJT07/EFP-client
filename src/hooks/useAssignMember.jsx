import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignMemberToProjectAPI } from "../api/apiUrl";

export const useassignMemberToProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (projectId, employeeId) => assignMemberToProjectAPI(projectId, employeeId),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries([QUERY_KEY.PROJECT]);
        openNotificationWithIcon("success", data.data.message);
      },
    },
  );
  return mutation;
};
