import React from "react";
import logoClinic from "../../assets/clinic-login.png";

const missions = [
  "Chăm sóc sức khỏe toàn diện cho mọi gia đình",
  "Cập nhật công nghệ, trang thiết bị hiện đại nhất",
  "Đặt bệnh nhân là trung tâm – tư vấn tận tâm, minh bạch",
];

const values = [
  "Uy tín – Chất lượng – Tận tâm",
  "Khám chữa bệnh an toàn, hiệu quả",
  "Không ngừng học hỏi, đổi mới phục vụ cộng đồng",
];

const milestones = [
  { year: "2020", text: "Thành lập Phòng Khám Đạt Sang, đội ngũ ban đầu 6 bác sĩ" },
  { year: "2021", text: "Triển khai hệ thống đặt lịch khám trực tuyến, phục vụ trên 3.000 bệnh nhân" },
  { year: "2022", text: "Nâng cấp phòng xét nghiệm – đầu tư thiết bị hiện đại tiêu chuẩn quốc tế" },
  { year: "2023", text: "Phục vụ hơn 10.000 lượt khám/năm, mở rộng dịch vụ tiêm chủng, chăm sóc doanh nghiệp" },
  { year: "2024", text: "Được bình chọn Top 10 phòng khám uy tín tại Hà Nội" },
];

const AboutPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
    <div className="max-w-5xl mx-auto px-4">
      {/* Section: Banner và giới thiệu */}
      <section className="bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center p-8 mb-10 border-t-4 border-blue-200">
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3">
            Giới thiệu<br />
            <span className="text-blue-400">Phòng Khám Đạt Sang</span>
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            <span className="font-bold text-blue-600">Phòng Khám Đạt Sang</span> thành lập năm 2020, với sứ mệnh chăm sóc sức khỏe cộng đồng bằng chất lượng – uy tín – tận tâm.  
            Đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại cùng quy trình khám bệnh tối ưu, mang lại sự an tâm tuyệt đối cho mọi khách hàng.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold shadow">Khám tổng quát</span>
            <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold shadow">Chuyên khoa sâu</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold shadow">Xét nghiệm & Tiêm chủng</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={logoClinic}
            alt="Phòng khám Đạt Sang"
            className="rounded-2xl w-72 md:w-80 object-cover shadow-xl border-4 border-blue-100"
            loading="lazy"
          />
        </div>
      </section>

      {/* Section: Sứ mệnh */}
      <section className="bg-blue-50 rounded-3xl shadow p-8 mb-10 border-l-4 border-blue-300">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#3B82F6" fillOpacity="0.14"/><path d="M24 14v20M14 24h20" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"/></svg>
          Sứ mệnh của chúng tôi
        </h2>
        <ul className="space-y-3 pl-3">
          {missions.map((m, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 inline-block w-3 h-3 rounded-full bg-blue-400"></span>
              <span className="text-base text-blue-900">{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Giá trị cốt lõi */}
      <section className="bg-white rounded-3xl shadow p-8 mb-10 border-l-4 border-blue-300">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#3B82F6" fillOpacity="0.1"/><path d="M19 24h10M24 19v10" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"/></svg>
          Giá trị cốt lõi
        </h2>
        <ul className="space-y-2 pl-3">
          {values.map((v, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 inline-block w-3 h-3 rounded-full bg-blue-300"></span>
              <span className="text-base text-gray-700">{v}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Dấu mốc phát triển */}
      <section className="bg-blue-50 rounded-3xl shadow p-8 mb-10 border-l-4 border-blue-300">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#3B82F6" fillOpacity="0.1"/><rect x="20" y="16" width="8" height="16" rx="2" fill="#2563EB"/><rect x="16" y="24" width="16" height="4" rx="2" fill="#2563EB"/></svg>
          Dấu mốc phát triển
        </h2>
        <ol className="relative border-l-2 border-blue-200 pl-8 space-y-6">
          {milestones.map((item, idx) => (
            <li key={idx} className="mb-2 ml-2">
              <div className="absolute -left-6 mt-1 w-6 h-6 flex items-center justify-center bg-white rounded-full border-2 border-blue-400 shadow">
                <span className="text-blue-600 font-extrabold">{item.year}</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
                <span className="text-gray-800">{item.text}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section: Kết nối */}
      <section className="bg-gradient-to-r from-blue-200 via-blue-50 to-white rounded-3xl shadow p-8 mb-8 flex flex-col items-center border-t-4 border-blue-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Kết nối với Phòng Khám Đạt Sang</h2>
        <p className="text-base text-gray-700 mb-3">
          Liên hệ đặt lịch và tư vấn:
          <span className="ml-2 font-semibold text-blue-600">1900 2115</span>
        </p>
        <div className="flex gap-4">
          <a href="https://www.facebook.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-blue-200 shadow hover:bg-blue-50 transition" target="_blank" rel="noreferrer">
            <svg fill="#3b82f6" width="24" height="24" viewBox="0 0 24 24"><path d="M22,12A10,10,0,1,0,10,21.95V14.89H7.31V12h2.7V9.8c0-2.67,1.59-4.14,4-4.14a16.36,16.36,0,0,1,2.38.21V8.82H15.3c-1.21,0-1.56.77-1.56,1.56V12h2.66l-.43,2.89H13.74v7.06A10,10,0,0,0,22,12Z"/></svg>
          </a>
          <a href="https://www.youtube.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-blue-200 shadow hover:bg-blue-50 transition" target="_blank" rel="noreferrer">
            <svg fill="#3b82f6" width="24" height="24" viewBox="0 0 24 24"><path d="M21.8,8.001c-.232-.875-.918-1.561-1.794-1.794C18.209,6,12,6,12,6s-6.209,0-8.006.207c-.876.233-1.562.919-1.795,1.794C2,9.798,2,12,2,12s0,2.202.199,3.999c.233.876.919,1.563,1.795,1.795C5.791,18,12,18,12,18s6.209,0,8.006-.206c.876-.232,1.562-.919,1.794-1.795C22,14.202,22,12,22,12S22,9.798,21.8,8.001zM10,15V9l5,3L10,15z"/></svg>
          </a>
        </div>
      </section>
    </div>
  </div>
);

export default AboutPage;
