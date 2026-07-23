import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";

function ResidentDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { residentService.getDashboard().then(res => setData(res.data)).catch(err => console.error(err)); }, []);

  const menu = [
    { label: "Dashboard", path: "/resident/dashboard" },
    { label: "Make Payment", path: "/resident/payment" },
    { label: "Complaints", path: "/resident/complaints" },
    { label: "Room Shift", path: "/resident/shift" },
    { label: "Feedback", path: "/resident/feedback" }
  ];

  return (
    <Layout title="Resident Dashboard" menuItems={menu}>
      <style>{dashboardStyles}</style>
      {data ? (
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Hostel Details</h3>
            <p><b>Name:</b> {data.hostelName} ({data.hostelCode})</p>
            <p><b>Room:</b> {data.roomNumber} | <b>Bed:</b> {data.bedNumber}</p>
            <p><b>Resident ID:</b> {data.residentCode}</p>
          </div>
          <div className="dashboard-card">
            <h3>Payment Status</h3>
            <p><b>Status:</b> <span className={`badge-${data.paymentStatus.toLowerCase()}`}>{data.paymentStatus}</span></p>
            <p><b>Due Date:</b> {data.paymentDueDate}</p>
            {data.feeCycle === "YEARLY" && data.feeExpiryDate && <p><b>Expiry:</b> {data.feeExpiryDate}</p>}
            <p><b>Fee:</b> ₹{data.feeAmount} / {data.feeCycle}</p>
          </div>
        </div>
      ) : <p className="empty-row">Loading dashboard...</p>}
    </Layout>
  );
}

const dashboardStyles = `
  .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
  .dashboard-card { background: #FFFFFF; border: 1px solid #A3B18A; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(52, 78, 65, 0.05); }
  .dashboard-card h3 { margin-top: 0; color: #344E41; border-bottom: 2px solid #A3B18A; padding-bottom: 10px; margin-bottom: 15px; }
  .dashboard-card p { color: #344E41; margin: 8px 0; font-size: 15px; }
  .dashboard-card p b { color: #588157; }
  .badge-paid, .badge-active { background: #3A5A40; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-pending, .badge-pending_payment { background: #A3B18A; color: #344E41; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-overdue, .badge-blocked { background: #8B2E2E; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .empty-row { text-align: center; color: #588157; padding: 40px; background: #FFFFFF; border-radius: 12px; border: 1px dashed #A3B18A; }
`;

export default ResidentDashboard;