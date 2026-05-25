// src/pages/patient/Ratings.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axiosClient";

const Ratings = () => {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      if (!user?.id) return;
      try {
        console.log("📥 Gọi API:", `/patients/${user.id}/ratings`);
        const res = await axios.get(`/patients/${user.id}/ratings`);
        console.log("✅ Dữ liệu đánh giá:", res.data);
        setRatings(res.data);
      } catch (err) {
        console.error("❌ Lỗi lấy đánh giá:", err);
        setError(err?.response?.data?.message || "Không thể tải đánh giá.");
      }
    };

    fetchRatings();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Lịch sử đánh giá bác sĩ</h2>

      {error && <p className="text-red-600">{error}</p>}

      {ratings.length === 0 && !error ? (
        <p className="text-gray-600">Bạn chưa có đánh giá nào.</p>
      ) : (
        <ul className="space-y-4">
          {ratings.map((rate) => (
            <li key={rate.id} className="border-b pb-4">
              <p className="font-semibold text-gray-800">Bác sĩ: {rate.doctorName}</p>
              <p className="text-gray-600">Điểm: {rate.score}/5</p>
              <p className="text-gray-600">Bình luận: {rate.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Ratings;
