import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

// Super Admin
import Dashboard from "./pages/superadmin/Dashboard";
import AdminList from "./pages/superadmin/AdminList";
import AddAdmin from "./pages/superadmin/AddAdmin";
import EditAdmin from "./pages/superadmin/EditAdmin";
import PendingHostels from "./pages/superadmin/PendingHostels";
import ApprovedHostels from "./pages/superadmin/ApprovedHostels";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import PendingResidents from "./pages/admin/PendingResidents";
import ApprovedResidents from "./pages/admin/ApprovedResidents";

// Hostel Owner
import HostelRegistration from "./pages/hostelowner/HostelRegistration";

// Route Protection
import PrivateRoute from "./routes/PrivateRoute";
import ResidentDetails from "./pages/admin/ResidentDetails";
import EditResident from "./pages/admin/EditResident";

import RoomList from "./pages/admin/RoomList";
import AddRoom from "./pages/admin/AddRoom";
import EditRoom from "./pages/admin/EditRoom";

import BedList from "./pages/admin/BedList";
import AddBed from "./pages/admin/AddBed";
import EditBed from "./pages/admin/EditBed";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Hostel Registration */}
        <Route path="/hostel/register" element={<HostelRegistration />} />

        {/* ================= SUPER ADMIN ================= */}

        <Route
          path="/superadmin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/superadmin/admins"
          element={
            <PrivateRoute>
              <AdminList />
            </PrivateRoute>
          }
        />

        <Route
          path="/superadmin/add-admin"
          element={
            <PrivateRoute>
              <AddAdmin />
            </PrivateRoute>
          }
        />

        <Route
          path="/superadmin/edit-admin/:id"
          element={
            <PrivateRoute>
              <EditAdmin />
            </PrivateRoute>
          }
        />

        <Route
          path="/superadmin/pending-hostels"
          element={
            <PrivateRoute>
              <PendingHostels />
            </PrivateRoute>
          }
        />

        <Route
          path="/superadmin/hostels"
          element={
            <PrivateRoute>
              <ApprovedHostels />
            </PrivateRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/pending-residents"
          element={
            <PrivateRoute>
              <PendingResidents />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/approved-residents"
          element={
            <PrivateRoute>
              <ApprovedResidents />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/resident/:id"
          element={
            <PrivateRoute>
              <ResidentDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/edit-resident/:id"
          element={
            <PrivateRoute>
              <EditResident />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/rooms"
          element={
            <PrivateRoute>
              <RoomList />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/rooms/add"
          element={
            <PrivateRoute>
              <AddRoom />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/rooms/edit/:id"
          element={
            <PrivateRoute>
              <EditRoom />
            </PrivateRoute>
          }
        />
        <Route path="/admin/beds" element={<BedList />} />

        <Route path="/admin/beds/add" element={<AddBed />} />

        <Route path="/admin/beds/edit/:id" element={<EditBed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
