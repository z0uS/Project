import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import { FaDna, FaSearch } from "react-icons/fa";

const SpecialtiesPage = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/specialties")
      .then(res => setSpecialties(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = specialties.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  const gradients = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-green-400 to-green-600",
    "from-pink-400 to-pink-600",
    "from-orange-400 to-orange-600",
    "from-teal-400 to-teal-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3">Danh sách chuyên khoa</h1>
          <p className="text-gray-600 text-lg">Các chuyên khoa hàng đầu với đội ngũ bác sĩ chuyên môn cao</p>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Tìm kiếm chuyên khoa..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-3 rounded-full border border-blue-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">Không tìm thấy chuyên khoa nào</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((sp, idx) => (
              <div
                key={sp.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-blue-50 overflow-hidden group hover:-translate-y-1 duration-300"
              >
                <div className={`h-3 bg-gradient-to-r ${gradients[idx % gradients.length]}`}></div>
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                    <FaDna className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{sp.name}</h3>
                  {sp.description && (
                    <p className="text-gray-500 text-sm line-clamp-3">{sp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesPage;
