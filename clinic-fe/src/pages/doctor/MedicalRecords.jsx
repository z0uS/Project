import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import { FaEye, FaHistory, FaPlus, FaEdit } from "react-icons/fa";

const statusVN = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  done: "Hoàn thành",
  cancelled: "Đã hủy"
};

const defaultMedicine = { medicineName: "", dosage: "", quantity: 1, instruction: "" };

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal chi tiết
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // Modal log chỉnh sửa
  const [logModal, setLogModal] = useState({ open: false, logs: [], loading: false, error: "" });

  // Modal tạo đơn thuốc
  const [presModal, setPresModal] = useState({ open: false, record: null });
  const [presNote, setPresNote] = useState("");
  const [presItems, setPresItems] = useState([{ ...defaultMedicine }]);
  const [presError, setPresError] = useState("");
  const [presLoading, setPresLoading] = useState(false);

  // Modal sửa bệnh án & đơn thuốc
  const [editModal, setEditModal] = useState({ open: false, record: null, detail: null });
  const [editFields, setEditFields] = useState({ symptoms: "", diagnosis: "", notes: "" });
  const [editItems, setEditItems] = useState([]);
  const [editPresNote, setEditPresNote] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/medical/doctor/records`);
      setRecords(res.data);
    } catch (err) {
      setError("Lỗi tải bệnh án!");
    } finally {
      setLoading(false);
    }
  };

  // Xem chi tiết bệnh án
  const handleViewDetail = async (record) => {
    try {
      setLoading(true);
      const res = await axios.get(`/medical/info/${record.appointmentId}`);
      setSelectedRecord({ ...record, detail: res.data });
      setShowDetail(true);
    } catch (err) {
      alert("Lỗi tải chi tiết!");
    } finally {
      setLoading(false);
    }
  };

  // Xem lịch sử chỉnh sửa
  const handleViewLog = async (record) => {
    setLogModal({ open: true, logs: [], loading: true, error: "" });
    try {
      const res = await axios.get(`/medical/logs/${record.id}`);
      setLogModal({ open: true, logs: res.data, loading: false, error: "" });
    } catch {
      setLogModal({ open: true, logs: [], loading: false, error: "Lỗi tải lịch sử chỉnh sửa" });
    }
  };

  // Tạo đơn thuốc
  const openPrescriptionModal = (record) => {
    setPresModal({ open: true, record });
    setPresNote("");
    setPresItems([{ ...defaultMedicine }]);
    setPresError("");
  };
  const handleChangeItem = (idx, field, value) => {
    const newItems = [...presItems];
    newItems[idx][field] = value;
    setPresItems(newItems);
  };
  const handleAddItem = () => {
    setPresItems([...presItems, { ...defaultMedicine }]);
  };
  const handleRemoveItem = (idx) => {
    if (presItems.length === 1) return;
    setPresItems(presItems.filter((_, i) => i !== idx));
  };
  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    setPresLoading(true);
    setPresError("");
    const { appointmentId } = presModal.record;
    try {
      await axios.post("/medical/prescription", {
        appointmentId,
        notes: presNote,
        items: presItems
      });
      setPresModal({ open: false, record: null });
      fetchRecords();
    } catch (err) {
      setPresError(err?.response?.data?.message || "Lỗi tạo đơn thuốc!");
    } finally {
      setPresLoading(false);
    }
  };

  // Sửa bệnh án + đơn thuốc
  const openEditModal = async (record) => {
    setEditLoading(true);
    setEditError("");
    try {
      // Lấy chi tiết record & đơn thuốc
      const res = await axios.get(`/medical/info/${record.appointmentId}`);
      setEditModal({ open: true, record, detail: res.data });
      setEditFields({
        symptoms: res.data.record?.symptoms || "",
        diagnosis: res.data.record?.diagnosis || "",
        notes: res.data.record?.notes || "",
      });
      setEditPresNote(res.data.prescription?.notes || "");
      setEditItems(
        (res.data.prescription?.prescriptionItems || []).map(
          (item) => ({
            medicineName: item.medicineName,
            dosage: item.dosage,
            quantity: item.quantity,
            instruction: item.instruction,
            id: item.id,
          })
        )
      );
    } catch {
      setEditError("Lỗi tải chi tiết bệnh án!");
    }
    setEditLoading(false);
  };
  const handleEditItem = (idx, field, value) => {
    const items = [...editItems];
    items[idx][field] = value;
    setEditItems(items);
  };
  const handleEditAddItem = () => {
    setEditItems([...editItems, { ...defaultMedicine }]);
  };
  const handleEditRemoveItem = (idx) => {
    if (editItems.length === 1) return;
    setEditItems(editItems.filter((_, i) => i !== idx));
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      // Gửi cập nhật bệnh án
      await axios.post("/medical/record", {
        appointmentId: editModal.record.appointmentId,
        symptoms: editFields.symptoms,
        diagnosis: editFields.diagnosis,
        notes: editFields.notes,
      });
      // Nếu có đơn thuốc thì gửi cập nhật đơn thuốc
      if (editModal.detail?.prescription) {
        await axios.put(`/medical/prescription/${editModal.detail.prescription.id}`, {
          notes: editPresNote,
          items: editItems,
        });
      }
      setEditModal({ open: false, record: null, detail: null });
      fetchRecords();
    } catch (err) {
      setEditError(err?.response?.data?.message || "Lỗi cập nhật!");
    }
    setEditLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 min-h-[300px]">
      <h2 className="text-2xl font-bold mb-4">Lịch sử bệnh án đã tạo</h2>
      {loading ? (
        <div className="text-center pt-32">Đang tải...</div>
      ) : error ? (
        <div className="text-center pt-32 text-red-600">{error}</div>
      ) : (
        <>
          {records.length === 0 ? (
            <p className="text-gray-600">Không có bệnh án nào.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3">Bệnh nhân</th>
                  <th className="py-2 px-3">Ngày</th>
                  <th className="py-2 px-3">Ca</th>
                  <th className="py-2 px-3">Trạng thái</th>
                  <th className="py-2 px-3">Chẩn đoán</th>
                  <th className="py-2 px-3">Đơn thuốc</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => {
                  const appt = record.appointment || {};
                  return (
                    <tr key={record.id} className="border-b">
                      <td className="py-2 px-3">{appt.patient?.fullName || appt.patient?.email || "Không rõ"}</td>
                      <td className="py-2 px-3">{appt.date ? new Date(appt.date).toLocaleDateString() : "--"}</td>
                      <td className="py-2 px-3">{appt.shift?.name || "--"}</td>
                      <td className="py-2 px-3">{statusVN[appt.status] || appt.status}</td>
                      <td className="py-2 px-3">{record.diagnosis || <span className="text-gray-400">Chưa nhập</span>}</td>
                      <td className="py-2 px-3">
                        {record.prescription ? "Đã có" : (
                          <button
                            className="px-2 py-1 rounded bg-green-500 text-white text-xs hover:bg-green-700 flex items-center gap-1"
                            onClick={() => openPrescriptionModal(record)}
                          >
                            <FaPlus /> Tạo đơn
                          </button>
                        )}
                      </td>
                      <td className="py-2 px-3 flex gap-2">
                        <button
                          onClick={() => handleViewDetail(record)}
                          className="px-2 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-700 flex items-center gap-1"
                        >
                          <FaEye /> Xem
                        </button>
                        <button
                          onClick={() => handleViewLog(record)}
                          className="px-2 py-1 rounded bg-gray-500 text-white text-xs hover:bg-gray-700 flex items-center gap-1"
                        >
                          <FaHistory /> Lịch sử sửa
                        </button>
                        <button
                          onClick={() => openEditModal(record)}
                          className="px-2 py-1 rounded bg-yellow-500 text-white text-xs hover:bg-yellow-700 flex items-center gap-1"
                        >
                          <FaEdit /> Sửa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Modal tạo đơn thuốc */}
      {presModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white rounded-xl w-[480px] p-6 relative shadow-xl"
            onSubmit={handleSubmitPrescription}
          >
            <button
              type="button"
              onClick={() => setPresModal({ open: false, record: null })}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2">Tạo đơn thuốc</h3>
            <div className="mb-3">
              <label className="font-semibold">Lời dặn thêm</label>
              <textarea
                className="w-full border rounded px-2 py-1 mt-1"
                value={presNote}
                onChange={e => setPresNote(e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <label className="font-semibold mb-1 block">Thuốc kê</label>
              {presItems.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    className="border rounded px-2 py-1 w-32"
                    placeholder="Tên thuốc"
                    value={item.medicineName}
                    required
                    onChange={e => handleChangeItem(idx, "medicineName", e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1 w-24"
                    placeholder="Liều dùng"
                    value={item.dosage}
                    required
                    onChange={e => handleChangeItem(idx, "dosage", e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1 w-16"
                    type="number"
                    min={1}
                    placeholder="Số lượng"
                    value={item.quantity}
                    required
                    onChange={e => handleChangeItem(idx, "quantity", e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1 w-28"
                    placeholder="Cách dùng"
                    value={item.instruction}
                    onChange={e => handleChangeItem(idx, "instruction", e.target.value)}
                  />
                  <button
                    type="button"
                    className="text-red-500 font-bold"
                    onClick={() => handleRemoveItem(idx)}
                    disabled={presItems.length === 1}
                  >×</button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 underline text-sm mt-1"
                onClick={handleAddItem}
              >
                + Thêm thuốc
              </button>
            </div>
            {presError && <div className="text-red-500 text-sm mt-2">{presError}</div>}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={presLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
              >
                {presLoading ? "Đang lưu..." : "Tạo đơn thuốc"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {showDetail && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[500px] p-6 relative shadow-xl">
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-2">Chi tiết bệnh án</h3>
            <div className="mb-2">
              <span className="font-semibold">Bệnh nhân:</span> {selectedRecord.appointment.patient?.fullName}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Ngày khám:</span> {selectedRecord.appointment.date}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Ca:</span> {selectedRecord.appointment.shift?.name}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Triệu chứng:</span> {selectedRecord.detail?.record?.symptoms || "--"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Chẩn đoán:</span> {selectedRecord.detail?.record?.diagnosis || "--"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Ghi chú:</span> {selectedRecord.detail?.record?.notes || "--"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Đơn thuốc:</span>
              {selectedRecord.detail?.prescription ? (
                <ul className="list-disc ml-5">
                  {(selectedRecord.detail.prescription.prescriptionItems || []).map((item, idx) => (
                    <li key={idx}>
                      {item.medicineName} - {item.dosage} - {item.quantity} ({item.instruction})
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-400 ml-2">Chưa có</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal xem log chỉnh sửa */}
      {logModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[400px] p-5 relative shadow-xl">
            <button
              onClick={() => setLogModal({ ...logModal, open: false })}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-3">Lịch sử chỉnh sửa</h3>
            {logModal.loading ? (
              <div>Đang tải...</div>
            ) : logModal.error ? (
              <div className="text-red-500">{logModal.error}</div>
            ) : logModal.logs.length === 0 ? (
              <div>Chưa có lịch sử chỉnh sửa.</div>
            ) : (
              <ul className="max-h-[200px] overflow-y-auto">
                {logModal.logs.map((log, idx) => (
                  <li key={idx} className="mb-2 text-sm">
                    <div className="font-semibold">{log.editor?.fullName || "Người sửa"}</div>
                    <div>{log.content}</div>
                    <div className="text-gray-400">{new Date(log.editedAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa bệnh án & đơn thuốc */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white rounded-xl w-[540px] p-6 relative shadow-xl"
            onSubmit={handleSubmitEdit}
          >
            <button
              type="button"
              onClick={() => setEditModal({ open: false, record: null, detail: null })}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2">Chỉnh sửa bệnh án & đơn thuốc</h3>
            <div className="mb-2">
              <label className="block font-semibold">Triệu chứng</label>
              <textarea
                className="w-full border rounded px-2 py-1"
                value={editFields.symptoms}
                onChange={e => setEditFields({ ...editFields, symptoms: e.target.value })}
                rows={2}
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Chẩn đoán</label>
              <textarea
                className="w-full border rounded px-2 py-1"
                value={editFields.diagnosis}
                onChange={e => setEditFields({ ...editFields, diagnosis: e.target.value })}
                rows={2}
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Ghi chú</label>
              <textarea
                className="w-full border rounded px-2 py-1"
                value={editFields.notes}
                onChange={e => setEditFields({ ...editFields, notes: e.target.value })}
                rows={2}
              />
            </div>
            {/* Nếu có đơn thuốc */}
            {editModal.detail?.prescription && (
              <>
                <div className="mb-2">
                  <label className="font-semibold">Lời dặn thêm</label>
                  <textarea
                    className="w-full border rounded px-2 py-1 mt-1"
                    value={editPresNote}
                    onChange={e => setEditPresNote(e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="font-semibold mb-1 block">Thuốc kê</label>
                  {editItems.map((item, idx) => (
                    <div key={item.id || idx} className="flex gap-2 mb-2">
                      <input
                        className="border rounded px-2 py-1 w-32"
                        placeholder="Tên thuốc"
                        value={item.medicineName}
                        required
                        onChange={e => handleEditItem(idx, "medicineName", e.target.value)}
                      />
                      <input
                        className="border rounded px-2 py-1 w-24"
                        placeholder="Liều dùng"
                        value={item.dosage}
                        required
                        onChange={e => handleEditItem(idx, "dosage", e.target.value)}
                      />
                      <input
                        className="border rounded px-2 py-1 w-16"
                        type="number"
                        min={1}
                        placeholder="Số lượng"
                        value={item.quantity}
                        required
                        onChange={e => handleEditItem(idx, "quantity", e.target.value)}
                      />
                      <input
                        className="border rounded px-2 py-1 w-28"
                        placeholder="Cách dùng"
                        value={item.instruction}
                        onChange={e => handleEditItem(idx, "instruction", e.target.value)}
                      />
                      <button
                        type="button"
                        className="text-red-500 font-bold"
                        onClick={() => handleEditRemoveItem(idx)}
                        disabled={editItems.length === 1}
                      >×</button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-600 underline text-sm mt-1"
                    onClick={handleEditAddItem}
                  >
                    + Thêm thuốc
                  </button>
                </div>
              </>
            )}
            {editError && <div className="text-red-500 text-sm mt-2">{editError}</div>}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={editLoading}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded font-semibold"
              >
                {editLoading ? "Đang lưu..." : "Cập nhật"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
