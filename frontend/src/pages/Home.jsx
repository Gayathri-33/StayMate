import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUserTie, FaUserGraduate } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={card}>
        <FaUserShield size={60} color="#2563EB" />
        <h1 style={{ margin: "15px 0 5px" }}>StayMate</h1>
        <p style={{ color: "#666", marginBottom: "35px" }}>Hostel Management System</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <button style={primaryBtn} onClick={() => navigate("/login")}>
            Login
          </button>

          <button style={secondaryBtn} onClick={() => navigate("/register/admin")}>
            <FaUserTie style={{ marginRight: "8px" }} /> Register as Admin
          </button>

          <button style={secondaryBtn} onClick={() => navigate("/register/resident")}>
            <FaUserGraduate style={{ marginRight: "8px" }} /> Register as Resident
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Inline Styles ---
const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#EEF2FF",
};

const card = {
  width: "420px",
  background: "#fff",
  padding: "45px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  textAlign: "center",
};

const primaryBtn = {
  padding: "13px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "13px",
  background: "#F1F5F9",
  color: "#0F172A",
  border: "1px solid #CBD5E1",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Home;