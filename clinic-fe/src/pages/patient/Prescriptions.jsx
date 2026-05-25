import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axiosClient";

const Prescriptions = () => {
  const { user } = useContext(AuthContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await axios.get("/medical/patient/prescriptions");
        setPrescriptions(res.data);
      } catch (err) {
        setErrorMsg(
          err?.response?.data?.message || "Không thể lấy đơn thuốc. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchPrescriptions();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Đơn thuốc của tôi</h2>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {loading ? (
        <p className="text-gray-400">Đang tải dữ liệu...</p>
      ) : prescriptions.length === 0 ? (
        <p className="text-gray-600">Bạn chưa có đơn thuốc nào.</p>
      ) : (
        <ul className="space-y-6">
          {prescriptions.map((presc, idx) => (
            <li key={presc.id || idx} className="border-b pb-4">
              <p className="font-semibold text-gray-800">
                Ngày: {presc.date ? new Date(presc.date).toLocaleDateString() : "--"}
                {presc.doctorName && (
                  <span className="ml-2 text-blue-700 text-sm">Bác sĩ: {presc.doctorName}</span>
                )}
              </p>
              <div className="text-gray-700 mb-1">
                <span className="font-semibold">Lời dặn:</span> {presc.notes || "--"}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Thuốc:</span>
                {presc.items?.length > 0 ? (
                  <ul className="ml-4 list-disc">
                    {presc.items.map((item, idx2) => (
                      <li key={idx2}>
                        {item.medicineName} - {item.dosage} - {item.quantity} ({item.instruction})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> Không có</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Prescriptions;
