import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getPatientsApi,
  createPatientApi,
  togglePatientStatusApi,
  updatePatientApi,
  deletePatientApi
} from "../../api/patients";

// Định dạng ngày
const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : "";

const defaultForm = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: ""
};

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const location = useLocation();

  const fetchPatients = async () => {
    try {
      const res = await getPatientsApi();
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (location.state?.openModal) {
      openCreateModal();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Mở modal thêm mới
  const openCreateModal = () => {
    setForm(defaultForm);
    setEditId(null);
    setShowModal(true);
  };

  // Mở modal sửa
  const openEditModal = (pat) => {
    setForm({
      fullName: pat.fullName || "",
      email: pat.email || "",
      phone: pat.phone || "",
      dateOfBirth: pat.dateOfBirth ? pat.dateOfBirth.substring(0,10) : "",
      address: pat.address || ""
    });
    setEditId(pat.id);
    setShowModal(true);
  };

  // Submit thêm/sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePatientApi(editId, form);
      } else {
        await createPatientApi(form);
      }
      setShowModal(false);
      setEditId(null);
      setForm(defaultForm);
      fetchPatients();
    } catch {
      alert((editId ? "Sửa" : "Thêm") + " bệnh nhân thất bại!");
    }
  };

  // Đổi trạng thái
  const handleToggleStatus = async (id) => {
    try {
      await togglePatientStatusApi(id);
      fetchPatients();
    } catch {
      alert("Thao tác thất bại!");
    }
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn bệnh nhân này cùng mọi hồ sơ liên quan không?")) {
      try {
        await deletePatientApi(id);
        fetchPatients();
      } catch (err) {
        alert("Xóa bệnh nhân thất bại!");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 mt-8 border border-blue-100 animate-fadeIn">
      <h2 className="text-4xl font-black mb-8 text-blue-800 tracking-tight text-center drop-shadow-sm">
        Quản lý Bệnh nhân
      </h2>
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow font-bold transition text-base"
          onClick={openCreateModal}
        >
          + Thêm bệnh nhân mới
        </button>
        <span className="text-blue-800 font-bold">{patients.length} bệnh nhân</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">ID</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Họ tên</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Email</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">SĐT</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Ngày sinh</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Địa chỉ</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Trạng thái</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-7 text-center text-gray-400 text-lg">Chưa có bệnh nhân nào.</td>
              </tr>
            ) : (
              patients.map((pat) => (
                <tr key={pat.id} className="hover:bg-blue-100 transition rounded-xl">
                  <td className="py-3 px-4 font-mono text-blue-700">{pat.id}</td>
                  <td className="py-3 px-4 font-semibold">{pat.fullName}</td>
                  <td className="py-3 px-4">{pat.email}</td>
                  <td className="py-3 px-4">{pat.phone}</td>
                  <td className="py-3 px-4">{formatDate(pat.dateOfBirth)}</td>
                  <td className="py-3 px-4">{pat.address}</td>
                  <td className="py-3 px-4">
                    <span
                      className={
                        pat.isActive
                          ? "inline-block px-4 py-1 text-xs rounded-full bg-green-100 text-green-800 font-bold border border-green-300 shadow"
                          : "inline-block px-4 py-1 text-xs rounded-full bg-gray-200 text-gray-600 font-bold border border-gray-300 shadow"
                      }
                    >
                      {pat.isActive ? "Hoạt động" : "Đã khóa"}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      className="text-blue-700 hover:bg-blue-200 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => openEditModal(pat)}
                    >
                      Sửa
                    </button>
                    <button
                      className={
                        pat.isActive
                          ? "text-orange-600 hover:bg-orange-100 font-bold px-4 py-1 rounded transition shadow-sm"
                          : "text-green-600 hover:bg-green-100 font-bold px-4 py-1 rounded transition shadow-sm"
                      }
                      onClick={() => handleToggleStatus(pat.id)}
                    >
                      {pat.isActive ? "Vô hiệu hóa" : "Kích hoạt lại"}
                    </button>
                    <button
                      className="text-red-600 hover:bg-red-100 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => handleDeletePatient(pat.id)}
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
      {/* Modal thêm/sửa bệnh nhân */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-10 rounded-3xl shadow-2xl min-w-[350px] w-full max-w-sm border border-blue-200">
            <h3 className="font-bold text-2xl mb-6 text-blue-700 text-center">
              {editId ? "Sửa thông tin bệnh nhân" : "Thêm bệnh nhân mới"}
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
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                required
              />
              <input
                type="date"
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Ngày sinh"
                value={form.dateOfBirth}
                onChange={e => setForm(f => ({ ...f, dateOfBirth: e.target.value }))}
                required
              />
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
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

export default ManagePatients;
