import axios from "axios";
import { API_URL } from "../constants/constants";
import { Buffer } from "buffer";

export const getEmployeeAPI = (params) =>
  axios.get(API_URL.EMPLOYEE, { params });

export const getEmployeeDetailApi = (employeeId, params) =>
  axios.get(`${API_URL.EMPLOYEE}/${employeeId}`, { params });

export const getManagerAPI = (params) => axios.get(API_URL.MANAGER, { params });

export const getProjectApi = (params) => axios.get(API_URL.PROJECT, { params });

export const getProjectDetailApi = (projectId, params) =>
  axios.get(`${API_URL.PROJECT}/${projectId}`, { params });

export const editProjectDetailApi = (projectId, params) =>
  axios.patch(`${API_URL.PROJECT}/${projectId}`, params);

export const deleteProjectApi = (projectId) =>
  axios.delete(`${API_URL.PROJECT}/${projectId}`);

export const patchStatusApi = (projectId, status) =>
  axios.patch(`${API_URL.PROJECT}/${projectId}`, { status });

export const createProjectAPI = (params) => axios.post(API_URL.PROJECT, params);

export const deleteEmployeeApi = (employeeId) =>
  axios.delete(`${API_URL.EMPLOYEE}/${employeeId}`);

export const createEmployeeAPI = (params) => {
  console.log("Request Payload:", params);
  return axios.post(`${API_URL.EMPLOYEE}`, params);
};

export const getEmployeeTotalAPI = (params) =>
  axios.get(API_URL.EMPLOYEE_TOTAL, { params });

export const getProjectTotalAPI = (params) =>
  axios.get(API_URL.PROJECT_TOTAL, { params });

export const exportCv = async (id) =>
  await axios
    .post(`${API_URL.EMPLOYEE}/cv`, {
      id,
      responseType: "arraybuffer",
    })
    .then((response) => {
      const blob = new Blob([Buffer.from(response.data, "hex")], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cv.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
