import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import { getSpecialtiesApi } from "../../api/specialties";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    degree: "",
    experience: "",
    bio: "",
    specialtyId: "",
    dob: "",
    gender: "",
    address: "",
  });
  const [specialties, setSpecialties] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Lấy danh sách chuyên khoa
    getSpecialtiesApi()
      .then(res => setSpecialties(res.data))
      .catch(() => setSpecialties([]));

    // Lấy profile bác sĩ
    axios.get("/doctors/me")
      .then(res => {
        setProfile({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          degree: res.data.degree || "",
          experience: res.data.experience || "",
          bio: res.data.bio || "",
          specialtyId: res.data.specialtyId ? String(res.data.specialtyId) : "",
          dob: res.data.dob || "",
          gender: res.data.gender || "",
          address: res.data.address || "",
        });
      })
      .catch(() => setMessage("Không lấy được thông tin profile."));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      await axios.put("/doctors/me", profile);
      setMessage("Cập nhật thành công!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 2500);
    } catch {
      setMessage("Có lỗi xảy ra, vui lòng thử lại.");
      setMessageType("error");
    }
    setSubmitting(false);
  };

  const selectedSpecialty = specialties.find(sp => String(sp.id) === String(profile.specialtyId));

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Hồ sơ bác sĩ</h2>
      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột trái */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-2 border bg-gray-100 rounded-lg"
              />
              <small className="text-gray-500">Không thể thay đổi email</small>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Ngày sinh</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Giới tính</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Bằng cấp</label>
              <input
                type="text"
                name="degree"
                value={profile.degree}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Chuyên khoa</label>
              <select
                name="specialtyId"
                value={profile.specialtyId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn chuyên khoa</option>
                {specialties.map(sp => (
                  <option value={sp.id} key={sp.id}>{sp.name}</option>
                ))}
              </select>
              {selectedSpecialty && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  {selectedSpecialty.description}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Kinh nghiệm</label>
              <input
                type="text"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Địa chỉ nơi ở"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Giới thiệu bản thân</label>
              <textarea
                name="bio"
                rows="4"
                placeholder="Mô tả ngắn về kinh nghiệm và chuyên môn"
                value={profile.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`mt-8 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition ${
            submitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={submitting}
        >
          {submitting ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
