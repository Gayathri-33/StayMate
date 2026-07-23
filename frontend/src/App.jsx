import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

// Auth & Public
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminRegister from "./pages/AdminRegister";
import ResidentRegister from "./pages/ResidentRegister";

// SuperAdmin
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminManagement from "./pages/superadmin/AdminManagement";
import HostelManagement from "./pages/superadmin/HostelManagement";
import Notifications from "./pages/superadmin/Notifications";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import HostelRegistration from "./pages/admin/HostelRegistration";
import RoomsBeds from "./pages/admin/RoomBeds";
import ResidentManagement from "./pages/admin/ResidentManagement";
import ManageRequests from "./pages/admin/ManageRequests";

// Resident
import ResidentDashboard from "./pages/resident/ResidentDashboard";
import PaymentPage from "./pages/resident/PaymentPage";
import MessNotices from "./pages/admin/MessNotices";
import Complaints from "./pages/resident/Complaints";
import RoomShift from "./pages/resident/RoomShift";
import Feedback from "./pages/resident/Feedback";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/admin" element={<AdminRegister />} />
      <Route path="/register/resident" element={<ResidentRegister />} />

      {/* SuperAdmin Routes */}
      <Route
        path="/superadmin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/admins"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <AdminManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/hostels"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <HostelManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/notifications"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hostels/register"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <HostelRegistration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/mess-notices"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MessNotices />
          </ProtectedRoute>
        }
      />

      {/* Resident Routes */}
      <Route
        path="/resident/dashboard"
        element={
          <ProtectedRoute allowedRoles={["RESIDENT"]}>
            <ResidentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/rooms"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <RoomsBeds />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/residents"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ResidentManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/payment"
        element={
          <ProtectedRoute allowedRoles={["RESIDENT"]}>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/complaints"
        element={
          <ProtectedRoute allowedRoles={["RESIDENT"]}>
            <Complaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/shift"
        element={
          <ProtectedRoute allowedRoles={["RESIDENT"]}>
            <RoomShift />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/feedback"
        element={
          <ProtectedRoute allowedRoles={["RESIDENT"]}>
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/residents"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ResidentManagement />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App;
