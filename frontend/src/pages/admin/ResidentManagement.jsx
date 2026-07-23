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
      <style>{residentMgmtStyles}</style>
      <div className="controls-bar">
        <div className="control-group">
          <label>Select Hostel:</label>
          <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} className="staymate-input">
            {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName} ({h.hostelCode})</option>)}
          </select>
        </div>
      </div>

      <table className="staymate-table">
        <thead>
          <tr>
            <th>Code</th><th>Name</th><th>Email</th><th>Room / Bed</th>
            <th>Status</th><th>Payment</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.length === 0 ? <tr><td colSpan="7" className="empty-row">No residents registered yet.</td></tr> : 
          residents.map(r => (
            <tr key={r.residentId}>
              <td><b>{r.residentCode}</b></td>
              <td>{r.fullName}</td>
              <td>{r.email}</td>
              <td>{r.roomNumber} / {r.bedNumber}</td>
              <td><span className={`badge-${r.status.toLowerCase()}`}>{r.status}</span></td>
              <td><span className={`badge-${r.paymentStatus.toLowerCase()}`}>{r.paymentStatus}</span></td>
              <td>
                {r.status === "BLOCKED" ? (
                  <button onClick={() => handleToggleBlock(r.residentId, true)} className="staymate-btn-sm success">Unblock</button>
                ) : (
                  <button onClick={() => handleToggleBlock(r.residentId, false)} className="staymate-btn-sm danger">Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

const residentMgmtStyles = `
  .controls-bar { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 25px; background: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #A3B18A; }
  .control-group { display: flex; align-items: center; gap: 10px; }
  .control-group label { font-weight: 600; color: #344E41; }
  .staymate-input { padding: 8px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; min-width: 250px; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; }
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .staymate-btn-sm { padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; }
  .staymate-btn-sm.success { background: #3A5A40; color: #FFFFFF; }
  .staymate-btn-sm.success:hover { background: #344E41; }
  .staymate-btn-sm.danger { background: #8B2E2E; color: #FFFFFF; }
  .staymate-btn-sm.danger:hover { background: #6B2222; }
  .badge-active, .badge-paid { background: #3A5A40; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-pending, .badge-pending_payment { background: #A3B18A; color: #344E41; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-blocked, .badge-overdue { background: #8B2E2E; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  @media (max-width: 768px) {
    .staymate-table { display: block; overflow-x: auto; }
  }
`;

export default ResidentManagement;