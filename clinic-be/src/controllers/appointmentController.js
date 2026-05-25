const { Appointment, Schedule, Doctor, Shift, Service, User, Patient } = require('../models');
const { Op } = require('sequelize');

exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, scheduleId, date, shiftId, serviceIds, note } = req.body;

    // 1. Kiểm tra ca làm việc tồn tại
    const schedule = await Schedule.findByPk(scheduleId);
    if (!schedule)
      return res.status(404).json({ message: "Không tìm thấy ca làm việc!" });

    // Lấy đúng hồ sơ bệnh nhân từ userId (patientId từ frontend truyền về là userId)
    const patientRecord = await Patient.findOne({ where: { userId: patientId } });
    if (!patientRecord) {
      return res.status(404).json({ message: "Không tìm thấy hồ sơ bệnh nhân cho tài khoản này!" });
    }
    const realPatientId = patientRecord.id;

    // 2. Đếm số lịch đã đặt cho ca này (loại trừ các lịch đã hủy)
    const booked = await Appointment.count({
      where: {
        scheduleId,
        date,
        status: { [Op.ne]: 'cancelled' }
      }
    });
    if (booked >= schedule.maxPatients)
      return res.status(400).json({ message: "Ca này đã đủ số slot!" });

    // 3. Kiểm tra trùng lịch (loại trừ các lịch đã hủy)
    const exist = await Appointment.findOne({
      where: {
        patientId: realPatientId,
        scheduleId,
        date,
        status: { [Op.ne]: 'cancelled' }
      }
    });
    if (exist)
      return res.status(400).json({ message: "Bạn đã đặt ca này rồi!" });

    // 4. Kiểm tra trùng giờ (loại trừ các lịch đã hủy)
    const duplicate = await Appointment.findOne({
      where: {
        patientId: realPatientId,
        date,
        shiftId,
        status: { [Op.ne]: 'cancelled' }
      }
    });
    if (duplicate)
      return res.status(400).json({ message: "Bạn đã đặt một ca khác cùng thời gian!" });

    // 5. Tạo lịch hẹn
    const appointment = await Appointment.create({
      patientId: realPatientId,
      doctorId,
      scheduleId,
      date,
      shiftId,
      serviceIds,
      note,
      status: "pending"
    });

    // 6. Trả về thông tin chi tiết (bao gồm bác sĩ, ca, bệnh nhân, dịch vụ)
    const detail = await Appointment.findByPk(appointment.id, {
      include: [
        { model: Doctor, as: 'doctor', attributes: ['id', 'fullName'] },
        { model: Schedule, as: 'schedule', attributes: ['id', 'date', 'maxPatients'] },
        { model: Shift, as: 'shift', attributes: ['id', 'name', 'startTime', 'endTime'] },
        { model: Patient, as: 'patient', attributes: ['id', 'fullName'] },
      ]
    });

    res.status(201).json({ message: "Đặt lịch thành công!", appointment: detail });
  } catch (err) {
    res.status(500).json({ message: "Lỗi đặt lịch!", error: err.message });
  }
};

