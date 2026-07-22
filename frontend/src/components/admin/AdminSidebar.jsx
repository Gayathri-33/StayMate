import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaDoorOpen,
  FaBed,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import authService from "../../services/authService";

function AdminSidebar() {
  const location = useLocation();

  const menus = [
    {
      id: 1,
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
    },
    {
      id: 2,
      name: "Pending Residents",
      icon: <FaUsers />,
      path: "/admin/pending-residents",
    },
    {
      id: 3,
      name: "Approved Residents",
      icon: <FaUsers />,
      path: "/admin/approved-residents",
    },
    {
      id: 4,
      name: "Rooms",
      icon: <FaDoorOpen />,
      path: "/admin/rooms",
    },
    {
      id: 5,
      name: "Add Room",
      icon: <FaDoorOpen />,
      path: "/admin/rooms/add",
    },
    {
      id: 6,
      name: "Bed Management",
      icon: <FaBed />,
      path: "/admin/beds",
    },
    {
      id: 7,
      name: "Fees",
      icon: <FaMoneyBillWave />,
      path: "/admin/fees",
    },
    {
      id: 8,
      name: "Complaints",
      icon: <FaExclamationCircle />,
      path: "/admin/complaints",
    },
    {
      id: 9,
      name: "Reports",
      icon: <FaChartBar />,
      path: "/admin/reports",
    },
    {
      id: 10,
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
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
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          padding: "25px",
          borderBottom: "1px solid #334155",
          margin: 0,
        }}
      >
        StayMate Admin
      </h2>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {menus.map((menu) => (
          <Link
            key={menu.id}
            to={menu.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px 25px",
              color: "#fff",
              textDecoration: "none",
              background:
                location.pathname === menu.path
                  ? "#2563eb"
                  : "transparent",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== menu.path) {
                e.currentTarget.style.background = "#1e293b";
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== menu.path) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <span style={{ fontSize: "18px" }}>{menu.icon}</span>
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>

      <button
        onClick={() => {
          authService.logout();
          window.location.href = "/login";
        }}
        style={{
          margin: "20px",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#ef4444",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        <FaSignOutAlt style={{ marginRight: "10px" }} />
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;