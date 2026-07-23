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

  useEffect(() => { fetchHostels(); }, [tab]);

  const handleAction = async (id, action) => {
    if (action === "approve") await superadminService.approveHostel(id);
    else await superadminService.rejectHostel(id);
    fetchHostels();
  };

  return (
    <Layout title="Hostel Management" menuItems={menu}>
      <style>{hostelStyles}</style>
      <div className="controls-bar">
        {["pending", "approved"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? "tab-btn active" : "tab-btn"}>
            {t}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="staymate-table">
          <thead>
            <tr>
              <th>Hostel Name</th><th>Code</th><th>Place</th><th>Type</th><th>Rooms</th><th>Fee</th><th>Admin</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.length === 0 ? (
              <tr><td colSpan="8" className="empty-row">No hostels found in this category.</td></tr>
            ) : (
              hostels.map(h => (
                <tr key={h.hostelId}>
                  <td><b>{h.hostelName}</b></td>
                  <td>{h.hostelCode || <span className="text-muted">Pending</span>}</td>
                  <td>{h.place}</td>
                  <td>{h.hostelType}</td>
                  <td>{h.totalRooms}</td>
                  <td>₹{h.feeAmount} / {h.feeCycle}</td>
                  <td>
                    {h.adminName} <br/>
                    <small className="text-muted">{h.adminEmail}</small>
                  </td>
                  <td>
                    {tab === "pending" && (
                      <>
                        <button onClick={() => handleAction(h.hostelId, "approve")} className="staymate-btn-sm success">Approve</button>
                        <button onClick={() => handleAction(h.hostelId, "reject")} className="staymate-btn-sm danger">Reject</button>
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

const hostelStyles = `
  .controls-bar { display: flex; gap: 10px; margin-bottom: 20px; }
  .tab-btn { padding: 8px 16px; background: #A3B18A; color: #344E41; border: none; border-radius: 6px; cursor: pointer; text-transform: uppercase; font-weight: normal; transition: all 0.2s; }
  .tab-btn.active { background: #3A5A40; color: #FFFFFF; font-weight: bold; }
  .tab-btn:hover:not(.active) { background: #588157; color: #FFFFFF; }
  .table-wrapper { overflow-x: auto; }
  .staymate-table { width: 100%; min-width: 800px; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .text-muted { color: #588157; font-size: 12px; }
  .staymate-btn-sm { padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; margin-right: 5px; }
  .staymate-btn-sm.success { background: #3A5A40; color: #FFFFFF; }
  .staymate-btn-sm.success:hover { background: #344E41; }
  .staymate-btn-sm.danger { background: #8B2E2E; color: #FFFFFF; }
  .staymate-btn-sm.danger:hover { background: #6B2222; }
`;

export default HostelManagement;