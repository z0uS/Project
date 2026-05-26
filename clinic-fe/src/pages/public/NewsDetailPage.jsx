import React from "react";
import { useParams, Link } from "react-router-dom";

const sampleArticles = [
  {
    id: 1,
    title: "6 dấu hiệu bạn nên đi khám tim mạch ngay",
    summary:
      "Nhận biết sớm các triệu chứng bất thường về tim mạch giúp ngăn ngừa biến chứng nguy hiểm. Dưới đây là 6 dấu hiệu bạn cần lưu ý...",
    content: `
Tim mạch là một trong những bộ phận quan trọng nhất của cơ thể. Việc nhận biết sớm các dấu hiệu bất thường sẽ giúp bạn điều trị kịp thời và tránh các biến chứng nguy hiểm.

**1. Đau ngực hoặc tức ngực**
Cảm giác đau, tức, ép hoặc khó chịu ở vùng ngực có thể là dấu hiệu của bệnh tim. Đặc biệt nếu cơn đau lan ra cánh tay trái, cổ hoặc hàm.

**2. Khó thở bất thường**
Nếu bạn thường xuyên cảm thấy khó thở khi làm các hoạt động nhẹ nhàng hoặc khi nghỉ ngơi, đây có thể là triệu chứng của suy tim hoặc bệnh van tim.

**3. Tim đập nhanh hoặc không đều**
Nhịp tim không đều, đánh trống ngực hoặc cảm giác tim "bỏ nhịp" là những dấu hiệu cần được kiểm tra bởi bác sĩ tim mạch.

**4. Mệt mỏi bất thường**
Cảm giác kiệt sức ngay cả khi không làm gì nặng nhọc có thể liên quan đến vấn đề về tim mạch.

**5. Phù nề chân, mắt cá chân**
Sưng phù ở chân hoặc mắt cá chân có thể là dấu hiệu của suy tim, khi tim không bơm đủ máu và gây tích nước.

**6. Chóng mặt hoặc ngất xỉu**
Hay bị chóng mặt, choáng váng hoặc ngất xỉu có thể do rối loạn nhịp tim hoặc huyết áp thấp do tim yếu.

Nếu bạn gặp bất kỳ dấu hiệu nào trong số này, hãy đến gặp bác sĩ ngay để được thăm khám và tư vấn kịp thời.
    `,
    cover:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    publishedAt: "2024-06-01T09:00:00Z",
  },
  {
    id: 2,
    title: "Lợi ích của xét nghiệm tổng quát định kỳ",
    summary:
      "Xét nghiệm tổng quát giúp phát hiện bệnh sớm, điều trị hiệu quả và tiết kiệm chi phí. Bài viết phân tích chi tiết các nhóm xét nghiệm quan trọng.",
    content: `
Xét nghiệm tổng quát định kỳ là một trong những biện pháp bảo vệ sức khỏe chủ động và hiệu quả nhất. Thay vì chờ đến khi bệnh nặng mới đi khám, kiểm tra định kỳ giúp phát hiện sớm các vấn đề tiềm ẩn.

**Các nhóm xét nghiệm quan trọng:**

**1. Xét nghiệm máu tổng quát (CBC)**
Giúp kiểm tra số lượng hồng cầu, bạch cầu, tiểu cầu. Phát hiện thiếu máu, nhiễm trùng hoặc bệnh bạch cầu.

**2. Xét nghiệm đường huyết**
Phát hiện sớm tiểu đường và tiền tiểu đường, đặc biệt quan trọng với người có tiền sử gia đình mắc bệnh này.

**3. Kiểm tra chức năng gan, thận**
Đánh giá hoạt động của các cơ quan quan trọng, phát hiện sớm tổn thương do thuốc, rượu bia hoặc bệnh mãn tính.

**4. Kiểm tra mỡ máu (cholesterol)**
Đánh giá nguy cơ tim mạch và đột quỵ.

**5. Xét nghiệm tuyến giáp**
Phát hiện rối loạn tuyến giáp, ảnh hưởng đến metabolism và tâm trạng.

**Tần suất khuyến nghị:** Người trưởng thành nên xét nghiệm tổng quát ít nhất 1 lần/năm. Người cao tuổi hoặc có bệnh nền nên kiểm tra 6 tháng/lần.
    `,
    cover:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
    publishedAt: "2024-05-28T16:45:00Z",
  },
  {
    id: 3,
    title: "Tiêm chủng phòng bệnh: Cập nhật khuyến nghị mới nhất",
    summary:
      "Tiêm chủng là biện pháp bảo vệ sức khỏe hiệu quả. Xem ngay các khuyến nghị tiêm chủng mới nhất của Bộ Y tế dành cho mọi lứa tuổi.",
    content: `
Tiêm chủng là một trong những thành tựu y học vĩ đại nhất, giúp ngăn chặn hàng triệu ca tử vong mỗi năm trên toàn thế giới. Bộ Y tế Việt Nam thường xuyên cập nhật các khuyến nghị tiêm chủng phù hợp với tình hình dịch bệnh.

**Lịch tiêm chủng mở rộng cho trẻ em:**
- Viêm gan B: Tiêm ngay sau sinh
- BCG (lao): Trong 1 tháng đầu
- DPT-VGB-Hib: 2, 3, 4 tháng tuổi
- Bại liệt uống: Cùng lịch DPT
- Sởi: 9 tháng và 18 tháng

**Tiêm chủng cho người lớn:**
- Cúm mùa: Hàng năm, đặc biệt quan trọng với người cao tuổi
- Viêm gan A, B: Nếu chưa tiêm hoặc chưa có miễn dịch
- Phế cầu khuẩn: Người trên 65 tuổi hoặc có bệnh mãn tính
- HPV: Phụ nữ 9-26 tuổi để phòng ung thư cổ tử cung

**Lưu ý:** Hãy mang theo sổ tiêm chủng khi đến cơ sở y tế để được tư vấn đúng lịch và tránh tiêm trùng lặp.
    `,
    cover:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80",
    publishedAt: "2024-05-22T08:30:00Z",
  },
];

const NewsDetailPage = () => {
  const { id } = useParams();
  const article = sampleArticles.find((a) => String(a.id) === String(id));

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Không tìm thấy bài viết</h2>
          <p className="text-gray-500 mb-6">Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link
            to="/news"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition"
          >
            ← Quay lại tin tức
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back button */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition"
        >
          ← Quay lại tin tức
        </Link>

        {/* Cover image */}
        {article.cover && (
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-72 object-cover rounded-2xl shadow-lg mb-6"
          />
        )}

        {/* Article card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Date */}
          {article.publishedAt && (
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-semibold mb-4 inline-block">
              {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
            </span>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-gray-500 italic border-l-4 border-blue-200 pl-4 mb-6">
            {article.summary}
          </p>

          <hr className="border-blue-100 mb-6" />

          {/* Content */}
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>

        {/* Other articles */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-blue-700 mb-4">Bài viết khác</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {sampleArticles
              .filter((a) => a.id !== article.id)
              .map((a) => (
                <Link
                  key={a.id}
                  to={`/news/${a.id}`}
                  className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex gap-3 items-start group"
                >
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-blue-800 group-hover:text-blue-600 transition text-sm leading-snug">
                      {a.title}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(a.publishedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
