import { useQuery } from "@tanstack/react-query";
import { getAssignedAndUnassignedEmployeesAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetAssignedAndUnassignedEmployees = (projectId) =>
  useQuery(["assignedAndUnassignedEmployees", projectId], async () => {
    const { data } = await getAssignedAndUnassignedEmployeesAPI(projectId);
    return data;
  });
