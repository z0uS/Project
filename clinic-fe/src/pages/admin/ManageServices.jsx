import React, { useEffect, useState } from "react";
import {
  getServicesApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi
} from "../../api/services";

const defaultForm = { name: "", description: "", price: "" };

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await getServicesApi();
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setForm(defaultForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (sv) => {
    setForm({
      name: sv.name || "",
      description: sv.description || "",
      price: sv.price || ""
    });
    setEditId(sv.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, price: parseFloat(form.price) || 0 };
      if (editId) {
        await updateServiceApi(editId, data);
      } else {
        await createServiceApi(data);
      }
      setShowModal(false);
      setForm(defaultForm);
      setEditId(null);
      fetchServices();
    } catch {
      alert((editId ? "Sửa" : "Thêm") + " dịch vụ thất bại!");
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteServiceApi(deleteId);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchServices();
    } catch {
      alert("Xóa dịch vụ thất bại!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 mt-8 border border-blue-100 animate-fadeIn">
      <h2 className="text-4xl font-black mb-8 text-blue-800 tracking-tight text-center drop-shadow-sm">
        Quản lý Dịch vụ
      </h2>
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow font-bold transition text-base"
          onClick={openCreateModal}
        >
          + Thêm dịch vụ mới
        </button>
        <span className="text-blue-800 font-bold">{services.length} dịch vụ</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">ID</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Tên dịch vụ</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Mô tả</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Giá</th>
              <th className="py-3 px-4 border-b font-bold text-blue-700 bg-blue-100 uppercase text-xs">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-7 text-center text-gray-400 text-lg">Chưa có dịch vụ nào.</td>
              </tr>
            ) : (
              services.map((sv) => (
                <tr key={sv.id} className="hover:bg-blue-100 transition rounded-xl">
                  <td className="py-3 px-4 font-mono text-blue-700">{sv.id}</td>
                  <td className="py-3 px-4 font-semibold">{sv.name}</td>
                  <td className="py-3 px-4">{sv.description}</td>
                  <td className="py-3 px-4 text-right">{Number(sv.price).toLocaleString("vi-VN")}₫</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      className="text-blue-700 hover:bg-blue-200 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => openEditModal(sv)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-600 hover:bg-red-100 font-bold px-4 py-1 rounded transition shadow-sm"
                      onClick={() => openDeleteModal(sv.id)}
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

      {/* Modal Thêm/Sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-3xl shadow-2xl min-w-[350px] w-full max-w-sm border border-blue-200">
            <h3 className="font-bold text-2xl mb-6 text-blue-700 text-center">
              {editId ? "Sửa dịch vụ" : "Thêm dịch vụ mới"}
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Tên dịch vụ"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <textarea
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Mô tả dịch vụ"
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                required
              />
              <input
                className="border w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Giá dịch vụ"
                type="number"
                min="0"
                step="1000"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
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
            <h3 className="font-bold text-lg mb-4">Xác nhận xóa dịch vụ</h3>
            <p>Bạn có chắc chắn muốn xóa dịch vụ này không?</p>
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

export default ManageServices;
