import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo - sau này thay bằng API thực tế
    setSuccess("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ sớm phản hồi.");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-8 text-center">
          Liên hệ với Phòng Khám Đức Thiện
        </h1>

        {/* Thông tin liên hệ nhanh */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center bg-white rounded-2xl shadow p-6 border-t-4 border-blue-200">
            <FaPhoneAlt className="text-blue-600 text-2xl mb-2" />
            <div className="font-semibold text-blue-800">Hotline</div>
            <div className="text-lg text-blue-700 font-bold">1900 2115</div>
          </div>
          <div className="flex flex-col items-center bg-white rounded-2xl shadow p-6 border-t-4 border-blue-200">
            <FaEnvelope className="text-blue-600 text-2xl mb-2" />
            <div className="font-semibold text-blue-800">Email</div>
            <a
              href="mailto:support@ducthienclinic.vn"
              className="text-blue-700 font-bold underline"
            >
              support@ducthienclinic.vn
            </a>
          </div>
          <div className="flex flex-col items-center bg-white rounded-2xl shadow p-6 border-t-4 border-blue-200">
            <FaMapMarkerAlt className="text-blue-600 text-2xl mb-2" />
            <div className="font-semibold text-blue-800">Địa chỉ</div>
            <div className="text-blue-700 font-bold text-center">
              88 Nguyễn Trãi, Thanh Xuân, Hà Nội
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Form liên hệ */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-blue-200">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Gửi yêu cầu hỗ trợ</h2>
              {success && (
                <div className="flex items-center gap-2 mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl font-semibold">
                  <FaCheckCircle /> {success}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:bg-blue-700 transition"
                >
                  Gửi liên hệ
                </button>
              </form>
            </div>
          </div>
          {/* Bản đồ */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-72 rounded-3xl overflow-hidden shadow border-l-4 border-blue-200 bg-gray-100">
              <iframe
                title="Bản đồ phòng khám Đức Thiện"
                src="https://www.google.com/maps?q=88+Nguyễn+Trãi,+Thanh+Xuân,+Hà+Nội&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
