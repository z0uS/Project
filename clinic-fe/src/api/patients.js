import axios from "./axiosClient";

/**
 * Lấy danh sách bệnh nhân (chỉ cho admin)
 * GET /admin/patients
 */
export const getPatientsApi = () => {
  return axios.get("/admin/patients");
};

/**
 * Cập nhật thông tin bệnh nhân
 * PUT /admin/patients/:id
 * @param {number} id
 * @param {object} data
 */
export const updatePatientApi = (id, data) => axios.put(`/admin/patients/${id}`, data);

// Tạo mới bệnh nhân (dùng cho admin)
export const createPatientApi = (data) => {
  // data: { fullName, email, phone, dateOfBirth, address }
  return axios.post("/admin/patients", data);
};


/**
 * Vô hiệu hóa (hoặc kích hoạt lại) tài khoản bệnh nhân
 * PATCH /admin/patients/:id/toggle-status
 */
export const togglePatientStatusApi = (id) => axios.patch(`/admin/patients/${id}/toggle-status`);

// Xóa vĩnh viễn tài khoản bệnh nhân
export const deletePatientApi = (id) => axios.delete(`/admin/patients/${id}`);