// GET /api/appointments/mine?patientId=1
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.query.patientId;
    if (!userId) return res.status(400).json({ message: "Thiếu patientId" });

    const patientRecord = await Patient.findOne({ where: { userId } });
    if (!patientRecord) return res.json([]);

    const appointments = await Appointment.findAll({
      where: { patientId: patientRecord.id },
      order: [['date', 'DESC']],
      include: [
        { model: Doctor, as: 'doctor', attributes: ['id', 'fullName'] },
        { model: Shift, as: 'shift', attributes: ['id', 'name', 'startTime', 'endTime'] },
        { model: Schedule, as: 'schedule', attributes: ['id', 'maxPatients'] }
      ]
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy lịch đã đặt!", error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: "Không tìm thấy lịch hẹn!" });

    if (appointment.status === 'done' || appointment.status === 'cancelled') {
      return res.status(400).json({ message: "Lịch đã hoàn thành hoặc đã hủy!" });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: "Hủy lịch thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi hủy lịch!", error: err.message });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { newScheduleId, newDate, newShiftId } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: "Không tìm thấy lịch hẹn!" });

    if (appointment.status === 'done' || appointment.status === 'cancelled') {
      return res.status(400).json({ message: "Không thể đổi lịch đã hoàn thành/hủy!" });
    }

    const newSchedule = await Schedule.findByPk(newScheduleId);
    if (!newSchedule) return res.status(404).json({ message: "Không tìm thấy ca làm việc mới!" });

    const booked = await Appointment.count({
      where: {
        scheduleId: newScheduleId,
        date: newDate,
        status: { [Op.ne]: 'cancelled' }
      }
    });
    if (booked >= newSchedule.maxPatients)
      return res.status(400).json({ message: "Ca mới đã hết slot!" });

    const duplicate = await Appointment.findOne({
      where: {
        patientId: appointment.patientId,
        date: newDate,
        shiftId: newShiftId,
        id: { [Op.ne]: id },
        status: { [Op.ne]: 'cancelled' }
      }
    });
    if (duplicate)
      return res.status(400).json({ message: "Bạn đã có lịch trùng giờ khác!" });

    appointment.scheduleId = newScheduleId;
    appointment.date = newDate;
    appointment.shiftId = newShiftId;
    appointment.status = "pending";
    await appointment.save();

    res.json({ message: "Đổi lịch thành công!", appointment });
  } catch (err) {
    res.status(500).json({ message: "Lỗi đổi lịch!", error: err.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: "Không tìm thấy lịch hẹn!" });

    const validStatuses = ['pending', 'confirmed', 'done', 'cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: "Trạng thái không hợp lệ!" });

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Cập nhật trạng thái thành công!", appointment });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật trạng thái!", error: err.message });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    const where = { doctorId };
    if (date) where.date = date;

    const appointments = await Appointment.findAll({
      where,
      order: [['date', 'ASC'], ['shiftId', 'ASC']],
      include: [
        {
          model: Patient,
          as: 'patient', // lấy thông tin patient
          attributes: ['id', 'fullName', 'email', 'phone'],
        },
        {
          model: Shift,
          as: 'shift',
          attributes: ['id', 'name', 'startTime', 'endTime'],
        },
        {
          model: Schedule,
          as: 'schedule',
          attributes: ['id'],
        }
      ]
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy lịch làm việc bác sĩ!", error: err.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: Patient, as: 'patient', attributes: ['fullName'] },
        { model: Doctor, as: 'doctor', attributes: ['fullName'] },
        { model: Shift, as: 'shift', attributes: ['name', 'startTime', 'endTime'] },
        { model: Schedule, as: 'schedule', attributes: ['date'] },
      ]
    });
    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn!" });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy chi tiết lịch hẹn!", error: err.message });
  }
};

// controllers/appointmentController.js

exports.completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { diagnosis, prescription } = req.body;
    // Tìm lịch hẹn
    const appointment = await Appointment.findByPk(id);
    if (!appointment)
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn!" });

    // Cập nhật thông tin
    appointment.diagnosis = diagnosis;
    appointment.prescription = prescription;
    appointment.status = "done";
    await appointment.save();

    res.json({ message: "Cập nhật thành công", appointment });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật!", error: err.message });
  }
};

// Lấy các lịch khám đã hoàn tất, chưa đánh giá (cho bệnh nhân đánh giá bác sĩ)

exports.getCompletedAppointmentsForRating = async (req, res) => {
  try {
    const user = req.userInfo;

    const patientRecord = await Patient.findOne({ where: { userId: user.id } });
    if (!patientRecord) return res.json([]);

    const completed = await Appointment.findAll({
      where: {
        patientId: patientRecord.id,
        status: 'completed'
      },
      include: [
        {
          model: Doctor,
          as: 'doctor',
          include: [{ model: User, as: 'user', attributes: ['fullName'] }]
        }
      ],
      order: [['date', 'DESC']]
    });

    const rated = await Rating.findAll({ where: { patientId: patientRecord.id } });
    const ratedIds = rated.map(r => r.appointmentId);
    const filtered = completed.filter(appt => !ratedIds.includes(appt.id));

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy lịch khám đã hoàn thành', error: err.message });
  }
};

