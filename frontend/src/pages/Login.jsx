import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import authService from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(loginData);
      const data = response.data;

      authService.saveAuthData(data.token, data);

      if (data.role === "SUPER_ADMIN") {
        navigate("/superadmin/dashboard");
      } else if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.role === "RESIDENT") {
        navigate("/resident/dashboard");
      } else {
        setError("Unrecognized role");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <FaUserShield size={60} color="#2563EB" />
          <h2 style={{ marginTop: "10px", marginBottom: "5px" }}>StayMate</h2>
          <p style={{ color: "#666" }}>Login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              style={inputStyle}
            />
          </div>

          {error && <p style={{ color: "#DC2626", marginBottom: "15px" }}>{error}</p>}

          <button type="submit" disabled={loading} style={submitBtn(loading)}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "25px", fontSize: "14px" }}>
          New here? <Link to="/">Go to registration options</Link>
        </p>
      </div>
    </div>
  );
}

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
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "1px solid #CBD5E1",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

const submitBtn = (loading) => ({
  width: "100%",
  padding: "13px",
  background: loading ? "#94A3B8" : "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: loading ? "not-allowed" : "pointer",
  fontSize: "16px",
  fontWeight: "bold",
});

export default Login;