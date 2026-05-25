import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import logoClinic from "../assets/clinic-login.png"; // Đổi đúng path logo

const Footer = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Giả lập gửi email đăng ký nhận tin
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  // Giả lập gửi feedback
  const handleFeedback = (e) => {
    e.preventDefault();
    if (feedback.length > 3) {
      setFeedbackSent(true);
      setTimeout(() => setFeedbackSent(false), 3000);
      setFeedback("");
    }
  };

  return (
    <footer className="bg-gradient-to-t from-blue-900 via-blue-800 to-blue-700 text-white pt-14 pb-6 border-t border-blue-700 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-base">

        {/* 1. Logo + slogan */}
        <div className="flex flex-col items-start md:col-span-1">
          <div className="flex items-center mb-2">
            <img
              src={logoClinic}
              alt="Logo Phòng Khám"
              className="h-12 w-12 rounded-full bg-white shadow-lg border border-blue-200 mr-3"
            />
            <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
              Phòng Khám <span className="text-blue-300">ĐS</span>
            </span>
          </div>
          <p className="text-blue-100 text-sm italic mt-2">
            Chăm sóc tận tâm – Kết nối niềm tin sức khỏe
          </p>
        </div>

        {/* 2. Liên kết nhanh */}
        <div>
          <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline hover:text-blue-300 flex items-center gap-2">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="/patient/book-appointment" className="hover:underline hover:text-blue-300 flex items-center gap-2">
                Đặt lịch khám
              </a>
            </li>
            <li>
              <a href="/doctors" className="hover:underline hover:text-blue-300 flex items-center gap-2">
                Đội ngũ bác sĩ
              </a>
            </li>
            <li>
              <a href="/specialties" className="hover:underline hover:text-blue-300 flex items-center gap-2">
                Chuyên khoa
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline hover:text-blue-300 flex items-center gap-2">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* 3. Thông tin liên hệ */}
        <address className="not-italic">
          <h3 className="text-lg font-bold mb-4">Thông tin liên hệ</h3>
          <ul className="space-y-2 text-blue-100 text-base">
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              <a href="tel:19002115" className="hover:underline hover:text-blue-200">
                1900 2115
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:support@ducthienclinic.vn" className="hover:underline hover:text-blue-200">
                support@ducthienclinic.vn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt />
              123 Đường Sức Khỏe, Q. Bình Thạnh, TP.HCM
            </li>
          </ul>
        </address>

        {/* 4. Mạng xã hội + hotline + nhận tin */}
        <div>
          <h3 className="text-lg font-bold mb-4">Theo dõi chúng tôi</h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-800 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Tiktok"
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
            >
              <FaTiktok size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-800 transition"
            >
              <FaYoutube size={20} />
            </a>
          </div>
          <a
            href="tel:19002115"
            className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-full px-6 py-2 shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-center w-fit"
          >
            Gọi ngay 1900 2115
          </a>
          {/* Đăng ký nhận tin */}
          <form onSubmit={handleSubscribe} className="mt-4 flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm text-blue-100 font-semibold">
              Đăng ký nhận tin tức mới:
            </label>
            <div className="flex">
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="px-3 py-2 rounded-l-md bg-white text-blue-800 text-sm outline-none border-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded-r-md text-white font-bold"
              >
                <FaPaperPlane />
              </button>
            </div>
            {subscribed && (
              <span className="text-green-300 text-xs">Đã đăng ký thành công!</span>
            )}
          </form>
        </div>

        {/* 5. Feedback & bản đồ */}
        <div>
          <h3 className="text-lg font-bold mb-4">Góp ý & Địa chỉ</h3>
          {/* Feedback form */}
          <form onSubmit={handleFeedback} className="flex flex-col space-y-2 mb-3">
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Ý kiến của bạn..."
              rows={2}
              className="px-3 py-2 rounded-md bg-white text-blue-900 text-sm outline-none border-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 transition px-4 py-2 rounded-md text-white font-bold"
            >
              Gửi góp ý
            </button>
            {feedbackSent && (
              <span className="text-green-300 text-xs">Cảm ơn bạn đã góp ý!</span>
            )}
          </form>
          {/* Google Map responsive */}
          <div className="w-full rounded-2xl overflow-hidden border border-blue-200 shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.501442040165!2d106.69611567587042!3d10.768421959396665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1d2d7d5e47%3A0x3142a234ebd2dbed!2zMTIzIMSQLiBTxrDhu5tjIEtow6FuZywgQsOsbmggVGjhuqduaCwgUFAuIEjDoG5nIE1haSwgVMOibiBCw6xuaCwgSOG7kyBDaMOtIE1pbmggMTIz!5e0!3m2!1svi!2s!4v1717295021929!5m2!1svi!2s"
              width="100%"
              height="120"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-blue-700 pt-5 text-center text-xs text-blue-200">
        &copy; {new Date().getFullYear()} Phòng Khám ĐS. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
