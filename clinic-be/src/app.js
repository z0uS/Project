const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
 
dotenv.config();
 
const app = express();
 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
 
app.use(express.json());
app.use('/uploads', express.static('uploads'));
 
// ==== Register routes ====
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
 
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
 
const patientRoutes = require('./routes/patient');
app.use('/api/patients', patientRoutes);
 
const doctorRoutes = require('./routes/doctors');
app.use('/api/doctors', doctorRoutes);
 
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
 
const appointmentRoutes = require('./routes/appointment');
app.use('/api/appointments', appointmentRoutes);
 
const specialtyRoutes = require('./routes/specialty');
app.use('/api/specialties', specialtyRoutes);
 
const serviceRoutes = require('./routes/service');
app.use('/api/services', serviceRoutes);
 
const scheduleRoutes = require('./routes/schedule');
app.use('/api/schedules', scheduleRoutes);
 
const doctorServiceRoutes = require('./routes/doctorService');
app.use('/api/doctor-services', doctorServiceRoutes);
 
const medicalRoutes = require('./routes/medical');
app.use('/api/medical', medicalRoutes);
 
const ratingRoutes = require('./routes/rating');
app.use('/api/ratings', ratingRoutes);
 
const statisticsRoutes = require('./routes/statistics');
app.use('/api/statistics', statisticsRoutes);
 
const notificationRoutes = require('./routes/notification');
app.use('/api/notifications', notificationRoutes);
 
const messageRoutes = require('./routes/message');
app.use('/api/messages', messageRoutes);
 
const paymentRoutes = require('./routes/payment');
app.use('/api/payments', paymentRoutes);
 
const shiftRoutes = require('./routes/shifts');
app.use('/api/shifts', shiftRoutes);
 
const availableSchedulesRoutes = require('./routes/availableSchedules');
app.use('/api/available-schedules', availableSchedulesRoutes);
 
// ✅ FIX BUG 1: reportRoutes phải nằm TRƯỚC app.listen()
const reportRoutes = require('./routes/report');
app.use('/api/admin/reports', reportRoutes);
 
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});
 
// ==== Kết nối & sync DB ====
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected!');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });
 
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('✅ All models were synchronized successfully.');
    
    // Tự động kiểm tra và sửa/seeding dữ liệu mặc định bị lỗi font hoặc thiếu
    try {
      const { Shift, Specialty } = require('./models');

      // 1. Kiểm tra / Seeding ca khám (Shifts)
      const shiftCount = await Shift.count();
      if (shiftCount === 0) {
        await Shift.bulkCreate([
          { id: 1, name: 'Sáng', startTime: '08:00:00', endTime: '12:00:00' },
          { id: 2, name: 'Chiều', startTime: '13:30:00', endTime: '17:30:00' }
        ]);
        console.log('🌱 Seeded default shifts.');
      } else {
        // Tự động sửa lại nếu bị lỗi font do import sai encoding
        const morning = await Shift.findByPk(1);
        if (morning && morning.name !== 'Sáng') {
          morning.name = 'Sáng';
          await morning.save();
        }
        const afternoon = await Shift.findByPk(2);
        if (afternoon && afternoon.name !== 'Chiều') {
          afternoon.name = 'Chiều';
          await afternoon.save();
        }
      }

      // 2. Kiểm tra / Seeding chuyên khoa (Specialties)
      const specCount = await Specialty.count();
      if (specCount === 0) {
        await Specialty.bulkCreate([
          { id: 1, name: 'Nội khoa', description: 'Khám và điều trị các bệnh nội khoa tổng quát' },
          { id: 2, name: 'Ngoại khoa', description: 'Khám và điều trị các bệnh ngoại khoa' },
          { id: 3, name: 'Nhi khoa', description: 'Khám và điều trị cho trẻ em' }
        ]);
        console.log('🌱 Seeded default specialties.');
      } else {
        // Tự động sửa lại nếu bị lỗi font do import sai encoding
        const sp1 = await Specialty.findByPk(1);
        if (sp1 && sp1.name !== 'Nội khoa') {
          sp1.name = 'Nội khoa';
          await sp1.save();
        }
        const sp2 = await Specialty.findByPk(2);
        if (sp2 && sp2.name !== 'Ngoại khoa') {
          sp2.name = 'Ngoại khoa';
          await sp2.save();
        }
        const sp3 = await Specialty.findByPk(3);
        if (sp3 && sp3.name !== 'Nhi khoa') {
          sp3.name = 'Nhi khoa';
          await sp3.save();
        }
      }
    } catch (seedErr) {
      console.error('⚠️ Error checking/seeding database default records:', seedErr);
    }
  })
  .catch((err) => {
    console.error('❌ Model synchronization error:', err);
  });
 
// ==== Start server ====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
