import axios from "./axiosClient";

export const getDoctorsApi = () => {
  return axios.get("/admin/doctors");
};

export const createDoctorApi = (data) => {
  return axios.post("/admin/doctors", data);
};

export const deleteDoctorApi = (doctorId) => {
  return axios.delete(`/admin/doctors/${doctorId}`);
};

export const toggleDoctorStatusApi = (doctorId) => {
  return axios.patch(`/admin/doctors/${doctorId}/toggle-status`);
};

export const updateDoctorApi = (doctorId, data) => {
  return axios.put(`/admin/doctors/${doctorId}`, data);
};
