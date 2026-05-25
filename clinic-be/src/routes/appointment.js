const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
 
router.post('/', appointmentController.createAppointment);
 
// ✅ FIX BUG 2: Các route có đường dẫn CỐ ĐỊNH phải đặt TRƯỚC route động /:id
// Nếu để sau /:id, Express sẽ hiểu "completed-for-rating" là một ID và không bao giờ vào được route này
router.get('/mine', appointmentController.getMyAppointments);
router.get(
  '/completed-for-rating',
  authMiddleware,
  roleMiddleware('patient'),
  appointmentController.getCompletedAppointmentsForRating
);
router.get('/doctor/:doctorId', appointmentController.getDoctorAppointments);
 
// Route động /:id luôn đặt SAU các route cố định
router.get('/:id', appointmentController.getAppointmentById);
router.post('/:id/complete', appointmentController.completeAppointment);
router.patch('/:id/cancel', appointmentController.cancelAppointment);
router.patch('/:id/reschedule', appointmentController.rescheduleAppointment);
router.patch('/:id/status', appointmentController.updateAppointmentStatus);
 
module.exports = router;