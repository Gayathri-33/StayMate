import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", aadharNo: "", panNo: "",
    hostelAddress: "", password: "", confirmPassword: "", roomCount: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await authService.registerAdmin({ ...form, roomCount: Number(form.roomCount) });
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staymate-page">
      <style>{authStyles}</style>
      <div className="staymate-card">
        <h2 className="staymate-title">Register as Admin</h2>
        <p className="staymate-subtitle">Submit your details for Super Admin approval</p>

        <form onSubmit={handleSubmit}>
          <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <Field label="Aadhar Number" name="aadharNo" value={form.aadharNo} onChange={handleChange} />
          <Field label="PAN Number" name="panNo" value={form.panNo} onChange={handleChange} />
          <Field label="Hostel Address" name="hostelAddress" value={form.hostelAddress} onChange={handleChange} />
          <Field label="Proposed Room Count" name="roomCount" type="number" value={form.roomCount} onChange={handleChange} />
          <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

          {error && <p className="staymate-error">{error}</p>}
          {success && <p className="staymate-success">{success}</p>}

          <button type="submit" disabled={loading} className="staymate-btn-primary">
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>

        <p className="staymate-footer">
          Already approved? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="staymate-form-group">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="staymate-input" required />
    </div>
  );
}

const authStyles = `
  .staymate-page { min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #DAD7CD; padding: 40px 20px; }
  .staymate-card { width: 100%; max-width: 500px; background: #FFFFFF; padding: 40px; border-radius: 12px; border: 1px solid #A3B18A; box-shadow: 0 8px 20px rgba(52, 78, 65, 0.1); }
  .staymate-title { text-align: center; color: #344E41; margin-bottom: 5px; font-size: 24px; }
  .staymate-subtitle { text-align: center; color: #588157; margin-bottom: 25px; font-size: 15px; }
  .staymate-form-group { margin-bottom: 16px; }
  .staymate-form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .staymate-input { width: 100%; padding: 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 15px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-btn-primary { width: 100%; padding: 13px; background: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.2s; margin-top: 10px; }
  .staymate-btn-primary:hover:not(:disabled) { background: #344E41; }
  .staymate-btn-primary:disabled { background: #A3B18A; cursor: not-allowed; }
  .staymate-error { color: #8B2E2E; margin-bottom: 12px; text-align: center; font-weight: 600; background: #FEE2E2; padding: 8px; border-radius: 6px; }
  .staymate-success { color: #065F46; margin-bottom: 12px; text-align: center; font-weight: 600; background: #D1FAE5; padding: 8px; border-radius: 6px; }
  .staymate-footer { text-align: center; margin-top: 20px; font-size: 14px; color: #588157; }
  .staymate-footer a { color: #3A5A40; text-decoration: none; font-weight: 600; }
  .staymate-footer a:hover { text-decoration: underline; }
`;

export default AdminRegister;