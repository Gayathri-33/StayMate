import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { FaSignOutAlt } from "react-icons/fa";

function Layout({ title, children, menuItems }) {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div style={container}>
      <aside style={sidebar}>
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "5px" }}>StayMate</h2>
        <p style={{ color: "#CBD5E1", textAlign: "center", marginBottom: "30px", fontSize: "13px" }}>
          {user?.fullName} <br />
          <small style={{ color: "#94A3B8" }}>{user?.role?.replace('_', ' ')}</small>
        </p>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {menuItems.map((item, idx) => (
            <button key={idx} style={menuBtn} onClick={() => navigate(item.path)}>
              {item.label}
            </button>
          ))}
          <button style={{ ...menuBtn, background: "#DC2626", marginTop: "20px" }} onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
          </button>
        </nav>
      </aside>
      <main style={mainContent}>
        <h1 style={{ marginBottom: "20px", color: "#1E293B" }}>{title}</h1>
        <div style={contentBox}>{children}</div>
      </main>
    </div>
  );
}

const container = { display: "flex", minHeight: "100vh", background: "#F8FAFC" };
const sidebar = { width: "250px", background: "#1E293B", padding: "20px", color: "#fff" };
const menuBtn = { padding: "12px", background: "#334155", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", textAlign: "left", fontSize: "15px" };
const mainContent = { flex: 1, padding: "30px" };
const contentBox = { background: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" };

export default Layout;