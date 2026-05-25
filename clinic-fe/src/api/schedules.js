import axios from "./axiosClient";

// Lấy danh sách lịch làm việc
export const getSchedulesApi = () => axios.get("/schedules");

// Thêm mới lịch làm việc
export const createScheduleApi = (data) => axios.post("/schedules", data);

// Sửa lịch làm việc
export const updateScheduleApi = (id, data) => axios.put(`/schedules/${id}`, data);

// Xóa lịch làm việc
export const deleteScheduleApi = (id) => axios.delete(`/schedules/${id}`);

// (Tuỳ chọn) Lấy danh sách bác sĩ để chọn trong form thêm/sửa
export const getDoctorsApi = () => axios.get("/admin/doctors");
