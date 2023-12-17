import axios from "axios";
import { API_URL } from "../constants/constants";

export const getEmployeeAPI = (params) =>
  axios.get(API_URL.EMPLOYEE, { params });

export const getManagerAPI = (params) => axios.get(API_URL.MANAGER, { params });

export const getProjectApi = (params) => axios.get(API_URL.PROJECT, { params });

export const getProjectDetailApi = (projectId, params) =>
  axios.get(`${API_URL.PROJECT}/${projectId}`, { params });

export const deleteProjectApi = (projectId) =>
  axios.delete(`${API_URL.PROJECT}/${projectId}`);

export const patchStatusApi = (projectId, status) =>
  axios.patch(`${API_URL.PROJECT}/${projectId}`, { status });

export const getAssignedAndUnassignedEmployeesAPI = (projectId) =>
  axios.get(`/project/${projectId}/unassigned`);

export const assignMemberToProjectAPI = (employee_project) => {
  console.log("Data to be sent to API:", employee_project);
  return axios.post(`/assign`, { employee_project });
};

export const createProjectAPI = (params) => axios.post(API_URL.PROJECT, params);
