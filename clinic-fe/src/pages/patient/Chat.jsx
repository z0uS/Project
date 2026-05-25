// src/pages/patient/Chat.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axiosClient";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { id: appointmentId } = useParams(); // lấy id từ URL, ví dụ /chat/5
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appointmentId) fetchMessages();
  }, [appointmentId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/messages/${appointmentId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Lỗi tải tin nhắn:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    try {
      const res = await axios.post("/messages", {
        appointmentId,
        content: newMsg.trim()
      });
      setMessages(prev => [...prev, res.data.data]);
      setNewMsg("");
    } catch (err) {
      alert("Lỗi gửi tin nhắn");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Trao đổi với bác sĩ</h2>

      {loading ? (
        <p className="text-gray-400">Đang tải tin nhắn...</p>
      ) : (
        <>
          <div className="max-h-[400px] overflow-y-auto border rounded p-3 bg-gray-50 mb-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Chưa có tin nhắn.</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 px-3 py-2 rounded-lg max-w-[70%] ${
                    msg.senderId === user.id
                      ? "bg-blue-100 ml-auto text-right"
                      : "bg-gray-200 mr-auto text-left"
                  }`}
                >
                  <div className="text-sm">{msg.content}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.sentAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Nhập tin nhắn..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Gửi
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
