import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary Login
    if (email === "admin@gmail.com" && password === "admin") {
      login({
        name: "Administrator",
        role: "ADMIN",
      });

      navigate("/admin/dashboard");
    } else if (email === "student@gmail.com" && password === "student") {
      login({
        name: "Student",
        role: "STUDENT",
      });

      navigate("/student/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px gray",
        }}
      >
        <h2 style={{ textAlign: "center" }}>StayMate Login</h2>

        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#1976d2",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p>
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
