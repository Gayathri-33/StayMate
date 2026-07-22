import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaDoorOpen,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaUserGraduate,
} from "react-icons/fa";

import authService from "../../services/authService";

function AdminSidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
    },
    {
      name: "Pending Residents",
      icon: <FaUsers />,
      path: "/admin/pending-residents",
    },
    {
      name: "Approved Residents",
      icon: <FaUsers />,
      path: "/admin/approved-residents",
    },
    {
      name: "Rooms",
      icon: <FaDoorOpen />,
      path: "/admin/rooms",
    },
    {
      name: "Fees",
      icon: <FaMoneyBillWave />,
      path: "/admin/fees",
    },
    {
      name: "Complaints",
      icon: <FaExclamationCircle />,
      path: "/admin/complaints",
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/admin/reports",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
    {
      name: "Pending Residents",
      icon: <FaUserGraduate />,
      path: "/admin/pending-residents",
    },
    {
      name: "Approved Residents",
      icon: <FaUsers />,
      path: "/admin/approved-residents",
    },
  ];

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#0f172a",
        color: "#fff",
        position: "fixed",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          padding: "25px",
          borderBottom: "1px solid #334155",
        }}
      >
        StayMate Admin
      </h2>

      {menus.map((menu) => (
        <Link
          key={menu.name}
          to={menu.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "15px 25px",
            color: "#fff",
            textDecoration: "none",
            background:
              location.pathname === menu.path ? "#2563eb" : "transparent",
          }}
        >
          {menu.icon}
          {menu.name}
          <li>
            <Link to="/admin/rooms">Rooms</Link>
          </li>

          <li>
            <Link to="/admin/rooms/add">Add Room</Link>
          </li>
          <li>
            <Link to="/admin/beds">Bed Management</Link>
          </li>
        </Link>
      ))}

      <button
        onClick={() => {
          authService.logout();
          window.location.href = "/login";
        }}
        style={{
          width: "90%",
          margin: "25px auto",
          display: "block",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#ef4444",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
