import React, { useEffect, useState } from "react";
import {
  getSpecialtiesApi,
  createSpecialtyApi,
  updateSpecialtyApi,
  deleteSpecialtyApi
} from "../../api/specialties";

// Mặc định form
const defaultForm = {
  name: "",
  description: ""
};

const ManageSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchSpecialties = async () => {
    try {
      const res = await getSpecialtiesApi();
      // Nếu backend chưa trả về doctorCount, bạn sẽ cần sửa backend sau
      setSpecialties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  // Thêm mới
  const openCreateModal = () => {
    setForm(defaultForm);
    setEditId(null);
    setShowModal(true);
  };

  // Sửa
  const openEditModal = (sp) => {
    setForm({
      name: sp.name || "",
      description: sp.description || ""
    });
    setEditId(sp.id);
    setShowModal(true);
  };

  // Submit thêm/sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateSpecialtyApi(editId, form);
      } else {
        await createSpecialtyApi(form);
      }
      setShowModal(false);
      setEditId(null);
      setForm(defaultForm);
      fetchSpecialties();
    } catch {
      alert((editId ? "Sửa" : "Thêm") + " chuyên khoa thất bại!");
    }
  };

  // Xóa
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSpecialtyApi(deleteId);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchSpecialties();
    } catch {
      alert("Xóa chuyên khoa thất bại!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 mt-8 border border-blue-100 animate-fadeIn">
      <h2 className="text-4xl font-black mb-8 text-blue-800 tracking-tight text-center drop-shadow-sm">
        Quản lý Chuyên khoa
      </h2>
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow font-bold transition text-base"
          onClick={openCreateModal}
        >
          + Thêm chuyên khoa
        </button>
        <span className="text-blue-800 font-bold">{specialties.length} chuyên khoa</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">ID</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Tên chuyên khoa</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Mô tả</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Số bác sĩ</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {specialties.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-7 text-center text-gray-400 text-lg">Chưa có chuyên khoa nào.</td>
              </tr>
            ) : (
              specialties.map((sp) => (
                <tr key={sp.id} className="hover:bg-blue-100 transition rounded-xl">
                  <td className="py-3 px-4 font-mono text-blue-700">{sp.id}</td>
                  <td className="py-3 px-4 font-semibold">{sp.name}</td>
                  <td className="py-3 px-4">{sp.description}</td>
                  <td className="py-3 px-4 text-center">{sp.doctorCount ?? 0}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      className="text-blue-700 hover:bg-blue-200 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => openEditModal(sp)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-600 hover:bg-red-100 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => openDeleteModal(sp.id)}
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
      {/* Modal thêm/sửa chuyên khoa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-10 rounded-3xl shadow-2xl min-w-[350px] w-full max-w-sm border border-blue-200">
            <h3 className="font-bold text-2xl mb-6 text-blue-700 text-center">
              {editId ? "Sửa chuyên khoa" : "Thêm chuyên khoa mới"}
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Tên chuyên khoa"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <textarea
                rows={3}
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Mô tả"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
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
      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[350px]">
            <h3 className="font-bold text-lg mb-4">Xác nhận xóa chuyên khoa</h3>
            <p>Bạn có chắc chắn muốn xóa chuyên khoa này không?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={handleConfirmDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSpecialties;
