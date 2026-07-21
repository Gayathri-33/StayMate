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

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await authService.login(loginData);

    authService.saveAuthData(
      response.data.token,
      response.data.user
    );

    navigate("/superadmin/dashboard");
  } catch (error) {
    alert(error.response?.data || "Invalid Credentials");
  }
};

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <FaUserShield size={60} color="#2563eb" />

          <h2>StayMate</h2>

          <p>Super Admin Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
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
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
