import React from "react";
import CountUp from "react-countup";
import {
  FaUserCheck,
  FaUserMd,
  FaShieldAlt,
  FaRegSmileBeam,
  FaClinicMedical,
} from "react-icons/fa";

// Thêm số liệu mới dễ dàng!
const STATS = [
  {
    icon: <FaUserCheck className="text-blue-500 text-4xl mb-3" />,
    end: 12000,
    suffix: "+",
    label: "Bệnh nhân hài lòng",
    decimals: 0,
    duration: 2,
  },
  {
    icon: <FaUserMd className="text-green-500 text-4xl mb-3" />,
    end: 35,
    suffix: "+",
    label: "Bác sĩ chuyên khoa",
    decimals: 0,
    duration: 2,
  },
  {
    icon: <FaShieldAlt className="text-yellow-500 text-4xl mb-3" />,
    end: 100,
    suffix: "%",
    label: "Bảo mật thông tin",
    decimals: 0,
    duration: 2,
  },
  {
    icon: <FaRegSmileBeam className="text-pink-500 text-4xl mb-3" />,
    end: 4500,
    suffix: "+",
    label: "Đánh giá 5 sao",
    decimals: 0,
    duration: 2,
  },
  {
    icon: <FaClinicMedical className="text-purple-500 text-4xl mb-3" />,
    end: 7,
    suffix: "",
    label: "Cơ sở phòng khám",
    decimals: 0,
    duration: 2,
  },
];

const StatsSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50/70 to-white py-16 border-t border-blue-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-800 mb-12 tracking-tight drop-shadow">
          Những con số ấn tượng
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-blue-200 hover:shadow-2xl transition-all duration-300 group flex flex-col items-center animate-fadeIn"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {stat.icon}
              <div className="text-4xl md:text-5xl font-black text-blue-600 tracking-tight mb-1 group-hover:scale-110 transition-transform duration-300">
                <CountUp
                  end={stat.end}
                  duration={stat.duration}
                  decimals={stat.decimals}
                  separator="."
                />
                {stat.suffix}
              </div>
              <div className="text-lg font-medium text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
