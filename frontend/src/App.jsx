import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/superadmin/Dashboard";
import AdminList from "./pages/superadmin/AdminList";
import AddAdmin from "./pages/superadmin/AddAdmin";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;