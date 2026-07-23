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
      <style>{tableStyles}</style>
      <div className="controls-bar">
        <div className="control-group">
          <label>Select Hostel:</label>
          <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} className="staymate-input">
            {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName}</option>)}
          </select>
        </div>
        <div className="tabs">
          <button onClick={() => setTab("complaints")} className={tab === "complaints" ? "tab-btn active" : "tab-btn"}>Complaints</button>
          <button onClick={() => setTab("shifts")} className={tab === "shifts" ? "tab-btn active" : "tab-btn"}>Room Shifts</button>
        </div>
      </div>

      {tab === "complaints" ? (
        <table className="staymate-table">
          <thead>
            <tr>
              <th>Title</th><th>Description</th><th>Resident</th><th>Room</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? <tr><td colSpan="6" className="empty-row">No complaints found.</td></tr> : 
            complaints.map(c => (
              <tr key={c.complaintId}>
                <td><b>{c.title}</b></td>
                <td>{c.description}</td>
                <td>{c.residentName} <br/><small className="text-muted">{c.residentCode}</small></td>
                <td>{c.roomNumber}</td>
                <td><span className={`badge-${c.status.toLowerCase()}`}>{c.status}</span></td>
                <td>
                  {c.status === "PENDING" && <button onClick={() => handleResolve(c.complaintId)} className="staymate-btn-sm success">Mark Resolved</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="staymate-table">
          <thead>
            <tr>
              <th>Resident</th><th>Old Room</th><th>New Room</th><th>Reasons</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.length === 0 ? <tr><td colSpan="6" className="empty-row">No shift requests found.</td></tr> : 
            shifts.map(s => (
              <tr key={s.id}>
                <td>{s.residentName} <br/><small className="text-muted">{s.residentCode}</small></td>
                <td>{s.oldRoomNumber}</td>
                <td>{s.newRoomNumber}</td>
                <td>
                  <b>Leaving:</b> {s.reasonLeaving}<br/>
                  <b>Wanted:</b> {s.reasonWanted}
                </td>
                <td><span className={`badge-${s.status.toLowerCase()}`}>{s.status}</span></td>
                <td>
                  {s.status === "PENDING" && (
                    <>
                      <button onClick={() => handleShiftAction(s.id, "approve")} className="staymate-btn-sm success">Approve</button>
                      <button onClick={() => handleShiftAction(s.id, "reject")} className="staymate-btn-sm danger">Reject</button>
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

const tableStyles = `
  .controls-bar { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 25px; background: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #A3B18A; }
  .control-group { display: flex; align-items: center; gap: 10px; }
  .control-group label { font-weight: 600; color: #344E41; }
  .tabs { display: flex; gap: 10px; margin-left: auto; }
  .tab-btn { padding: 8px 20px; background: #A3B18A; color: #344E41; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
  .tab-btn.active { background: #3A5A40; color: #FFFFFF; }
  .tab-btn:hover:not(.active) { background: #588157; color: #FFFFFF; }
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
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
  .badge-pending { background: #A3B18A; color: #344E41; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-approved, .badge-resolved { background: #3A5A40; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-rejected { background: #8B2E2E; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .staymate-input { padding: 8px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; }
`;

export default ManageRequests;