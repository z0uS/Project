import React from "react";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import Button from "../components/Button";
import { FaUserMd, FaStethoscope, FaHeartbeat, FaSyringe } from "react-icons/fa";

// Dữ liệu mẫu cho dịch vụ nổi bật
const services = [
  {
    icon: <FaStethoscope className="text-4xl text-blue-600" />,
    title: "Khám tổng quát",
    desc: "Tầm soát, kiểm tra sức khỏe toàn diện, phát hiện sớm bệnh lý.",
  },
  {
    icon: <FaUserMd className="text-4xl text-green-600" />,
    title: "Khám chuyên khoa",
    desc: "Đội ngũ bác sĩ giàu kinh nghiệm, tư vấn chuyên sâu, tận tình.",
  },
  {
    icon: <FaHeartbeat className="text-4xl text-pink-500" />,
    title: "Xét nghiệm hiện đại",
    desc: "Thiết bị xét nghiệm chuẩn quốc tế, trả kết quả nhanh chóng, chính xác.",
  },
  {
    icon: <FaSyringe className="text-4xl text-yellow-500" />,
    title: "Tiêm chủng",
    desc: "Đầy đủ các loại vaccine – an toàn, quy trình khép kín.",
  },
];

const HomePage = () => {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col">
      {/* Hero/Banner */}
      <HeroSection />

      {/* Dịch vụ nổi bật */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-10">
          Dịch vụ nổi bật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-all group border-t-4 border-blue-100"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-lg font-bold text-blue-700 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm text-center mb-5">{service.desc}</p>
              <Button className="mt-auto" size="sm">Đặt lịch ngay</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Số liệu ấn tượng */}
      <StatsSection />

      {/* Tin tức/Sự kiện nổi bật (Gợi ý) */}
      {/* 
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-8">
          Tin tức & Sự kiện nổi bật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
              <img src={`/assets/news-${i}.jpg`} alt="Tin tức" className="rounded-xl w-full h-40 object-cover mb-4"/>
              <h3 className="font-bold text-blue-700 mb-2">Tiêu đề tin tức #{i}</h3>
              <p className="text-gray-600 text-sm mb-3">Mô tả ngắn về tin tức/sự kiện nổi bật...</p>
              <a href="#" className="text-blue-500 font-semibold hover:underline">Đọc tiếp &rarr;</a>
            </div>
          ))}
        </div>
      </section>
      */}

      {/* Feedback/Đánh giá (Có thể bổ sung thêm nếu muốn tăng uy tín) */}
      {/* 
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-8">
          Khách hàng nói gì về chúng tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1,2].map(i => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-blue-100">
              <div className="flex items-center mb-4">
                <img src={`/assets/avatar-${i}.jpg`} alt="Avatar" className="w-14 h-14 rounded-full border-2 border-blue-300 mr-4"/>
                <div>
                  <div className="font-bold text-blue-800">Bệnh nhân {i}</div>
                  <div className="text-xs text-gray-400">Đánh giá 5⭐</div>
                </div>
              </div>
              <p className="italic text-gray-700">Dịch vụ rất tốt, bác sĩ tận tình. Lần sau sẽ quay lại và giới thiệu bạn bè!</p>
            </div>
          ))}
        </div>
      </section>
      */}

      {/* Footer sẽ tự động hiển thị qua layout */}
    </main>
  );
};

export default HomePage;
