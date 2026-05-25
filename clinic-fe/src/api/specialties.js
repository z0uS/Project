// src/api/specialties.js
import axios from "./axiosClient";
export const getSpecialtiesApi = () => axios.get("/specialties");
export const createSpecialtyApi = (data) => axios.post("/specialties", data);
export const updateSpecialtyApi = (id, data) => axios.put(`/specialties/${id}`, data);
export const deleteSpecialtyApi = (id) => axios.delete(`/specialties/${id}`);
