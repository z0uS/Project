// src/api/users.js
import axios from "./axiosClient";

/**
 * Lấy danh sách người dùng (ví dụ: admin có thể dùng)
 */
export const getUsersApi = () => {
  return axios.get("/users");
};

/**
 * Lấy thông tin chi tiết 1 người dùng theo ID
 */
export const getUserByIdApi = (userId) => {
  return axios.get(`/users/${userId}`);
};

/**
 * Cập nhật thông tin người dùng
 * @param {string} userId
 * @param {object} data - { fullName, phone, address, ... }
 */
export const updateUserApi = (userId, data) => {
  return axios.put(`/users/${userId}`, data);
};

/**
 * Xóa (soft delete) người dùng
 */
export const deleteUserApi = (userId) => {
  return axios.delete(`/users/${userId}`);
};
