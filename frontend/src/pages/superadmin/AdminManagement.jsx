import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import superadminService from "../../services/superadminService";

function AdminManagement() {
  const [tab, setTab] = useState("pending");
  const [admins, setAdmins] = useState([]);

  const menu = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Manage Admins", path: "/superadmin/admins" },
    { label: "Manage Hostels", path: "/superadmin/hostels" },
    { label: "Notifications", path: "/superadmin/notifications" },
  ];

  const fetchAdmins = () => {
    const fetchFn = tab === "pending" ? superadminService.getPendingAdmins 
                  : tab === "approved" ? superadminService.getApprovedAdmins 
                  : superadminService.getRejectedAdmins;
    fetchFn().then(res => setAdmins(res.data));
  };

  useEffect(() => { fetchAdmins(); }, [tab]);

  const handleAction = async (id, action) => {
    setAdmins(admins.filter(a => a.userId !== id));
    try {
      if (action === "approve") await superadminService.approveAdmin(id);
      else if (action === "reject") await superadminService.rejectAdmin(id);
      else if (action === "pending") await superadminService.updateAdminStatus(id, "PENDING");
    } catch {
      alert("Action failed. Refreshing list...");
      fetchAdmins();
    }
  };

  return (
    <Layout title="Admin Management" menuItems={menu}>
      <style>{adminStyles}</style>
      <div className="controls-bar">
        {["pending", "approved", "rejected"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? "tab-btn active" : "tab-btn"}>
            {t}
          </button>
        ))}
      </div>

      <table className="staymate-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Aadhar</th><th>PAN</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr><td colSpan="6" className="empty-row">No admins found in this category.</td></tr>
          ) : admins.map(a => (
            <tr key={a.userId}>
              <td><b>{a.fullName}</b></td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>{a.aadharNo}</td>
              <td>{a.panNo}</td>
              <td>
                {tab === "pending" && (
                  <>
                    <button onClick={() => handleAction(a.userId, "approve")} className="staymate-btn-sm success">Approve</button>
                    <button onClick={() => handleAction(a.userId, "reject")} className="staymate-btn-sm danger">Reject</button>
                  </>
                )}
                {tab === "approved" && (
                  <>
                    <button onClick={() => handleAction(a.userId, "reject")} className="staymate-btn-sm danger">Reject</button>
                    <button onClick={() => handleAction(a.userId, "pending")} className="staymate-btn-sm warning">Revert to Pending</button>
                  </>
                )}
                {tab === "rejected" && (
                  <>
                    <button onClick={() => handleAction(a.userId, "approve")} className="staymate-btn-sm success">Approve</button>
                    <button onClick={() => handleAction(a.userId, "pending")} className="staymate-btn-sm warning">Revert to Pending</button>
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

const adminStyles = `
  .controls-bar { display: flex; gap: 10px; margin-bottom: 20px; }
  .tab-btn { padding: 8px 16px; background: #A3B18A; color: #344E41; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; font-weight: normal; transition: all 0.2s; }
  .tab-btn.active { background: #3A5A40; color: #FFFFFF; font-weight: bold; }
  .tab-btn:hover:not(.active) { background: #588157; color: #FFFFFF; }
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .staymate-btn-sm { padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; margin-right: 5px; }
  .staymate-btn-sm.success { background: #3A5A40; color: #FFFFFF; }
  .staymate-btn-sm.success:hover { background: #344E41; }
  .staymate-btn-sm.danger { background: #8B2E2E; color: #FFFFFF; }
  .staymate-btn-sm.danger:hover { background: #6B2222; }
  .staymate-btn-sm.warning { background: #588157; color: #FFFFFF; }
  .staymate-btn-sm.warning:hover { background: #3A5A40; }
`;

export default AdminManagement;