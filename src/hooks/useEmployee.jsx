import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  createEmployeeAPI,
  deleteEmployeeApi,
  getEmployeeAPI,
  getEmployeeDetailApi,
  patchEmployeeApi,
  exportCv,
} from "../api/apiUrl";
import { openNotificationWithIcon } from "../components/notification/notification";
import { QUERY_KEY } from "../constants/query-key";

export const useGetClients = (params) =>
  useQuery(
    [
      QUERY_KEY.EMPLOYEE,
      params.page,
      params.take,
      params.searchByName,
      params.searchByEmail,
    ],
    async () => {
      const { data } = await getEmployeeAPI(params);
      return data;
    },
  );

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(
    (newEmployee) => createEmployeeAPI(newEmployee),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([QUERY_KEY.EMPLOYEE]);
        navigate(-1);
        openNotificationWithIcon("success", "Create employee Successfully");
      },
      onError: ({ response }) => {
        openNotificationWithIcon("error", "Create employee failed");
      },
    },
  );

  return mutation;
};

export const useGetOneEmployee = (id) => {
  return useQuery([QUERY_KEY.EMPLOYEE, id], async () => {
    const { data } = await getEmployeeDetailApi(id);
    return data;
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const deleteEmployee = async (employeeId) => {
    await deleteEmployeeApi(employeeId);
  };
  const navigate = useNavigate();
  return useMutation(deleteEmployee, {
    onSuccess: () => {
      openNotificationWithIcon("success", "Delete Employee Successfully");
      queryClient.invalidateQueries(QUERY_KEY.EMPLOYEE);
      navigate("/manageEmployees");
    },
  });
};

export const useUpdateEmployee = (employeeId) => {
  const queryClient = useQueryClient();

  const employeeUpdate = async ({ data }) => {
    await patchEmployeeApi(employeeId, data);
  };

  const mutation = useMutation(employeeUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.EMPLOYEE]);
      openNotificationWithIcon("success", "Change Employee Data Successfully");
    },
  });

  return mutation;
};

export const useCVExport = () =>
  useMutation(async (id) => await exportCv(id), {
    onError({ response }) {
      if (response.status === 400) {
        notificationError("Not found employee");
      } else {
        notificationError("Please try again");
      }
    },
  });
