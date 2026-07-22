import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    aadharNo: "",
    panNo: "",
    hostelAddress: "",
    password: "",
    confirmPassword: "",
    roomCount: "",
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
      // Convert roomCount to a Number before sending to the backend
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
    <div style={page}>
      <div style={card}>
        <h2 style={{ textAlign: "center", marginBottom: "5px" }}>Register as Admin</h2>
        <p style={{ color: "#666", textAlign: "center", marginBottom: "25px" }}>
          Submit your details for Super Admin approval
        </p>

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

          {error && <p style={{ color: "#DC2626", marginBottom: "12px", textAlign: "center" }}>{error}</p>}
          {success && <p style={{ color: "#16A34A", marginBottom: "12px", textAlign: "center" }}>{success}</p>}

          <button type="submit" disabled={loading} style={submitBtn(loading)}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          Already approved? <Link to="/login" style={{ color: "#2563EB", textDecoration: "none" }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

// Reusable Form Field Component
function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ fontSize: "14px", fontWeight: "500", color: "#334155" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
        required
      />
    </div>
  );
}

// --- Inline Styles ---
const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#EEF2FF",
  padding: "40px 0",
};

const card = {
  width: "480px",
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
  marginTop: "10px",
});

export default AdminRegister;