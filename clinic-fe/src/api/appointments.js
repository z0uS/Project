import axios from "./axiosClient";

// Lấy lịch hẹn của bệnh nhân
export const getAppointmentsByPatientApi = (patientId) => {
  return axios.get(`/appointments/mine?patientId=${patientId}`);
};

// Tạo mới lịch hẹn
export const createAppointmentApi = (data) => {
  return axios.post("/appointments", data);
};

// Hủy lịch hẹn (theo route backend)
export const cancelAppointmentApi = (appointmentId) => {
  return axios.patch(`/appointments/${appointmentId}/cancel`);
};

// Đổi lịch hẹn
export const rescheduleAppointmentApi = (appointmentId, data) => {
  return axios.patch(`/appointments/${appointmentId}/reschedule`, data);
};

// Đổi trạng thái lịch hẹn
export const updateAppointmentStatusApi = (appointmentId, status) => {
  return axios.patch(`/appointments/${appointmentId}/status`, { status });
};

// Lấy lịch hẹn của bác sĩ
export const getAppointmentsByDoctorApi = (doctorId) => {
  return axios.get(`/appointments/doctor/${doctorId}`);
};
