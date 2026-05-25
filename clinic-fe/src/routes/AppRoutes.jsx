// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AboutPage from "../pages/public/AboutPage";
import ContactPage from "../pages/public/ContactPage";
import NewsPage from "../pages/public/NewsPage";
import GuidePage from "../pages/public/GuidePage";

// Layouts
import MainLayout from "../layouts/MainLayout";
import PatientLayout from "../layouts/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";

// Protected route component
import ProtectedRoute from "./ProtectedRoute";

// Patient pages
import PatientDashboard from "../pages/patient/PatientDashboard";
import ProfilePatient from "../pages/patient/Profile";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import MedicalRecordsPatient from "../pages/patient/MedicalRecords";
import ChatPatient from "../pages/patient/Chat";
import PrescriptionsPatient from "../pages/patient/Prescriptions";
import RatingsPatient from "../pages/patient/Ratings";
import PaymentsPatient from "../pages/patient/Payments"; // Thêm trang thanh toán

// Doctor pages
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import ProfileDoctor from "../pages/doctor/Profile";
import MySchedule from "../pages/doctor/MySchedule";
import DoctorAppointments from "../pages/doctor/DoctorAppointments";
import AppointmentDetail from "../pages/doctor/AppointmentDetail";
import MedicalRecordsDoctor from "../pages/doctor/MedicalRecords";
import ChatDoctor from "../pages/doctor/Chat";
import RatingsDoctor from "../pages/doctor/Ratings";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageDoctors from "../pages/admin/ManageDoctors";
import ManagePatients from "../pages/admin/ManagePatients";
import ManageSpecialties from "../pages/admin/ManageSpecialties";
import ManageServices from "../pages/admin/ManageServices";
import ManageSchedules from "../pages/admin/ManageSchedules";
import Notifications from "../pages/admin/Notifications";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
import PaymentsAdmin from "../pages/admin/Payments"; // Thêm trang quản lý hóa đơn

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes (dùng MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/guide" element={<GuidePage />} />
      </Route>

      {/* Patient routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute role="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="profile" element={<ProfilePatient />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="medical-records" element={<MedicalRecordsPatient />} />
        <Route path="chat/:id" element={<ChatPatient />} />
        <Route path="prescriptions" element={<PrescriptionsPatient />} />
        <Route path="ratings" element={<RatingsPatient />} />
        <Route path="payments" element={<PaymentsPatient />} /> {/* Thêm route thanh toán */}
      </Route>

      {/* Doctor routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="profile" element={<ProfileDoctor />} />
        <Route path="schedule" element={<MySchedule />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="appointments/:id" element={<AppointmentDetail />} />
        <Route path="medical-records" element={<MedicalRecordsDoctor />} />
        <Route path="chat" element={<ChatDoctor />} />
        <Route path="ratings" element={<RatingsDoctor />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="manage-doctors" element={<ManageDoctors />} />
        <Route path="manage-patients" element={<ManagePatients />} />
        <Route path="manage-specialties" element={<ManageSpecialties />} />
        <Route path="manage-services" element={<ManageServices />} />
        <Route path="manage-schedules" element={<ManageSchedules />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="payments" element={<PaymentsAdmin />} /> {/* Thêm route quản lý hóa đơn */}
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Nếu không khớp route nào, chuyển về trang chủ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
