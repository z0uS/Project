import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axiosClient";

const defaultForm = {
  doctorId: "",
  date: "",
  shiftId: "",
  maxPatients: 5,
};

const ManageSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    fetchSchedules();
    fetchDoctors();
    fetchShifts();
  }, []);

  useEffect(() => {
    if (location.state?.openModal) {
      openAddModal();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchSchedules = async () => {
    const res = await axios.get("/schedules");
    setSchedules(res.data);
  };

  const fetchDoctors = async () => {
    const res = await axios.get("/doctors");
    setDoctors(res.data);
  };

  const fetchShifts = async () => {
    const res = await axios.get("/shifts");
    setShifts(res.data);
  };

  const openAddModal = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (schedule) => {
    setForm({
      doctorId: schedule.doctorId,
      date: schedule.date,
      shiftId: schedule.shiftId,
      maxPatients: schedule.maxPatients,
    });
    setEditingId(schedule.id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/schedules/${editingId}`, form);
        setMessage("Sửa lịch thành công");
      } else {
        await axios.post("/schedules", form);
        setMessage("Thêm lịch thành công");
      }
      setShowModal(false);
      fetchSchedules();
    } catch (err) {
      setMessage(err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa lịch?")) return;
    await axios.delete(`/schedules/${id}`);
    fetchSchedules();
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Quản lý lịch làm việc bác sĩ</h2>
      <button
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={openAddModal}
      >
        Thêm lịch mới
      </button>
      {message && <div className="mb-4 text-green-600">{message}</div>}

      <div className="overflow-x-auto rounded-xl shadow mb-8">
        <table className="min-w-full bg-white rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Bác sĩ</th>
              <th className="py-2 px-4">Ngày</th>
              <th className="py-2 px-4">Ca</th>
              <th className="py-2 px-4">Số slot</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((sch, i) => (
              <tr
                key={sch.id}
                className="border-b hover:bg-blue-50 text-center transition-all"
              >
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4 font-medium">{sch.doctorName}</td>
                <td className="py-2 px-4">{sch.date}</td>
                <td className="py-2 px-4 text-blue-600 font-semibold">
                  {sch.shiftName}
                </td>
                <td className="py-2 px-4">{sch.maxPatients}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-blue-500 hover:underline mr-3"
                    onClick={() => openEditModal(sch)}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(sch.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {schedules.length === 0 && (
              <tr>
                <td colSpan={6} className="py-5 text-center text-gray-500">
                  Chưa có lịch làm việc nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg min-w-[350px]">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Sửa lịch làm việc" : "Thêm lịch làm việc"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label>Bác sĩ</label>
                <select
                  className="border w-full px-3 py-2 rounded"
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn bác sĩ</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Ngày</label>
                <input
                  type="date"
                  className="border w-full px-3 py-2 rounded"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Ca khám</label>
                <select
                  className="border w-full px-3 py-2 rounded"
                  name="shiftId"
                  value={form.shiftId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn ca khám</option>
                  {shifts.map((shift) => (
                    <option key={shift.id} value={shift.id}>
                      {shift.name} ({shift.startTime} - {shift.endTime})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Số slot tối đa</label>
                <input
                  type="number"
                  min={1}
                  className="border w-full px-3 py-2 rounded"
                  name="maxPatients"
                  value={form.maxPatients}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingId ? "Lưu" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchedules;
