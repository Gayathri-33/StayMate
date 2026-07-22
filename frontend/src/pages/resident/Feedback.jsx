import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";

function Feedback() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ rating: 5, comments: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const menu = [
    { label: "Dashboard", path: "/resident/dashboard" },
    { label: "Make Payment", path: "/resident/payment" },
    { label: "Complaints", path: "/resident/complaints" },
    { label: "Room Shift", path: "/resident/shift" },
    { label: "Feedback", path: "/resident/feedback" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      await residentService.submitFeedback(form);
      setSuccess("Thank you! Your feedback has been submitted.");
      setForm({ rating: 5, comments: "" });
      setTimeout(() => navigate("/resident/dashboard"), 1500);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Submit Feedback" menuItems={menu}>
      <div style={{ maxWidth: "500px" }}>
        <p style={{ color: "#64748B" }}>We value your opinion. Please share your experience with the hostel.</p>

        {success && <div style={successBox}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "10px" }}>Rating</label>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, rating: n })}
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "22px",
                  border: form.rating >= n ? "2px solid #F59E0B" : "2px solid #E2E8F0",
                  background: form.rating >= n ? "#FEF3C7" : "#fff",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                ★
              </button>
            ))}
          </div>

          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Comments</label>
          <textarea
            placeholder="Tell us what you liked or what can be improved..."
            value={form.comments}
            onChange={e => setForm({ ...form, comments: e.target.value })}
            style={{ ...inputStyle, minHeight: "120px" }}
            required
          />

          <button type="submit" disabled={loading} style={{ ...primaryBtn, width: "100%", marginTop: "20px", padding: "13px" }}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

// --- Shared Styles ---
const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "14px", width: "100%", boxSizing: "border-box" };
const primaryBtn = { padding: "8px 16px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };
const successBox = { padding: "12px", background: "#D1FAE5", color: "#065F46", borderRadius: "6px", marginBottom: "20px", fontWeight: "bold" };

export default Feedback;