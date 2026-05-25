import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axiosClient";

const MySchedule = () => {
  const { user } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (!user) return;
    // Bước 1: Lấy hồ sơ Doctor (chứa doctor.id) dựa vào user hiện tại
    axios.get("/doctors/me").then(res => setDoctor(res.data));
  }, [user]);

  useEffect(() => {
    if (!doctor) return;
    // Bước 2: Lấy lịch theo doctor.id
    axios.get(`/schedules/doctor/${doctor.id}`).then(res => setSchedules(res.data));
  }, [doctor]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Lịch làm việc của tôi</h2>
      <div className="overflow-x-auto rounded-xl shadow mb-8">
        <table className="min-w-full bg-white rounded-xl text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Ngày</th>
              <th className="py-2 px-4">Ca</th>
              <th className="py-2 px-4">Số slot tối đa</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((sch) => (
              <tr key={sch.id} className="hover:bg-blue-50 transition-all">
                <td className="py-2 px-4">{new Date(sch.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 text-blue-600 font-semibold">{sch.shiftName}</td>
                <td className="py-2 px-4">{sch.maxPatients}</td>
              </tr>
            ))}
            {schedules.length === 0 && (
              <tr>
                <td colSpan={3} className="py-5 text-center text-gray-500">
                  Không có lịch làm việc nào!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySchedule;
