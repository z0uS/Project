import React, { useState } from "react";
import {
  FaUserPlus, FaCalendarPlus, FaClipboardList, FaFileMedical,
  FaPhoneAlt, FaEnvelopeOpenText, FaChevronDown, FaChevronUp
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-blue-600 text-3xl" />,
    title: "Bước 1: Đăng ký & Đăng nhập",
    image: "https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?size=626&ext=jpg",
    content: (
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        <li>Truy cập <b>Đăng ký</b>, nhập thông tin cá nhân, email và mật khẩu.</li>
        <li>Nhấn <b>Đăng ký</b> để tạo tài khoản.</li>
        <li>Sau đăng ký, kiểm tra email xác thực (nếu có).</li>
        <li>Dùng email & mật khẩu để <b>đăng nhập</b> hệ thống.</li>
      </ul>
    ),
  },
  {
    icon: <FaCalendarPlus className="text-blue-600 text-3xl" />,
    title: "Bước 2: Đặt lịch khám",
    image: "https://img.freepik.com/free-vector/medical-appointment-booking_23-2148584377.jpg?size=626&ext=jpg",
    content: (
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        <li>Chọn mục <b>Đặt lịch khám</b> trên thanh menu.</li>
        <li>Lựa chọn <b>chuyên khoa</b>, <b>bác sĩ</b>, <b>ngày giờ</b>, và nhập lý do khám.</li>
        <li>Kiểm tra lại thông tin và nhấn <b>Xác nhận đặt lịch</b>.</li>
        <li>Hệ thống sẽ gửi thông báo xác nhận và nhắc lịch qua SMS/Email.</li>
      </ul>
    ),
  },
  {
    icon: <FaClipboardList className="text-blue-600 text-3xl" />,
    title: "Bước 3: Quản lý lịch hẹn",
    image: "https://img.freepik.com/free-vector/appointment-booking-with-smartphone-concept_23-2148569551.jpg?size=626&ext=jpg",
    content: (
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        <li>Chọn <b>Lịch hẹn của tôi</b> để xem lịch đã đặt.</li>
        <li>Bấm <b>Hủy</b> nếu không thể đến khám (ưu tiên thao tác trước 24h).</li>
        <li>Có thể <b>tái khám nhanh</b> với bác sĩ từ lịch cũ chỉ bằng 1 click.</li>
      </ul>
    ),
  },
  {
    icon: <FaFileMedical className="text-blue-600 text-3xl" />,
    title: "Bước 4: Quản lý hồ sơ & đơn thuốc",
    image: "https://img.freepik.com/free-vector/online-doctor-appointment-concept_23-2148579545.jpg?size=626&ext=jpg",
    content: (
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        <li>Xem <b>hồ sơ bệnh án</b> gồm lịch sử khám, kết quả xét nghiệm.</li>
        <li>Xem và tải <b>đơn thuốc điện tử</b> sau mỗi lần khám.</li>
        <li>Cập nhật thông tin cá nhân tại mục <b>Hồ sơ của tôi</b>.</li>
      </ul>
    ),
  },
  {
    icon: <FaPhoneAlt className="text-blue-600 text-3xl" />,
    title: "Bước 5: Hỗ trợ & liên hệ",
    image: "https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148887720.jpg?size=626&ext=jpg",
    content: (
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        <li>Gặp vấn đề, truy cập <b>Liên hệ</b> để gửi phản hồi, hoặc gọi hotline.</li>
        <li>
          Hotline: <span className="font-bold text-blue-700">1900 2115</span> &nbsp;|&nbsp;
          Email: <a href="mailto:support@ducthienclinic.vn" className="text-blue-600 underline">support@ducthienclinic.vn</a>
        </li>
      </ul>
    ),
  },
];

const faqs = [
  {
    q: "Tôi quên mật khẩu, làm sao lấy lại?",
    a: "Nhấn vào 'Quên mật khẩu' ở trang đăng nhập, nhập email và làm theo hướng dẫn trong email để đặt lại mật khẩu mới.",
  },
  {
    q: "Không nhận được email xác nhận hoặc nhắc lịch?",
    a: "Hãy kiểm tra hộp thư rác/spam. Nếu vẫn không nhận được, hãy liên hệ hotline hoặc email hỗ trợ.",
  },
  {
    q: "Làm thế nào để thay đổi thông tin cá nhân?",
    a: "Đăng nhập, vào mục 'Hồ sơ của tôi', nhấn 'Chỉnh sửa hồ sơ', cập nhật thông tin rồi bấm Lưu.",
  },
  {
    q: "Tôi có thể đặt lịch cho người thân không?",
    a: "Có, khi đặt lịch bạn chọn 'Đặt cho người thân' và nhập thông tin người thân cần khám.",
  },
  {
    q: "Tôi muốn hủy lịch sát giờ khám thì làm thế nào?",
    a: "Bạn có thể hủy lịch trong mục 'Lịch hẹn của tôi', tuy nhiên nên thao tác sớm để phòng khám sắp xếp hợp lý.",
  },
];

const GuidePage = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-10 text-center">
          Hướng dẫn sử dụng hệ thống khám bệnh trực tuyến
        </h1>

        {/* Các bước minh họa */}
        <div className="grid gap-10">
          {steps.map((step, idx) => (
            <section
              key={idx}
              className="bg-white rounded-3xl shadow-lg border-l-4 border-blue-200 p-8 flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="flex flex-col items-center min-w-[90px]">
                {step.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-blue-700 mb-2">{step.title}</h2>
                <div className="mb-2">{step.content}</div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-2xl w-40 h-28 object-cover border border-blue-100 shadow"
                  loading="lazy"
                />
              </div>
            </section>
          ))}
        </div>

        {/* FAQ - Câu hỏi thường gặp */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Câu hỏi thường gặp (FAQ)
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm"
              >
                <button
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-blue-900 font-semibold text-lg focus:outline-none"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                  aria-controls={`faq-${i}`}
                >
                  {faq.q}
                  {faqOpen === i ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {faqOpen === i && (
                  <div id={`faq-${i}`} className="px-7 pb-4 text-gray-700 text-base">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hỗ trợ nhanh */}
        <div className="mt-14 bg-gradient-to-r from-blue-100 via-white to-blue-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow border-t-4 border-blue-200">
          <div className="text-xl font-bold text-blue-700 mb-3 md:mb-0">
            Cần hỗ trợ gấp? Gọi ngay <span className="text-2xl text-blue-800">1900 2115</span>
          </div>
          <a
            href="mailto:support@ducthienclinic.vn"
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition mt-3 md:mt-0"
          >
            Gửi email hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
