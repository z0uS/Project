import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getNotificationsApi,
  createNotificationApi,
  updateNotificationApi,
  deleteNotificationApi
} from "../../api/notifications";

const defaultForm = { title: "", content: "", type: "general" };

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const location = useLocation();

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsApi();
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (location.state?.openModal) {
      openCreateModal();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const openCreateModal = () => {
    setForm(defaultForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (note) => {
    setForm({
      title: note.title || "",
      content: note.content || "",
      type: note.type || "general"
    });
    setEditId(note.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateNotificationApi(editId, form);
      } else {
        await createNotificationApi(form);
      }
      setShowModal(false);
      setForm(defaultForm);
      setEditId(null);
      fetchNotifications();
    } catch {
      alert((editId ? "Sửa" : "Thêm") + " thông báo thất bại!");
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteNotificationApi(deleteId);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchNotifications();
    } catch {
      alert("Xóa thông báo thất bại!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Thông báo</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={openCreateModal}
      >
        Thêm thông báo mới
      </button>
      {notifications.length === 0 ? (
        <p className="text-gray-600">Không có thông báo nào.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li key={note.id} className="border-b pb-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-gray-800">{note.title}</p>
                <p className="text-gray-600">{note.content}</p>
                <p className="text-gray-500 text-sm">
                  {note.type === "general" ? "Thông báo chung" : note.type}
                  {" | "}
                  {new Date(note.createdAt || note.sentAt).toLocaleString()}
                </p>
                {note.user && (
                  <p className="text-xs text-blue-700">Gửi tới: {note.user.fullName} ({note.user.email})</p>
                )}
              </div>
              <div className="space-x-2 mt-2 md:mt-0">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => openEditModal(note)}
                >
                  Sửa
                </button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => openDeleteModal(note.id)}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Thêm/Sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[350px]">
            <h3 className="font-bold text-lg mb-4">
              {editId ? "Sửa thông báo" : "Thêm thông báo"}
            </h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                className="border w-full px-3 py-2 rounded"
                placeholder="Tiêu đề"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              <textarea
                className="border w-full px-3 py-2 rounded"
                placeholder="Nội dung"
                rows={3}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                required
              />
              <select
                className="border w-full px-3 py-2 rounded"
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              >
                <option value="general">Thông báo chung</option>
                <option value="reminder">Nhắc lịch</option>
                <option value="canceled">Hủy lịch</option>
              </select>
              {/* Nếu muốn gửi cá nhân, bổ sung dropdown chọn user tại đây */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditId(null); }}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white"
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
            <h3 className="font-bold text-lg mb-4">Xác nhận xóa thông báo</h3>
            <p>Bạn có chắc chắn muốn xóa thông báo này không?</p>
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

export default Notifications;
