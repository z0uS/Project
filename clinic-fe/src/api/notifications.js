import axios from "./axiosClient";
export const getNotificationsApi = () => axios.get("/notifications");
export const createNotificationApi = (data) => axios.post("/notifications", data);
export const updateNotificationApi = (id, data) => axios.put(`/notifications/${id}`, data);
export const deleteNotificationApi = (id) => axios.delete(`/notifications/${id}`);
export const markNotificationReadApi = (id) => axios.put(`/notifications/${id}/mark-read`);
