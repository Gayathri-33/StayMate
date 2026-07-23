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
      <style>{feedbackStyles}</style>
      <div className="feedback-container">
        <p>We value your opinion. Please share your experience with the hostel.</p>

        {success && <div className="success-box">{success}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Rating</label>
          <div className="star-container">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, rating: n })}
                className={`star-btn ${form.rating >= n ? "active" : ""}`}
              >
                ★
              </button>
            ))}
          </div>

          <label className="form-label">Comments</label>
          <textarea
            placeholder="Tell us what you liked or what can be improved..."
            value={form.comments}
            onChange={e => setForm({ ...form, comments: e.target.value })}
            className="staymate-input staymate-textarea"
            required
          />

          <button type="submit" disabled={loading} className="staymate-btn-primary" style={{ width: "100%", marginTop: "20px", padding: "13px" }}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

const feedbackStyles = `
  .feedback-container { max-width: 500px; background: #FFFFFF; padding: 30px; border-radius: 12px; border: 1px solid #A3B18A; box-shadow: 0 4px 12px rgba(52, 78, 65, 0.05); }
  .feedback-container > p { color: #588157; margin-top: 0; margin-bottom: 20px; }
  .form-label { font-weight: 600; display: block; margin-bottom: 8px; color: #344E41; font-size: 14px; }
  .star-container { display: flex; gap: 8px; margin-bottom: 20px; }
  .star-btn { width: 50px; height: 50px; font-size: 22px; border: 2px solid #DAD7CD; background: #FFFFFF; border-radius: 8px; cursor: pointer; transition: all 0.2s; color: #DAD7CD; }
  .star-btn.active { border-color: #3A5A40; background: #A3B18A; color: #344E41; }
  .star-btn:hover { border-color: #588157; }
  .staymate-input { width: 100%; padding: 10px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-textarea { min-height: 120px; resize: vertical; }
  .staymate-btn-primary { background-color: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-primary:hover { background-color: #344E41; }
  .success-box { padding: 12px; background: #3A5A40; color: #FFFFFF; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-align: center; }
`;

export default Feedback;