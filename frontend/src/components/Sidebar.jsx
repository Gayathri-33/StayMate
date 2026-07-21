import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserTie,
  FaBuilding,
  FaBed,
  FaUserGraduate,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import authService from "../services/authService";

function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/superadmin/dashboard",
    },
    {
      name: "Manage Admins",
      icon: <FaUserTie />,
      path: "/superadmin/admins",
    },
    {
      name: "Hostels",
      icon: <FaBuilding />,
      path: "/superadmin/hostels",
    },
    {
      name: "Rooms",
      icon: <FaBed />,
      path: "/superadmin/rooms",
    },
    {
      name: "Students",
      icon: <FaUserGraduate />,
      path: "/superadmin/students",
    },
    {
      name: "Fees",
      icon: <FaMoneyBillWave />,
      path: "/superadmin/fees",
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/superadmin/reports",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/superadmin/settings",
    },
  ];

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1E293B",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          padding: "25px",
        }}
      >
        StayMate
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
            color: "white",
            textDecoration: "none",
            background:
              location.pathname === menu.path ? "#2563EB" : "transparent",
          }}
        >
          {menu.icon}
          {menu.name}
        </Link>
      ))}

      <button
        onClick={() => {
          authService.logout();
          window.location.href = "/login";
        }}
        style={{
          width: "90%",
          margin: "30px auto",
          display: "block",
          padding: "12px",
          border: "none",
          background: "#EF4444",
          color: "white",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        <FaSignOutAlt style={{ marginRight: "8px" }} />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;