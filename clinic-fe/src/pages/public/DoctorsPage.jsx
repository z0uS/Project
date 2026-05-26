import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import { FaUserMd, FaStethoscope } from "react-icons/fa";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/doctors")
      .then(res => setDoctors(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = doctors.filter(d =>
    d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3">Danh sách bác sĩ</h1>
          <p className="text-gray-600 text-lg">Đội ngũ bác sĩ chuyên nghiệp, giàu kinh nghiệm tại Phòng Khám ĐS</p>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc chuyên khoa..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-full border border-blue-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">Không tìm thấy bác sĩ nào</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(doc => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-blue-50 p-6 flex flex-col items-center text-center group hover:-translate-y-1 duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform">
                  <FaUserMd className="text-white text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{doc.fullName}</h3>
                {doc.specialty?.name && (
                  <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                    <FaStethoscope className="text-xs" />
                    <span>{doc.specialty.name}</span>
                  </div>
                )}
                {doc.experience && (
                  <p className="text-gray-500 text-sm mt-2">{doc.experience} năm kinh nghiệm</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
