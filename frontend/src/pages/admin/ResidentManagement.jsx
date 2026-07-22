import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import adminService from "../../services/adminService";

function ResidentManagement() {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [residents, setResidents] = useState([]);
  
  const menu = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Register Hostel", path: "/admin/hostels/register" },
    { label: "Rooms & Beds", path: "/admin/rooms" },
    { label: "Residents", path: "/admin/residents" },
    { label: "Requests & Complaints", path: "/admin/requests" },
    { label: "Mess & Notices", path: "/admin/mess-notices" }
  ];

  useEffect(() => {
    adminService.getMyHostels().then(res => {
      setHostels(res.data);
      if (res.data.length > 0) setSelectedHostel(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedHostel) {
      adminService.getResidents(selectedHostel.hostelId).then(res => setResidents(res.data));
    }
  }, [selectedHostel]);

  const handleToggleBlock = async (id, isBlocked) => {
    if (isBlocked) await adminService.unblockResident(id);
    else await adminService.blockResident(id);
    adminService.getResidents(selectedHostel.hostelId).then(res => setResidents(res.data));
  };

  return (
    <Layout title="Resident Management" menuItems={menu}>
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
        <label style={{ fontWeight: "bold" }}>Select Hostel:</label>
        <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} style={inputStyle}>
          {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName} ({h.hostelCode})</option>)}
        </select>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={thStyle}>
            <th style={th}>Code</th><th style={th}>Name</th><th style={th}>Email</th><th style={th}>Room / Bed</th>
            <th style={th}>Status</th><th style={th}>Payment</th><th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.length === 0 ? <tr><td colSpan="7" style={{...td, textAlign:"center"}}>No residents registered yet.</td></tr> : 
          residents.map(r => (
            <tr key={r.residentId} style={trStyle}>
              <td style={td}><b>{r.residentCode}</b></td>
              <td style={td}>{r.fullName}</td>
              <td style={td}>{r.email}</td>
              <td style={td}>{r.roomNumber} / {r.bedNumber}</td>
              <td style={td}><span style={statusBadge(r.status)}>{r.status}</span></td>
              <td style={td}><span style={statusBadge(r.paymentStatus)}>{r.paymentStatus}</span></td>
              <td style={td}>
                {r.status === "BLOCKED" ? (
                  <button onClick={() => handleToggleBlock(r.residentId, true)} style={successBtn}>Unblock</button>
                ) : (
                  <button onClick={() => handleToggleBlock(r.residentId, false)} style={dangerBtn}>Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

// --- Shared Styles ---
const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "14px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "10px" };
const thStyle = { background: "#F1F5F9" };
const th = { padding: "12px", textAlign: "left", fontSize: "14px", color: "#475569" };
const td = { padding: "12px", fontSize: "14px", borderBottom: "1px solid #E2E8F0" };
const trStyle = {};
const successBtn = { padding: "6px 12px", background: "#10B981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const dangerBtn = { padding: "6px 12px", background: "#EF4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const statusBadge = (status) => ({
  padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold",
  background: status === "ACTIVE" || status === "PAID" ? "#D1FAE5" : 
              status === "PENDING" || status === "PENDING_PAYMENT" ? "#FEF3C7" : 
              status === "BLOCKED" || status === "OVERDUE" ? "#FEE2E2" : "#E2E8F0",
  color: status === "ACTIVE" || status === "PAID" ? "#065F46" : 
         status === "PENDING" || status === "PENDING_PAYMENT" ? "#92400E" : 
         status === "BLOCKED" || status === "OVERDUE" ? "#991B1B" : "#475569"
});

export default ResidentManagement;