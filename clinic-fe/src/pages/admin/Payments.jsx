import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentsAdmin = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("/api/payments/all");
        setPayments(res.data);
      } catch (error) {
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Quản lý hóa đơn</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : payments.length === 0 ? (
        <div>Không có hóa đơn nào.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2">Mã thanh toán</th>
                <th className="px-4 py-2">Lịch khám</th>
                <th className="px-4 py-2">Bệnh nhân</th>
                <th className="px-4 py-2">Ngày tạo</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Biên lai</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.appointmentId}</td>
                  <td className="px-4 py-2">{item.patientId}</td>
                  <td className="px-4 py-2">
                    {new Date(item.createdAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-4 py-2">
                    {item.status === "pending"
                      ? "Chờ duyệt"
                      : item.status === "success"
                      ? "Đã duyệt"
                      : "Từ chối"}
                  </td>
                  <td className="px-4 py-2">
                    {item.bankReceiptImage ? (
                      <a
                        href={item.bankReceiptImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Xem ảnh
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentsAdmin;
