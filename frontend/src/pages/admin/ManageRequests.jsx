import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import adminService from "../../services/adminService";

function ManageRequests() {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [tab, setTab] = useState("complaints");
  const [complaints, setComplaints] = useState([]);
  const [shifts, setShifts] = useState([]);
  
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
      if (tab === "complaints") {
        adminService.getComplaints(selectedHostel.hostelId).then(res => setComplaints(res.data));
      } else {
        adminService.getShiftRequests(selectedHostel.hostelId).then(res => setShifts(res.data));
      }
    }
  }, [selectedHostel, tab]);

  const handleResolve = async (id) => {
    await adminService.resolveComplaint(id);
    adminService.getComplaints(selectedHostel.hostelId).then(res => setComplaints(res.data));
  };

  const handleShiftAction = async (id, action) => {
    if (action === "approve") await adminService.approveShift(id);
    else await adminService.rejectShift(id);
    adminService.getShiftRequests(selectedHostel.hostelId).then(res => setShifts(res.data));
  };

  return (
    <Layout title="Requests & Complaints" menuItems={menu}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Select Hostel:</label>
          <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} style={inputStyle}>
            {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setTab("complaints")} style={tab === "complaints" ? primaryBtn : secondaryBtn}>Complaints</button>
          <button onClick={() => setTab("shifts")} style={tab === "shifts" ? primaryBtn : secondaryBtn}>Room Shifts</button>
        </div>
      </div>

      {tab === "complaints" ? (
        <table style={tableStyle}>
          <thead>
            <tr style={thStyle}>
              <th style={th}>Title</th><th style={th}>Description</th><th style={th}>Resident</th><th style={th}>Room</th><th style={th}>Status</th><th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? <tr><td colSpan="6" style={{...td, textAlign:"center"}}>No complaints found.</td></tr> : 
            complaints.map(c => (
              <tr key={c.complaintId} style={trStyle}>
                <td style={td}><b>{c.title}</b></td>
                <td style={td}>{c.description}</td>
                <td style={td}>{c.residentName} <br/><small style={{color:"#64748B"}}>{c.residentCode}</small></td>
                <td style={td}>{c.roomNumber}</td>
                <td style={td}><span style={statusBadge(c.status)}>{c.status}</span></td>
                <td style={td}>
                  {c.status === "PENDING" && <button onClick={() => handleResolve(c.complaintId)} style={successBtn}>Mark Resolved</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={thStyle}>
              <th style={th}>Resident</th><th style={th}>Old Room</th><th style={th}>New Room</th><th style={th}>Reasons</th><th style={th}>Status</th><th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.length === 0 ? <tr><td colSpan="6" style={{...td, textAlign:"center"}}>No shift requests found.</td></tr> : 
            shifts.map(s => (
              <tr key={s.id} style={trStyle}>
                <td style={td}>{s.residentName} <br/><small style={{color:"#64748B"}}>{s.residentCode}</small></td>
                <td style={td}>{s.oldRoomNumber}</td>
                <td style={td}>{s.newRoomNumber}</td>
                <td style={td}>
                  <b>Leaving:</b> {s.reasonLeaving}<br/>
                  <b>Wanted:</b> {s.reasonWanted}
                </td>
                <td style={td}><span style={statusBadge(s.status)}>{s.status}</span></td>
                <td style={td}>
                  {s.status === "PENDING" && (
                    <>
                      <button onClick={() => handleShiftAction(s.id, "approve")} style={successBtn}>Approve</button>
                      <button onClick={() => handleShiftAction(s.id, "reject")} style={dangerBtn}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
const primaryBtn = { padding: "8px 16px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };
const secondaryBtn = { padding: "8px 16px", background: "#F1F5F9", color: "#0F172A", border: "1px solid #CBD5E1", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };
const successBtn = { padding: "6px 12px", background: "#10B981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "5px", fontSize: "13px" };
const dangerBtn = { padding: "6px 12px", background: "#EF4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const statusBadge = (status) => ({
  padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold",
  background: status === "RESOLVED" || status === "APPROVED" ? "#D1FAE5" : 
              status === "PENDING" ? "#FEF3C7" : 
              status === "REJECTED" ? "#FEE2E2" : "#E2E8F0",
  color: status === "RESOLVED" || status === "APPROVED" ? "#065F46" : 
         status === "PENDING" ? "#92400E" : 
         status === "REJECTED" ? "#991B1B" : "#475569"
});

export default ManageRequests;