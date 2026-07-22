import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const menu = [
    { label: "Dashboard", path: "/resident/dashboard" },
    { label: "Make Payment", path: "/resident/payment" },
    { label: "Complaints", path: "/resident/complaints" },
    { label: "Room Shift", path: "/resident/shift" },
    { label: "Feedback", path: "/resident/feedback" }
  ];

  const refresh = () => {
    residentService.getMyComplaints().then(res => setComplaints(res.data));
  };

  useEffect(() => { refresh(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await residentService.raiseComplaint(form);
      setForm({ title: "", description: "" });
      setShowForm(false);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="My Complaints" menuItems={menu}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <p style={{ color: "#64748B", margin: 0 }}>Raise and track your complaints to the hostel admin.</p>
        <button onClick={() => setShowForm(true)} style={primaryBtn}>+ Raise Complaint</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={thStyle}>
            <th style={th}>Title</th><th style={th}>Description</th><th style={th}>Status</th><th style={th}>Raised On</th><th style={th}>Resolved On</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length === 0 ? <tr><td colSpan="5" style={{...td, textAlign:"center"}}>No complaints raised yet.</td></tr> :
          complaints.map(c => (
            <tr key={c.complaintId} style={trStyle}>
              <td style={td}><b>{c.title}</b></td>
              <td style={td}>{c.description}</td>
              <td style={td}><span style={statusBadge(c.status)}>{c.status}</span></td>
              <td style={td}>{new Date(c.createdAt).toLocaleDateString()}</td>
              <td style={td}>{c.resolvedAt ? new Date(c.resolvedAt).toLocaleDateString() : <span style={{color:"#94A3B8"}}>—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Raise a Complaint</h3>
            <form onSubmit={handleSubmit}>
              <input placeholder="Title (e.g. Water leakage in room)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} required />
              <textarea placeholder="Describe the issue in detail..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{...inputStyle, marginTop:"10px", minHeight:"100px"}} required />
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button type="submit" disabled={loading} style={primaryBtn}>{loading ? "Submitting..." : "Submit"}</button>
                <button type="button" onClick={() => setShowForm(false)} style={secondaryBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

// --- Shared Styles ---
const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "14px", width: "100%", boxSizing: "border-box" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "10px" };
const thStyle = { background: "#F1F5F9" };
const th = { padding: "12px", textAlign: "left", fontSize: "14px", color: "#475569" };
const td = { padding: "12px", fontSize: "14px", borderBottom: "1px solid #E2E8F0" };
const trStyle = {};
const primaryBtn = { padding: "8px 16px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };
const secondaryBtn = { padding: "8px 16px", background: "#F1F5F9", color: "#0F172A", border: "1px solid #CBD5E1", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "450px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" };
const statusBadge = (status) => ({
  padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold",
  background: status === "RESOLVED" ? "#D1FAE5" : "#FEF3C7",
  color: status === "RESOLVED" ? "#065F46" : "#92400E"
});

export default Complaints;