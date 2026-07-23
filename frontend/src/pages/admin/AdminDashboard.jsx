import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import adminService from "../../services/adminService";

function AdminDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { adminService.getDashboard().then(res => setData(res.data)); }, []);

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Register Hostel", path: "/admin/hostels/register" },
    { label: "Rooms & Beds", path: "/admin/rooms" },
    { label: "Residents", path: "/admin/residents" },
    { label: "Requests & Complaints", path: "/admin/requests" },
    { label: "Mess & Notices", path: "/admin/mess-notices" }
  ];

  return (
    <Layout title="Admin Dashboard" menuItems={menu}>
      <style>{dashboardStyles}</style>
      {data ? (
        <>
          <div className="stats-grid">
            <Stat label="Hostels" val={data.hostelCount} />
            <Stat label="Residents" val={data.totalResidents} />
            <Stat label="Total Rooms" val={data.totalRooms} />
            <Stat label="Occupied Beds" val={data.occupiedBeds} />
            <Stat label="Available Beds" val={data.availableBeds} />
            <Stat label="Pending Complaints" val={data.pendingComplaints} />
            <Stat label="Fees Collected" val={`₹${data.feesCollected}`} />
          </div>
          
          {data.hostelCount === 1 && data.singleHostel ? (
            <div className="info-card">
              <h3>Default Hostel: {data.singleHostel.hostelName} ({data.singleHostel.hostelCode})</h3>
              <p>Type: {data.singleHostel.hostelType} | Fees: ₹{data.singleHostel.feeAmount}/{data.singleHostel.feeCycle}</p>
            </div>
          ) : data.hostelCount > 1 ? (
            <div className="info-card">
              <h3>Your Hostels</h3>
              <ul className="hostel-list">
                {data.hostels.map(h => <li key={h.hostelId}><b>{h.hostelName}</b> ({h.hostelCode}) - <span className={`badge-${h.status.toLowerCase()}`}>{h.status}</span></li>)}
              </ul>
            </div>
          ) : <p className="empty-state">No hostels registered yet. Please register a hostel.</p>}
        </>
      ) : <p className="loading-text">Loading dashboard...</p>}
    </Layout>
  );
}

function Stat({ label, val }) { 
  return (
    <div className="stat-card">
      <h4>{label}</h4>
      <p>{val}</p>
    </div>
  ); 
}

const dashboardStyles = `
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; margin-bottom: 30px; }
  .stat-card { background: #FFFFFF; border: 1px solid #A3B18A; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(52, 78, 65, 0.05); transition: transform 0.2s; }
  .stat-card:hover { transform: translateY(-3px); border-color: #588157; }
  .stat-card h4 { margin: 0; color: #588157; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-card p { margin: 10px 0 0; font-size: 26px; font-weight: 700; color: #344E41; }
  .info-card { background: #FFFFFF; border: 1px solid #A3B18A; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(52, 78, 65, 0.05); }
  .info-card h3 { margin-top: 0; color: #344E41; }
  .info-card p { color: #588157; font-size: 15px; }
  .hostel-list { list-style: none; padding: 0; margin: 15px 0 0; }
  .hostel-list li { padding: 10px 0; border-bottom: 1px solid #DAD7CD; color: #344E41; }
  .hostel-list li:last-child { border-bottom: none; }
  .empty-state, .loading-text { color: #588157; font-size: 16px; text-align: center; padding: 40px; background: #FFFFFF; border-radius: 12px; border: 1px dashed #A3B18A; }
  .badge-pending { background: #A3B18A; color: #344E41; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-approved { background: #3A5A40; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-rejected { background: #8B2E2E; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
`;

export default AdminDashboard;