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
      <style>{sharedStyles}</style>
      <div className="page-header">
        <p>Raise and track your complaints to the hostel admin.</p>
        <button onClick={() => setShowForm(true)} className="staymate-btn-primary">+ Raise Complaint</button>
      </div>

      <table className="staymate-table">
        <thead>
          <tr>
            <th>Title</th><th>Description</th><th>Status</th><th>Raised On</th><th>Resolved On</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length === 0 ? <tr><td colSpan="5" className="empty-row">No complaints raised yet.</td></tr> :
          complaints.map(c => (
            <tr key={c.complaintId}>
              <td><b>{c.title}</b></td>
              <td>{c.description}</td>
              <td><span className={`badge-${c.status.toLowerCase()}`}>{c.status}</span></td>
              <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              <td>{c.resolvedAt ? new Date(c.resolvedAt).toLocaleDateString() : <span className="text-muted">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Raise a Complaint</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input placeholder="e.g. Water leakage in room" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="staymate-input" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Describe the issue in detail..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="staymate-input staymate-textarea" required />
              </div>
              <div className="modal-actions">
                <button type="submit" disabled={loading} className="staymate-btn-primary">{loading ? "Submitting..." : "Submit"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="staymate-btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

const sharedStyles = `
  .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px; }
  .page-header p { color: #588157; margin: 0; font-size: 15px; }
  .staymate-btn-primary { background-color: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-primary:hover { background-color: #344E41; }
  .staymate-btn-secondary { background-color: #A3B18A; color: #344E41; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-secondary:hover { background-color: #588157; color: #FFFFFF; }
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .staymate-input { width: 100%; padding: 10px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-textarea { min-height: 100px; resize: vertical; }
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(52, 78, 65, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(2px); }
  .modal-content { background: #FFFFFF; padding: 30px; border-radius: 12px; width: 500px; max-width: 90vw; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 1px solid #A3B18A; }
  .modal-content h3 { margin-top: 0; color: #344E41; margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 24px; }
  .modal-actions button { flex: 1; }
  .badge-resolved, .badge-approved, .badge-paid, .badge-active { background: #3A5A40; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-pending, .badge-pending_payment { background: #A3B18A; color: #344E41; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-rejected, .badge-blocked, .badge-overdue { background: #8B2E2E; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .text-muted { color: #588157; font-size: 12px; }
  @media (max-width: 768px) {
    .page-header { flex-direction: column; align-items: flex-start; }
    .staymate-table { display: block; overflow-x: auto; }
  }
`;

export default Complaints;