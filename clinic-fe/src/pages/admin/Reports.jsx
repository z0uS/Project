import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/admin/reports");
        setReports(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Báo cáo & Thống kê</h2>
      {reports.length === 0 ? (
        <p className="text-gray-600">Chưa có dữ liệu thống kê.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((rep) => (
            <li key={rep.id} className="border-b pb-4">
              <p className="font-semibold text-gray-800">{rep.title}</p>
              <p className="text-gray-700 text-xl">{rep.value}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reports;
