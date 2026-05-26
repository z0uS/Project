import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import { FaClinicMedical, FaSearch } from "react-icons/fa";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/services")
      .then(res => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3">Dịch vụ y tế</h1>
          <p className="text-gray-600 text-lg">Các dịch vụ khám chữa bệnh chuyên nghiệp, hiện đại</p>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
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
          <div className="text-center py-20 text-gray-400 text-lg">Không tìm thấy dịch vụ nào</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-blue-50 p-6 group hover:-translate-y-1 duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform">
                  <FaClinicMedical className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                {service.description && (
                  <p className="text-gray-500 text-sm mb-3 line-clamp-3">{service.description}</p>
                )}
                {service.price && (
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <span className="text-blue-600 font-bold text-lg">{formatPrice(service.price)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
