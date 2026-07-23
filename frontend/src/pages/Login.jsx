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
    <div className="staymate-page">
      <style>{authStyles}</style>
      <div className="staymate-card">
        <div className="login-header">
          <FaUserShield size={60} color="#3A5A40" />
          <h2 className="staymate-title">StayMate</h2>
          <p className="staymate-subtitle">Login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="staymate-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="staymate-input"
            />
          </div>

          <div className="staymate-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="staymate-input"
            />
          </div>

          {error && <p className="staymate-error">{error}</p>}

          <button type="submit" disabled={loading} className="staymate-btn-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="staymate-footer">
          New here? <Link to="/">Go to registration options</Link>
        </p>
      </div>
    </div>
  );
}

const authStyles = `
  .staymate-page { min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #DAD7CD; padding: 40px 20px; }
  .staymate-card { width: 100%; max-width: 450px; background: #FFFFFF; padding: 40px; border-radius: 12px; border: 1px solid #A3B18A; box-shadow: 0 8px 20px rgba(52, 78, 65, 0.1); }
  .login-header { text-align: center; margin-bottom: 30px; }
  .staymate-title { color: #344E41; margin: 10px 0 5px; font-size: 24px; }
  .staymate-subtitle { color: #588157; margin: 0; font-size: 15px; }
  .staymate-form-group { margin-bottom: 18px; }
  .staymate-form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .staymate-input { width: 100%; padding: 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 15px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-btn-primary { width: 100%; padding: 13px; background: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.2s; }
  .staymate-btn-primary:hover:not(:disabled) { background: #344E41; }
  .staymate-btn-primary:disabled { background: #A3B18A; cursor: not-allowed; }
  .staymate-error { color: #8B2E2E; margin-bottom: 15px; text-align: center; font-weight: 600; background: #FEE2E2; padding: 8px; border-radius: 6px; }
  .staymate-footer { text-align: center; margin-top: 25px; font-size: 14px; color: #588157; }
  .staymate-footer a { color: #3A5A40; text-decoration: none; font-weight: 600; }
  .staymate-footer a:hover { text-decoration: underline; }
`;

export default Login;