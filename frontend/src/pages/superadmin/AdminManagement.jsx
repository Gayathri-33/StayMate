import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import superadminService from "../../services/superadminService";

function AdminManagement() {
  const [tab, setTab] = useState("pending");
  const [admins, setAdmins] = useState([]);
  const menu = [ { label: "Dashboard", path: "/superadmin/dashboard" }, { label: "Manage Admins", path: "/superadmin/admins" }, { label: "Manage Hostels", path: "/superadmin/hostels" }, { label: "Notifications", path: "/superadmin/notifications" } ];

  useEffect(() => {
    const fetchFn = tab === "pending" ? superadminService.getPendingAdmins : tab === "approved" ? superadminService.getApprovedAdmins : superadminService.getRejectedAdmins;
    fetchFn().then(res => setAdmins(res.data));
  }, [tab]);

  const handleAction = async (id, action) => {
    if (action === "approve") await superadminService.approveAdmin(id);
    else await superadminService.rejectAdmin(id);
    setTab(tab); // refresh
  };

  return (
    <Layout title="Admin Management" menuItems={menu}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {["pending", "approved", "rejected"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", background: tab === t ? "#2563EB" : "#E2E8F0", color: tab === t ? "#fff" : "#000", border: "none", borderRadius: "6px", cursor: "pointer" }}>{t.toUpperCase()}</button>
        ))}
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr style={{ background: "#F1F5F9" }}><th style={th}>Name</th><th style={th}>Email</th><th style={th}>Phone</th><th style={th}>Aadhar</th><th style={th}>PAN</th><th style={th}>Actions</th></tr></thead>
        <tbody>
          {admins.map(a => (
            <tr key={a.userId} style={{ borderBottom: "1px solid #E2E8F0" }}>
              <td style={td}>{a.fullName}</td><td style={td}>{a.email}</td><td style={td}>{a.phone}</td>
              <td style={td}>{a.aadharNo}</td><td style={td}>{a.panNo}</td>
              <td style={td}>
                {tab === "pending" && (
                  <>
                    <button onClick={() => handleAction(a.userId, "approve")} style={{ background: "#10B981", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", marginRight: "5px", cursor: "pointer" }}>Approve</button>
                    <button onClick={() => handleAction(a.userId, "reject")} style={{ background: "#EF4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
const th = { padding: "12px", textAlign: "left" };
const td = { padding: "12px" };
export default AdminManagement;