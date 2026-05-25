// src/pages/patient/MedicalRecords.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axiosClient";

const MedicalRecordsOfPatient = () => {
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await axios.get("/medical/patient/medical-records");
        setRecords(res.data);
      } catch (err) {
        setErrorMsg(
          err?.response?.data?.message ||
          "Không thể lấy hồ sơ bệnh án. Vui lòng đăng nhập lại hoặc thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchRecords();
  }, [user]);

  const handleExportPDF = async (recordId) => {
    try {
      const response = await axios.get(`/medical/export/${recordId}/pdf`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ho_so_benh_an_${recordId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Lỗi khi xuất file PDF. Vui lòng thử lại sau.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow p-6 backdrop-blur-sm border border-blue-200">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-800 drop-shadow">
          Hồ sơ bệnh án của tôi
        </h2>
        <div className="text-center text-lg font-semibold text-blue-700 mb-6">
          {user?.fullName ? (
            <>Bệnh nhân: <span className="font-bold">{user.fullName}</span></>
          ) : null}
        </div>
        {errorMsg && (
          <div className="mb-4 text-center text-base font-semibold text-red-600">{errorMsg}</div>
        )}
        {loading ? (
          <p className="text-gray-400 text-center">Đang tải dữ liệu...</p>
        ) : records.length === 0 ? (
          <p className="text-gray-600 text-center">Bạn chưa có hồ sơ bệnh án nào.</p>
        ) : (
          <ul className="space-y-6">
            {records.map((rec, idx) => (
              <li
                key={rec.appointment.id || idx}
                className="border-b pb-4"
              >
                <div className="flex items-center gap-4 mb-1">
                  <span className="font-semibold text-blue-900">
                    Ngày khám: {rec.appointment?.date ? new Date(rec.appointment.date).toLocaleDateString() : "--"}
                  </span>
                  <span className="text-xs text-blue-700">
                    Bác sĩ: {rec.appointment.doctor?.fullName || "--"}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Chẩn đoán:</span> {rec.record?.diagnosis || "--"}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Triệu chứng:</span> {rec.record?.symptoms || "--"}
                </p>
                <div className="text-gray-700 mb-1">
                  <span className="font-semibold">Đơn thuốc:</span>
                  {rec.prescription?.prescriptionItems?.length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {rec.prescription.prescriptionItems.map((item, idx2) => (
                        <li key={idx2}>
                          {item.medicineName} - {item.dosage} - {item.quantity} ({item.instruction})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span> Không có</span>
                  )}
                </div>
                {rec.record?.id && (
                  <div className="mt-2">
                    <button
                      onClick={() => handleExportPDF(rec.record.id)}
                      className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded shadow"
                    >
                      Xuất PDF
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MedicalRecordsOfPatient;
