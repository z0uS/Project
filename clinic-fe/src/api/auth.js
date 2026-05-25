// src/api/auth.js
import axios from "./axiosClient";

/**
 * Gọi API đăng nhập.
 * @param {string} email
 * @param {string} password
 * @returns {Promise} chứa dữ liệu { accessToken }
 */
export const loginApi = (email, password) => {
  return axios.post("/auth/login", { email, password });
};

/**
 * Gọi API đăng ký.
 * @param {object} userData - { fullName, email, password }
 * @returns {Promise}
 */
export const registerApi = (userData) => {
  return axios.post("/auth/register", userData);
};

/**
 * (Nếu có) Gọi API quên mật khẩu.
 * @param {string} email
 * @returns {Promise}
 */
export const forgotPasswordApi = (email) => {
  return axios.post("/auth/forgot-password", { email });
};

/**
 * (Nếu có) Gọi API reset mật khẩu.
 * @param {string} token
 * @param {string} newPassword
 * @returns {Promise}
 */
export const resetPasswordApi = (token, newPassword) => {
  return axios.post("/auth/reset-password", { token, newPassword });
};
