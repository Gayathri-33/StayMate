import { Navigate, Route, Routes } from "react-router-dom";

// Public pages
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import AdminRegister from "./pages/Register/AdminRegister.jsx";
import ResidentRegister from "./pages/Register/ResidentRegister.jsx";
// Admin pages
import AdminWelcome from "./pages/Admin/AdminWelcome/AdminWelcome.jsx";
import CreateHostel from "./pages/Admin/CreateHostel/CreateHostel.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard.jsx";
import RoomAllocationRequests from "./pages/Admin/RoomAllocationRequests/RoomAllocationRequests.jsx";

// Resident pages shown before room allocation
import RoomAllocationRequest from "./pages/Resident/RoomAllocationRequest/RoomAllocationRequest.jsx";
import AllocationStatus from "./pages/Resident/AllocationStatus/AllocationStatus.jsx";

// Resident shared layout
import ResidentLayout from "./layouts/ResidentLayout/ResidentLayout.jsx";

// Resident dashboard pages
import ResidentDashboard from "./pages/Resident/ResidentDashboard/ResidentDashboard.jsx";
import ResidentMenu from "./pages/Resident/Menu/ResidentMenu.jsx";
import ResidentRoomDetails from "./pages/Resident/RoomDetails/ResidentRoomDetails.jsx";
import RoomShiftRequest from "./pages/Resident/RoomShiftRequest/RoomShiftRequest.jsx";
import ResidentComplaints from "./pages/Resident/Complaints/ResidentComplaints.jsx";
import HostelFeedback from "./pages/Resident/Feedback/HostelFeedback.jsx";
import ResidentProfile from "./pages/Resident/Profile/ResidentProfile.jsx";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Registration routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/register/admin" element={<AdminRegister />} />
      <Route path="/register/resident" element={<ResidentRegister />} />

      {/* Admin routes */}
      <Route path="/admin/welcome" element={<AdminWelcome />} />
      <Route path="/admin/create-hostel" element={<CreateHostel />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route
        path="/admin/room-allocation-requests"
        element={<RoomAllocationRequests />}
      />

      {/* Resident routes before room allocation */}
      <Route
        path="/resident/room-request"
        element={<RoomAllocationRequest />}
      />

      <Route
        path="/resident/allocation-status"
        element={<AllocationStatus />}
      />

      {/* Resident routes after room allocation */}
      <Route path="/resident" element={<ResidentLayout />}>
        {/* Opening /resident automatically opens the dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<ResidentDashboard />} />
        <Route path="menu" element={<ResidentMenu />} />

        {/* Fee module is paused for now */}
        <Route
          path="fees"
          element={<Navigate to="/resident/dashboard" replace />}
        />

        <Route path="room-details" element={<ResidentRoomDetails />} />
        <Route path="room-shift" element={<RoomShiftRequest />} />
        <Route path="complaints" element={<ResidentComplaints />} />
        <Route path="feedback" element={<HostelFeedback />} />
        <Route path="profile" element={<ResidentProfile />} />
      </Route>

      {/* Invalid URL fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;