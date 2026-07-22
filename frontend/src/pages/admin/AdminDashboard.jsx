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
      {data ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", marginBottom: "30px" }}>
            <Stat label="Hostels" val={data.hostelCount} />
            <Stat label="Residents" val={data.totalResidents} />
            <Stat label="Total Rooms" val={data.totalRooms} />
            <Stat label="Occupied Beds" val={data.occupiedBeds} />
            <Stat label="Available Beds" val={data.availableBeds} />
            <Stat label="Pending Complaints" val={data.pendingComplaints} />
            <Stat label="Fees Collected" val={`₹${data.feesCollected}`} />
          </div>
          
          {data.hostelCount === 1 && data.singleHostel ? (
            <div style={{ padding: "20px", background: "#F8FAFC", borderRadius: "8px" }}>
              <h3>Default Hostel: {data.singleHostel.hostelName} ({data.singleHostel.hostelCode})</h3>
              <p>Type: {data.singleHostel.hostelType} | Fees: ₹{data.singleHostel.feeAmount}/{data.singleHostel.feeCycle}</p>
            </div>
          ) : data.hostelCount > 1 ? (
            <div>
              <h3>Your Hostels</h3>
              <ul>{data.hostels.map(h => <li key={h.hostelId}><b>{h.hostelName}</b> ({h.hostelCode}) - {h.status}</li>)}</ul>
            </div>
          ) : <p>No hostels registered yet. Please register a hostel.</p>}
        </>
      ) : <p>Loading...</p>}
    </Layout>
  );
}
function Stat({ label, val }) { return <div style={{ background: "#F1F5F9", padding: "15px", borderRadius: "8px", textAlign: "center" }}><h4 style={{margin:0, color:"#64748B"}}>{label}</h4><p style={{margin:"5px 0 0", fontSize:"24px", fontWeight:"bold"}}>{val}</p></div>; }
export default AdminDashboard;