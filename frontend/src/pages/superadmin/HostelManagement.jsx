import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import superadminService from "../../services/superadminService";

function HostelManagement() {
  const [tab, setTab] = useState("pending");
  const [hostels, setHostels] = useState([]);
  
  const menu = [ 
    { label: "Dashboard", path: "/superadmin/dashboard" }, 
    { label: "Manage Admins", path: "/superadmin/admins" }, 
    { label: "Manage Hostels", path: "/superadmin/hostels" }, 
    { label: "Notifications", path: "/superadmin/notifications" } 
  ];

  const fetchHostels = () => {
    const fetchFn = tab === "pending" ? superadminService.getPendingHostels : superadminService.getApprovedHostels;
    fetchFn().then(res => setHostels(res.data));
  };

  useEffect(() => {
    fetchHostels();
  }, [tab]);

  const handleAction = async (id, action) => {
    if (action === "approve") await superadminService.approveHostel(id);
    else await superadminService.rejectHostel(id);
    
    // Refresh the list after action
    fetchHostels();
  };

  return (
    <Layout title="Hostel Management" menuItems={menu}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {["pending", "approved"].map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)} 
            style={{ 
              padding: "8px 16px", 
              background: tab === t ? "#2563EB" : "#E2E8F0", 
              color: tab === t ? "#fff" : "#000", 
              border: "none", 
              borderRadius: "6px", 
              cursor: "pointer", 
              textTransform: "uppercase",
              fontWeight: tab === t ? "bold" : "normal"
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
          <thead>
            <tr style={{ background: "#F1F5F9" }}>
              <th style={th}>Hostel Name</th>
              <th style={th}>Code</th>
              <th style={th}>Place</th>
              <th style={th}>Type</th>
              <th style={th}>Rooms</th>
              <th style={th}>Fee</th>
              <th style={th}>Admin</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.length === 0 ? (
              <tr><td colSpan="8" style={{ ...td, textAlign: "center", color: "#64748B" }}>No hostels found in this category.</td></tr>
            ) : (
              hostels.map(h => (
                <tr key={h.hostelId} style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <td style={td}><b>{h.hostelName}</b></td>
                  <td style={td}>{h.hostelCode || <span style={{color: "#94A3B8"}}>Pending</span>}</td>
                  <td style={td}>{h.place}</td>
                  <td style={td}>{h.hostelType}</td>
                  <td style={td}>{h.totalRooms}</td>
                  <td style={td}>₹{h.feeAmount} / {h.feeCycle}</td>
                  <td style={td}>
                    {h.adminName} <br/>
                    <small style={{ color: "#64748B" }}>{h.adminEmail}</small>
                  </td>
                  <td style={td}>
                    {tab === "pending" && (
                      <>
                        <button onClick={() => handleAction(h.hostelId, "approve")} style={{ background: "#10B981", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", marginRight: "5px", cursor: "pointer" }}>Approve</button>
                        <button onClick={() => handleAction(h.hostelId, "reject")} style={{ background: "#EF4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

const th = { padding: "12px", textAlign: "left", fontSize: "14px", color: "#475569" };
const td = { padding: "12px", fontSize: "14px" };

export default HostelManagement;