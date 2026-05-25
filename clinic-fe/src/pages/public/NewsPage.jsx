import React, { useState } from "react";

const sampleArticles = [
  {
    id: 1,
    title: "6 dấu hiệu bạn nên đi khám tim mạch ngay",
    summary:
      "Nhận biết sớm các triệu chứng bất thường về tim mạch giúp ngăn ngừa biến chứng nguy hiểm. Dưới đây là 6 dấu hiệu bạn cần lưu ý...",
    cover:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    publishedAt: "2024-06-01T09:00:00Z",
  },
  {
    id: 2,
    title: "Lợi ích của xét nghiệm tổng quát định kỳ",
    summary:
      "Xét nghiệm tổng quát giúp phát hiện bệnh sớm, điều trị hiệu quả và tiết kiệm chi phí. Bài viết phân tích chi tiết các nhóm xét nghiệm quan trọng.",
    cover:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    publishedAt: "2024-05-28T16:45:00Z",
  },
  {
    id: 3,
    title: "Tiêm chủng phòng bệnh: Cập nhật khuyến nghị mới nhất",
    summary:
      "Tiêm chủng là biện pháp bảo vệ sức khỏe hiệu quả. Xem ngay các khuyến nghị tiêm chủng mới nhất của Bộ Y tế dành cho mọi lứa tuổi.",
    cover:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    publishedAt: "2024-05-22T08:30:00Z",
  },
];

const NewsPage = () => {
  const [articles] = useState(sampleArticles);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-8 text-center md:text-left">
          Tin tức & Kiến thức Y tế
        </h1>

        {articles.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-gray-600 text-center">
            Chưa có bài viết nào.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl shadow-lg border-t-4 border-blue-100 overflow-hidden flex flex-col"
              >
                {/* Nếu có ảnh cover */}
                {art.cover && (
                  <img
                    src={art.cover}
                    alt={art.title}
                    className="h-48 w-full object-cover rounded-t-2xl"
                    loading="lazy"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-blue-800">{art.title}</h2>
                    {art.publishedAt && (
                      <span className="ml-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full shadow font-semibold">
                        {new Date(art.publishedAt).toLocaleDateString("vi-VN")}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 flex-1 mb-4">{art.summary}</p>
                  <a
                    href={`/news/${art.id}`}
                    className="inline-block w-fit mt-auto px-6 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
