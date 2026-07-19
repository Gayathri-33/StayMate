import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

import AdminDashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import AddStudent from "./pages/admin/AddStudent";
import EditStudent from "./pages/admin/EditStudent";
import Rooms from "./pages/admin/Rooms";
import AddRoom from "./pages/admin/AddRoom";
import Hostels from "./pages/admin/Hostels";
import Menu from "./pages/admin/Menu";
import Complaints from "./pages/admin/Complaints";
import Notices from "./pages/admin/Notices";
import Payments from "./pages/admin/Payments";

import StudentDashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import StudentMenu from "./pages/student/Menu";
import StudentComplaints from "./pages/student/Complaints";
import StudentPayments from "./pages/student/Payments";
import StudentNotices from "./pages/student/Notices";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />
      {/* Admin */}

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/add-student" element={<AddStudent />} />
      <Route path="/admin/edit-student/:id" element={<EditStudent />} />
      <Route path="/admin/rooms" element={<Rooms />} />
      <Route path="/admin/add-room" element={<AddRoom />} />
      <Route path="/admin/hostels" element={<Hostels />} />
      <Route path="/admin/menu" element={<Menu />} />
      <Route path="/admin/complaints" element={<Complaints />} />
      <Route path="/admin/notices" element={<Notices />} />
      <Route path="/admin/payments" element={<Payments />} />

      {/* Student */}

      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<Profile />} />
      <Route path="/student/menu" element={<StudentMenu />} />
      <Route path="/student/complaints" element={<StudentComplaints />} />
      <Route path="/student/payments" element={<StudentPayments />} />
      <Route path="/student/notices" element={<StudentNotices />} />

    </Routes>
  );
}

export default App;