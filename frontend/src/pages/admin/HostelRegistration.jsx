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
      <style>{formStyles}</style>
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Hostel Details</h2>
        <Input label="Hostel Name" val={form.hostelName} onChange={v => setForm({...form, hostelName: v})} />
        <Input label="Place/Area" val={form.place} onChange={v => setForm({...form, place: v})} />
        
        <div className="form-group">
          <label>Type</label>
          <select value={form.hostelType} onChange={e => setForm({...form, hostelType: e.target.value})} className="staymate-input">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="UNISEX">Unisex</option>
          </select>
        </div>

        <Input label="Total Rooms" type="number" val={form.totalRooms} onChange={v => setForm({...form, totalRooms: v})} />
        <Input label="Fee Amount (₹)" type="number" val={form.feeAmount} onChange={v => setForm({...form, feeAmount: v})} />
        
        <div className="form-group">
          <label>Fee Cycle</label>
          <select value={form.feeCycle} onChange={e => setForm({...form, feeCycle: e.target.value})} className="staymate-input">
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>
        </div>

        <Input label="Payment Buffer Days" type="number" val={form.paymentBufferDays} onChange={v => setForm({...form, paymentBufferDays: v})} />
        
        <div className="form-group">
          <label>Upload Payment QR Code</label>
          <input type="file" accept="image/*" onChange={e => setQrFile(e.target.files[0])} className="staymate-input" style={{padding: "8px"}} />
        </div>
        
        <button type="submit" className="staymate-btn-primary" style={{marginTop: "10px", width: "100%"}}>Submit for Approval</button>
      </form>
    </Layout>
  );
}

function Input({ label, val, onChange, type="text" }) { 
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} value={val} onChange={e => onChange(e.target.value)} className="staymate-input" required />
    </div>
  ); 
}

const formStyles = `
  .form-container { max-width: 600px; background: #FFFFFF; padding: 30px; border-radius: 12px; border: 1px solid #A3B18A; box-shadow: 0 4px 12px rgba(52, 78, 65, 0.05); }
  .form-title { color: #344E41; margin-top: 0; margin-bottom: 25px; text-align: center; border-bottom: 2px solid #A3B18A; padding-bottom: 15px; }
  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .staymate-input { width: 100%; padding: 10px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-btn-primary { background-color: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; padding: 12px 20px; cursor: pointer; transition: all 0.2s; font-size: 15px; font-weight: 600; }
  .staymate-btn-primary:hover { background-color: #344E41; }
`;

export default HostelRegistration;