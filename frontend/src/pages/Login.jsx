import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import authService from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(loginData);

      const user = response.data;

      authService.saveAuthData(user.token, user);

      if (user.role === "SUPER_ADMIN") {
        navigate("/superadmin/dashboard");
      } else if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        alert("Unauthorized User");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#EEF2FF",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <FaUserShield size={65} color="#2563EB" />

          <h2
            style={{
              marginTop: "10px",
              marginBottom: "5px",
            }}
          >
            StayMate
          </h2>

          <p style={{ color: "#666" }}>
            Hostel Management System
          </p>

          <h3 style={{ marginTop: "20px" }}>
            Login
          </h3>
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
              required
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: loading ? "#94A3B8" : "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

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

export default Login;