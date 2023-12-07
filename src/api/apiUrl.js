import axios from "axios";
import { API_URL } from "../constants/constants";

export const getEmployeeAPI = (params) =>
  axios.get(API_URL.EMPLOYEE, { params });
export const getProjectApi = (params) => axios.get(API_URL.PROJECT, { params });
