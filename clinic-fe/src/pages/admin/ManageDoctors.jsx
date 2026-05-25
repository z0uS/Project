import React, { useEffect, useState } from "react";
import {
  getDoctorsApi,
  createDoctorApi,
  updateDoctorApi,
  toggleDoctorStatusApi,
  deleteDoctorApi
} from "../../api/doctors";
import { getSpecialtiesApi } from "../../api/specialties";

const defaultForm = {
  fullName: "",
  email: "",
  password: "",
  specialtyId: "",
  degree: "",
  experience: ""
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  const fetchDoctors = async () => {
    const res = await getDoctorsApi();
    setDoctors(res.data);
  };
  const fetchSpecialties = async () => {
    const res = await getSpecialtiesApi();
    setSpecialties(res.data);
  };

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  const openCreateModal = () => {
    setForm(defaultForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (doc) => {
    setForm({
      fullName: doc.fullName || "",
      email: doc.email || "",
      password: "",
      specialtyId: doc.specialtyId || "",
      degree: doc.degree || "",
      experience: doc.experience || "",
    });
    setEditId(doc.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoctorApi(editId, form);
      } else {
        await createDoctorApi(form);
      }
      setShowModal(false);
      setForm(defaultForm);
      setEditId(null);
      fetchDoctors();
    } catch {
      alert((editId ? "Sửa" : "Tạo") + " bác sĩ thất bại!");
    }
  };

  const handleToggleStatus = async (id) => {
    await toggleDoctorStatusApi(id);
    fetchDoctors();
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn bác sĩ này không?")) {
      try {
        await deleteDoctorApi(id);
        fetchDoctors();
      } catch (err) {
        alert("Xóa bác sĩ thất bại!");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 mt-8 border border-blue-100 animate-fadeIn">
      <h2 className="text-4xl font-black mb-8 text-blue-800 tracking-tight text-center drop-shadow-sm">
        Quản lý Bác sĩ
      </h2>
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow font-bold transition text-base"
          onClick={openCreateModal}
        >
          + Thêm bác sĩ mới
        </button>
        <span className="text-blue-800 font-bold">{doctors.length} bác sĩ</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">ID</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Họ tên</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Email</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Chuyên khoa</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Bằng cấp</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Kinh nghiệm</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Trạng thái</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-7 text-center text-gray-400 text-lg">Chưa có bác sĩ nào.</td>
              </tr>
            ) : (
              doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-blue-100 transition rounded-xl">
                  <td className="py-3 px-4 font-mono text-blue-700">{doc.id}</td>
                  <td className="py-3 px-4 font-semibold">{doc.fullName}</td>
                  <td className="py-3 px-4">{doc.email}</td>
                  <td className="py-3 px-4">{doc.specialtyName}</td>
                  <td className="py-3 px-4">{doc.degree}</td>
                  <td className="py-3 px-4">{doc.experience}</td>
                  <td className="py-3 px-4">
                    <span
                      className={
                        doc.isActive
                          ? "inline-block px-4 py-1 text-xs rounded-full bg-green-100 text-green-800 font-bold border border-green-300 shadow"
                          : "inline-block px-4 py-1 text-xs rounded-full bg-gray-200 text-gray-600 font-bold border border-gray-300 shadow"
                      }
                    >
                      {doc.isActive ? "Hoạt động" : "Đã khóa"}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      className="text-blue-700 hover:bg-blue-200 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => openEditModal(doc)}
                    >
                      Sửa
                    </button>
                    <button
                      className={
                        doc.isActive
                          ? "text-orange-600 hover:bg-orange-100 font-bold px-4 py-1 rounded transition shadow-sm"
                          : "text-green-600 hover:bg-green-100 font-bold px-4 py-1 rounded transition shadow-sm"
                      }
                      onClick={() => handleToggleStatus(doc.id)}
                    >
                      {doc.isActive ? "Vô hiệu hóa" : "Kích hoạt lại"}
                    </button>
                    <button
                      className="text-red-600 hover:bg-red-100 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => handleDeleteDoctor(doc.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-10 rounded-3xl shadow-2xl min-w-[350px] w-full max-w-sm border border-blue-200">
            <h3 className="font-bold text-2xl mb-6 text-blue-700 text-center">
              {editId ? "Sửa thông tin bác sĩ" : "Thêm bác sĩ mới"}
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Họ tên"
                value={form.fullName}
                onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                required
              />
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                disabled={!!editId}
              />
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder={editId ? "Để trống nếu không đổi" : "Mật khẩu"}
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required={!editId}
              />
              <select
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                value={form.specialtyId}
                onChange={e => setForm(f => ({ ...f, specialtyId: e.target.value }))}
                required
              >
                <option value="">Chọn chuyên khoa</option>
                {specialties.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Bằng cấp"
                value={form.degree}
                onChange={e => setForm(f => ({ ...f, degree: e.target.value }))}
                required
              />
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Kinh nghiệm"
                value={form.experience}
                onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                required
              />
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditId(null); }}
                  className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold shadow"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
