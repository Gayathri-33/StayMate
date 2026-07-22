import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import adminService from "../../services/adminService";

function HostelRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ hostelName: "", place: "", hostelType: "MALE", totalRooms: "", feeAmount: "", feeCycle: "MONTHLY", paymentBufferDays: "3" });
  const [qrFile, setQrFile] = useState(null);
  const menu = [ { label: "Dashboard", path: "/admin/dashboard" }, { label: "Register Hostel", path: "/admin/hostels/register" }, { label: "Rooms & Beds", path: "/admin/rooms" }, { label: "Residents", path: "/admin/residents" }, { label: "Requests & Complaints", path: "/admin/requests" }, { label: "Mess & Notices", path: "/admin/mess-notices" } ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(form)], { type: "application/json" }));
    if (qrFile) formData.append("qrImage", qrFile);

    try {
      await adminService.registerHostel(formData);
      alert("Hostel registered! Awaiting SuperAdmin approval.");
      navigate("/admin/dashboard");
    } catch (err) { alert(err.response?.data?.error || "Failed"); }
  };

  return (
    <Layout title="Register New Hostel" menuItems={menu}>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <Input label="Hostel Name" val={form.hostelName} onChange={v => setForm({...form, hostelName: v})} />
        <Input label="Place/Area" val={form.place} onChange={v => setForm({...form, place: v})} />
        <label>Type:</label>
        <select value={form.hostelType} onChange={e => setForm({...form, hostelType: e.target.value})} style={inputStyle}>
          <option value="MALE">Male</option><option value="FEMALE">Female</option><option value="UNISEX">Unisex</option>
        </select>
        <Input label="Total Rooms" type="number" val={form.totalRooms} onChange={v => setForm({...form, totalRooms: v})} />
        <Input label="Fee Amount" type="number" val={form.feeAmount} onChange={v => setForm({...form, feeAmount: v})} />
        <label>Fee Cycle:</label>
        <select value={form.feeCycle} onChange={e => setForm({...form, feeCycle: e.target.value})} style={inputStyle}>
          <option value="MONTHLY">Monthly</option><option value="YEARLY">Yearly</option>
        </select>
        <Input label="Payment Buffer Days" type="number" val={form.paymentBufferDays} onChange={v => setForm({...form, paymentBufferDays: v})} />
        
        <label style={{ display: "block", marginTop: "15px" }}>Upload Payment QR Code:</label>
        <input type="file" accept="image/*" onChange={e => setQrFile(e.target.files[0])} style={{ marginTop: "5px" }} />
        
        <button type="submit" style={{ marginTop: "20px", padding: "12px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "6px", width: "100%", cursor: "pointer" }}>Submit for Approval</button>
      </form>
    </Layout>
  );
}
const inputStyle = { width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #CBD5E1" };
function Input({ label, val, onChange, type="text" }) { return <><label>{label}</label><input type={type} value={val} onChange={e => onChange(e.target.value)} style={inputStyle} required /></>; }
export default HostelRegistration;