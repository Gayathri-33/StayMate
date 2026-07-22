import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";
import adminService from "../../services/adminService";

function RoomShift() {
  const [myRequests, setMyRequests] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ newRoomId: "", reasonLeaving: "", reasonWanted: "" });
  const [loading, setLoading] = useState(false);

  const menu = [
    { label: "Dashboard", path: "/resident/dashboard" },
    { label: "Make Payment", path: "/resident/payment" },
    { label: "Complaints", path: "/resident/complaints" },
    { label: "Room Shift", path: "/resident/shift" },
    { label: "Feedback", path: "/resident/feedback" }
  ];

  const refresh = () => {
    residentService.getMyRoomShiftRequests().then(res => setMyRequests(res.data));
  };

  useEffect(() => { refresh(); }, []);

  const openForm = async () => {
    // Load available rooms from the resident's hostel
    try {
      const dashRes = await residentService.getDashboard();
      const hostelCode = dashRes.data.hostelCode;
      const roomsRes = await adminService.getRooms(hostelCode);
      // Filter rooms that have at least 1 available bed
      setAvailableRooms(roomsRes.data.filter(r => r.availableBeds > 0));
      setShowForm(true);
    } catch {
      alert("Unable to load available rooms");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await residentService.requestRoomShift({
        newRoomId: parseInt(form.newRoomId),
        reasonLeaving: form.reasonLeaving,
        reasonWanted: form.reasonWanted
      });
      setForm({ newRoomId: "", reasonLeaving: "", reasonWanted: "" });
      setShowForm(false);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Room Shift Requests" menuItems={menu}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <p style={{ color: "#64748B", margin: 0 }}>Request a room change. Subject to admin approval and bed availability.</p>
        <button onClick={openForm} style={primaryBtn}>+ Request Shift</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={thStyle}>
            <th style={th}>Old Room</th><th style={th}>New Room</th><th style={th}>Reasons</th><th style={th}>Status</th><th style={th}>Requested On</th>
          </tr>
        </thead>
        <tbody>
          {myRequests.length === 0 ? <tr><td colSpan="5" style={{...td, textAlign:"center"}}>No room shift requests yet.</td></tr> :
          myRequests.map(r => (
            <tr key={r.id} style={trStyle}>
              <td style={td}>{r.oldRoomNumber}</td>
              <td style={td}>{r.newRoomNumber}</td>
              <td style={td}>
                <b>Leaving:</b> {r.reasonLeaving}<br/>
                <b>Wanted:</b> {r.reasonWanted}
              </td>
              <td style={td}><span style={statusBadge(r.status)}>{r.status}</span></td>
              <td style={td}>{new Date(r.requestedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Request Room Shift</h3>
            <form onSubmit={handleSubmit}>
              <label>Select New Room</label>
              <select value={form.newRoomId} onChange={e => setForm({...form, newRoomId: e.target.value})} style={inputStyle} required>
                <option value="">-- Choose a room --</option>
                {availableRooms.map(r => (
                  <option key={r.roomId} value={r.roomId}>
                    Room {r.roomNumber} ({r.availableBeds} bed(s) available)
                  </option>
                ))}
              </select>
              <label style={{marginTop:"10px", display:"block"}}>Why are you leaving your current room?</label>
              <textarea value={form.reasonLeaving} onChange={e => setForm({...form, reasonLeaving: e.target.value})} style={{...inputStyle, marginTop:"5px", minHeight:"70px"}} required />
              <label style={{marginTop:"10px", display:"block"}}>Why do you want the new room?</label>
              <textarea value={form.reasonWanted} onChange={e => setForm({...form, reasonWanted: e.target.value})} style={{...inputStyle, marginTop:"5px", minHeight:"70px"}} required />
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button type="submit" disabled={loading} style={primaryBtn}>{loading ? "Submitting..." : "Submit Request"}</button>
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
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "500px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" };
const statusBadge = (status) => ({
  padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold",
  background: status === "APPROVED" ? "#D1FAE5" : status === "REJECTED" ? "#FEE2E2" : "#FEF3C7",
  color: status === "APPROVED" ? "#065F46" : status === "REJECTED" ? "#991B1B" : "#92400E"
});

export default RoomShift;