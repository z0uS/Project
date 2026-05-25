import React, { useState } from "react";
import { FaSearch, FaCheckCircle, FaUserMd, FaStethoscope } from "react-icons/fa";
import Button from "./Button";
import logoClinic from "../assets/clinic-login.png"; // Đổi đúng path logo của bạn
import anh1 from "../assets/anh1.png";
import anh2 from "../assets/anh2.jpg";

const SUGGESTIONS = [
  "Khám nội tổng quát",
  "Khám chuyên khoa",
  "Khám tim mạch",
  "Khám nhi khoa",
  "Xét nghiệm tổng quát",
];

const SERVICE_TAGS = [
  { icon: <FaStethoscope />, label: "Khám tổng quát" },
  { icon: <FaUserMd />, label: "Khám chuyên khoa" },
  { icon: <FaStethoscope />, label: "Khám doanh nghiệp" },
  { icon: <FaUserMd />, label: "Xét nghiệm nhanh" },
];

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCTAClick = () => {
    const el = document.getElementById("form-booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#E4F1FF] via-[#E6F6FE] to-[#fff] border-b border-blue-50 overflow-hidden relative">
      {/* Nền gradient động nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-blue-200/40 to-white animate-pulse opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center px-4 md:px-12 py-10 md:py-20">

        {/* Ảnh bác sĩ bên trái */}
        <div className="w-full lg:w-1/4 flex justify-center lg:justify-start mt-16 lg:mt-0 group animate-fadeLeft">
          <div className="relative pt-7">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-400 px-4 py-1 rounded-full text-xs font-bold text-white shadow-md z-10">
              Chu đáo tận tình
            </span>
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-300"></div>
            <img
              src={anh1}
              alt="Bác sĩ nữ"
              className="relative w-52 md:w-64 rounded-3xl object-cover shadow-xl border-4 border-white group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 z-0"
            />
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="w-full lg:w-2/4 text-center lg:text-left px-2 md:px-4">
          {/* --- Block logo PNG/SVG riêng + tên + slogan --- */}
          <div className="flex flex-col items-center lg:items-start mb-8">
            {/* Logo PNG/SVG riêng cạnh tên */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-white shadow-xl border-2 border-blue-100 flex items-center justify-center overflow-hidden">
                <img
                  src={logoClinic}
                  alt="Logo phòng khám"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-800 leading-tight drop-shadow-sm tracking-tight border-b-4 border-blue-200 pb-2 animate-fadeDown">
                Phòng Khám <span className="text-blue-500">ĐS</span>
              </h1>
            </div>
            {/* Mô tả rõ ràng */}
            <p className="mt-5 text-base md:text-xl text-gray-700 text-center lg:text-left max-w-2xl animate-fadeDown delay-100">
              Địa chỉ khám chữa bệnh <span className="text-blue-600 font-semibold">uy tín</span>, 
              đội ngũ các y bác sĩ <span className="text-blue-600 font-semibold">giàu kinh nghiệm</span>, 
              trang thiết bị hiện đại – luôn đồng hành cùng sức khỏe của bạn.
            </p>
            {/* Slogan động gradient */}
            <p className="mt-2 text-base md:text-xl italic font-semibold text-center lg:text-left max-w-2xl animate-pulse
              text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-green-400"
            >
              “An tâm khám – Mọi lúc, mọi nơi”
            </p>
          </div>

          {/* Khung tìm kiếm */}
          <div className="relative max-w-xl mx-auto lg:mx-0 mt-8 animate-fadeDown delay-200">
            <div className="flex items-center bg-white border border-blue-200 rounded-full px-6 py-3 shadow-lg focus-within:ring-2 focus-within:ring-blue-400">
              <FaSearch className="text-blue-300 mr-3 text-xl" />
              <input
                type="text"
                placeholder="Tìm kiếm bác sĩ, dịch vụ..."
                className="flex-1 outline-none text-gray-800 text-base bg-transparent font-medium"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              />
              <Button
                className="ml-2 px-5 py-2 text-base rounded-full"
                size="sm"
                onClick={() => setShowSuggestions(false)}
              >
                Tìm ngay
              </Button>
            </div>
            {/* Autocomplete */}
            {showSuggestions && searchTerm.trim() && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-blue-100 rounded-xl shadow-2xl mt-2 max-h-52 overflow-y-auto z-20 animate-fadeIn">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <li
                      key={idx}
                      className="px-6 py-2 text-base hover:bg-blue-50 cursor-pointer font-medium"
                      onMouseDown={() => {
                        setSearchTerm(item);
                        setShowSuggestions(false);
                      }}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="px-6 py-2 text-base text-gray-400">Không có kết quả</li>
                )}
              </ul>
            )}
          </div>
          {/* Gợi ý dịch vụ dưới khung tìm kiếm */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-4 animate-fadeDown delay-300">
            {SERVICE_TAGS.map((s) => (
              <Button
                key={s.label}
                className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-200 hover:text-blue-900 px-5 py-2 rounded-full text-base shadow-sm"
                size="sm"
                variant="secondary"
                onClick={() => setSearchTerm(s.label)}
              >
                <span className="mr-2">{s.icon}</span>
                {s.label}
              </Button>
            ))}
          </div>
          {/* CTA lớn */}
          <div className="mt-8 flex justify-center lg:justify-start animate-fadeDown delay-400">
            <Button
              className="px-8 py-3 text-lg rounded-full shadow-lg font-bold uppercase tracking-wide"
              size="lg"
              onClick={handleCTAClick}
            >
              Đăng ký khám ngay
            </Button>
          </div>
          {/* Ưu điểm nổi bật */}
          <ul className="mt-8 text-left text-base md:text-lg text-green-800 space-y-4 max-w-xl mx-auto lg:mx-0 font-semibold animate-fadeDown delay-500">
            <li className="flex items-start">
              <FaCheckCircle className="mt-1 mr-3 text-green-600 text-xl" />
              Đặt khám nhanh – Tư vấn sức khỏe trực tuyến
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="mt-1 mr-3 text-green-600 text-xl" />
              Đặt khám chọn giờ – Giá ưu đãi nhất
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="mt-1 mr-3 text-green-600 text-xl" />
              Hoàn tiền linh hoạt khi hủy – Có ưu đãi hoàn tiền
            </li>
          </ul>
        </div>

        {/* Ảnh bác sĩ bên phải */}
        <div className="w-full lg:w-1/4 flex justify-center lg:justify-end mt-16 lg:mt-0 group animate-fadeRight">
          <div className="relative pt-7">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-blue-700 px-4 py-1 rounded-full text-xs font-bold text-white shadow-md z-10">
              Chuyên môn cao
            </span>
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-300"></div>
            <img
              src={anh2}
              alt="Bác sĩ nam"
              className="relative w-52 md:w-64 rounded-3xl object-cover shadow-xl border-4 border-white group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300 z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
