import axios from "axios";
import { API_URL } from "../constants/constants";

export const getEmployeeAPI = (params) =>
  axios.get(API_URL.EMPLOYEE, { params });

export const getEmployeeDetailApi = (employeeId, params) =>
  axios.get(`${API_URL.EMPLOYEE}/${employeeId}`, { params });

export const getManagerAPI = (params) => axios.get(API_URL.MANAGER, { params });

export const getProjectApi = (params) => axios.get(API_URL.PROJECT, { params });

export const getProjectDetailApi = (projectId, params) =>
  axios.get(`${API_URL.PROJECT}/${projectId}`, { params });

export const deleteProjectApi = (projectId) =>
  axios.delete(`${API_URL.PROJECT}/${projectId}`);

export const patchStatusApi = (projectId, status) =>
  axios.patch(`${API_URL.PROJECT}/${projectId}`, { status });

export const createProjectAPI = (params) => axios.post(API_URL.PROJECT, params);

export const deleteEmployeeAPI = (params) =>
  axios.delete(API_URL.EMPLOYEE, { params });

export const checkDuplicateEmployeeAPI = (fieldName, value) =>
  axios.post(`${API_URL.EMPLOYEE}/check-duplicate`, { fieldName, value });

export const getManagers = async () => {
  try {
    const response = await axios.get(API_URL.EMPLOYEE, {
      params: {
        isManager: true, // Add a parameter to filter managers
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching managers:", error);
    console.log("Request config:", error.config);
    console.log("Response data:", error.response.data);
    console.log("Response status:", error.response.status);
    console.log("Response headers:", error.response.headers);
    throw error;
  }
};

export const createEmployeeAPI = (params) => {
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.EMPLOYEE}`, params);
};
