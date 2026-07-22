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
      {data ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={card}>
            <h3>Hostel Details</h3>
            <p><b>Name:</b> {data.hostelName} ({data.hostelCode})</p>
            <p><b>Room:</b> {data.roomNumber} | <b>Bed:</b> {data.bedNumber}</p>
            <p><b>Resident ID:</b> {data.residentCode}</p>
          </div>
          <div style={card}>
            <h3>Payment Status</h3>
            <p><b>Status:</b> <span style={{ color: data.paymentStatus === "PAID" ? "#10B981" : "#EF4444" }}>{data.paymentStatus}</span></p>
            <p><b>Due Date:</b> {data.paymentDueDate}</p>
            {data.feeCycle === "YEARLY" && data.feeExpiryDate && <p><b>Expiry:</b> {data.feeExpiryDate}</p>}
            <p><b>Fee:</b> ₹{data.feeAmount} / {data.feeCycle}</p>
          </div>
        </div>
      ) : <p>Loading...</p>}
    </Layout>
  );
}
const card = { background: "#F8FAFC", padding: "20px", borderRadius: "8px", border: "1px solid #E2E8F0" };
export default ResidentDashboard;