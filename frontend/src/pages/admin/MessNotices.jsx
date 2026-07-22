import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import adminService from "../../services/adminService";

function MessNotices() {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [tab, setTab] = useState("mess");
  const [messItems, setMessItems] = useState([]);
  const [notices, setNotices] = useState([]);
  const [showAddMess, setShowAddMess] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [newMess, setNewMess] = useState({ dayOfWeek: "MONDAY", mealType: "BREAKFAST", dishName: "", timing: "" });
  const [newNotice, setNewNotice] = useState({ title: "", description: "", deadline: "" });

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

  const refreshData = () => {
    if (!selectedHostel) return;
    adminService.getMessMenu(selectedHostel.hostelId).then(res => setMessItems(res.data));
    adminService.getNotices(selectedHostel.hostelId).then(res => setNotices(res.data));
  };

  useEffect(() => { refreshData(); }, [selectedHostel]);

  const handleAddMess = async (e) => {
    e.preventDefault();
    await adminService.addMessItem(selectedHostel.hostelId, newMess);
    setShowAddMess(false);
    setNewMess({ dayOfWeek: "MONDAY", mealType: "BREAKFAST", dishName: "", timing: "" });
    refreshData();
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    const payload = { ...newNotice };
    if (!payload.deadline) delete payload.deadline;
    await adminService.addNotice(selectedHostel.hostelId, payload);
    setShowAddNotice(false);
    setNewNotice({ title: "", description: "", deadline: "" });
    refreshData();
  };

  return (
    <Layout title="Mess Menu & Notices" menuItems={menu}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Select Hostel:</label>
          <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} style={inputStyle}>
            {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setTab("mess")} style={tab === "mess" ? primaryBtn : secondaryBtn}>Mess Menu</button>
          <button onClick={() => setTab("notices")} style={tab === "notices" ? primaryBtn : secondaryBtn}>Notices</button>
        </div>
      </div>

      {tab === "mess" ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <h3 style={{ margin: 0 }}>Mess Menu Items</h3>
            <button onClick={() => setShowAddMess(true)} style={primaryBtn}>+ Add Dish</button>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr style={thStyle}>
                <th style={th}>Day</th><th style={th}>Meal Type</th><th style={th}>Dish</th><th style={th}>Timing</th>
              </tr>
            </thead>
            <tbody>
              {messItems.length === 0 ? <tr><td colSpan="4" style={{...td, textAlign:"center"}}>No menu items yet.</td></tr> :
              messItems.map(m => (
                <tr key={m.id} style={trStyle}>
                  <td style={td}>{m.dayOfWeek}</td>
                  <td style={td}>{m.mealType}</td>
                  <td style={td}><b>{m.dishName}</b></td>
                  <td style={td}>{m.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {showAddMess && (
            <div style={modalOverlay}>
              <div style={modalContent}>
                <h3>Add Menu Item</h3>
                <form onSubmit={handleAddMess}>
                  <label>Day of Week</label>
                  <select value={newMess.dayOfWeek} onChange={e => setNewMess({...newMess, dayOfWeek: e.target.value})} style={inputStyle}>
                    {["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <label style={{marginTop:"10px", display:"block"}}>Meal Type</label>
                  <select value={newMess.mealType} onChange={e => setNewMess({...newMess, mealType: e.target.value})} style={inputStyle}>
                    {["BREAKFAST","LUNCH","SNACKS","DINNER"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <input placeholder="Dish Name" value={newMess.dishName} onChange={e => setNewMess({...newMess, dishName: e.target.value})} style={{...inputStyle, marginTop:"10px"}} required />
                  <input placeholder="Timing (e.g. 8:00 AM - 9:30 AM)" value={newMess.timing} onChange={e => setNewMess({...newMess, timing: e.target.value})} style={{...inputStyle, marginTop:"10px"}} required />
                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button type="submit" style={primaryBtn}>Save</button>
                    <button type="button" onClick={() => setShowAddMess(false)} style={secondaryBtn}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <h3 style={{ margin: 0 }}>Notices</h3>
            <button onClick={() => setShowAddNotice(true)} style={primaryBtn}>+ Add Notice</button>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr style={thStyle}>
                <th style={th}>Title</th><th style={th}>Description</th><th style={th}>Deadline</th><th style={th}>Posted On</th>
              </tr>
            </thead>
            <tbody>
              {notices.length === 0 ? <tr><td colSpan="4" style={{...td, textAlign:"center"}}>No notices yet.</td></tr> :
              notices.map(n => (
                <tr key={n.noticeId} style={trStyle}>
                  <td style={td}><b>{n.title}</b></td>
                  <td style={td}>{n.description}</td>
                  <td style={td}>{n.deadline || <span style={{color:"#94A3B8"}}>No deadline</span>}</td>
                  <td style={td}>{new Date(n.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {showAddNotice && (
            <div style={modalOverlay}>
              <div style={modalContent}>
                <h3>Add Notice</h3>
                <form onSubmit={handleAddNotice}>
                  <input placeholder="Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} style={inputStyle} required />
                  <textarea placeholder="Description" value={newNotice.description} onChange={e => setNewNotice({...newNotice, description: e.target.value})} style={{...inputStyle, marginTop:"10px", minHeight:"80px"}} required />
                  <label style={{marginTop:"10px", display:"block"}}>Deadline (optional)</label>
                  <input type="date" value={newNotice.deadline} onChange={e => setNewNotice({...newNotice, deadline: e.target.value})} style={inputStyle} />
                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button type="submit" style={primaryBtn}>Post Notice</button>
                    <button type="button" onClick={() => setShowAddNotice(false)} style={secondaryBtn}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

// --- Shared Styles ---
const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "14px", width: "100%", boxSizing: "border-box" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "10px" };
const thStyle = { background: "#F1F5F9" };
const th = { padding: "12px", textAlign: "left", fontSize: "14px", color: "#475569" };
const td = { padding: "12px", fontSize: "14px", borderBottom: "1px solid #E2E8F0" };
const trStyle = {};
const primaryBtn = { padding: "8px 16px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };
const secondaryBtn = { padding: "8px 16px", background: "#F1F5F9", color: "#0F172A", border: "1px solid #CBD5E1", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "450px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" };

export default MessNotices;