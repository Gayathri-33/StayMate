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
      <style>{messStyles}</style>
      <div className="controls-bar">
        <div className="control-group">
          <label>Select Hostel:</label>
          <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} className="staymate-input">
            {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName}</option>)}
          </select>
        </div>
        <div className="tabs">
          <button onClick={() => setTab("mess")} className={tab === "mess" ? "tab-btn active" : "tab-btn"}>Mess Menu</button>
          <button onClick={() => setTab("notices")} className={tab === "notices" ? "tab-btn active" : "tab-btn"}>Notices</button>
        </div>
      </div>

      {tab === "mess" ? (
        <>
          <div className="section-header">
            <h3>Mess Menu Items</h3>
            <button onClick={() => setShowAddMess(true)} className="staymate-btn-primary">+ Add Dish</button>
          </div>
          <table className="staymate-table">
            <thead>
              <tr><th>Day</th><th>Meal Type</th><th>Dish</th><th>Timing</th></tr>
            </thead>
            <tbody>
              {messItems.length === 0 ? <tr><td colSpan="4" className="empty-row">No menu items yet.</td></tr> :
              messItems.map(m => (
                <tr key={m.id}>
                  <td>{m.dayOfWeek}</td>
                  <td>{m.mealType}</td>
                  <td><b>{m.dishName}</b></td>
                  <td>{m.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {showAddMess && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Add Menu Item</h3>
                <form onSubmit={handleAddMess}>
                  <div className="form-group">
                    <label>Day of Week</label>
                    <select value={newMess.dayOfWeek} onChange={e => setNewMess({...newMess, dayOfWeek: e.target.value})} className="staymate-input">
                      {["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Meal Type</label>
                    <select value={newMess.mealType} onChange={e => setNewMess({...newMess, mealType: e.target.value})} className="staymate-input">
                      {["BREAKFAST","LUNCH","SNACKS","DINNER"].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Dish Name</label>
                    <input placeholder="e.g. Paneer Butter Masala" value={newMess.dishName} onChange={e => setNewMess({...newMess, dishName: e.target.value})} className="staymate-input" required />
                  </div>
                  <div className="form-group">
                    <label>Timing</label>
                    <input placeholder="e.g. 8:00 AM - 9:30 AM" value={newMess.timing} onChange={e => setNewMess({...newMess, timing: e.target.value})} className="staymate-input" required />
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="staymate-btn-primary">Save</button>
                    <button type="button" onClick={() => setShowAddMess(false)} className="staymate-btn-secondary">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="section-header">
            <h3>Notices</h3>
            <button onClick={() => setShowAddNotice(true)} className="staymate-btn-primary">+ Add Notice</button>
          </div>
          <table className="staymate-table">
            <thead>
              <tr><th>Title</th><th>Description</th><th>Deadline</th><th>Posted On</th></tr>
            </thead>
            <tbody>
              {notices.length === 0 ? <tr><td colSpan="4" className="empty-row">No notices yet.</td></tr> :
              notices.map(n => (
                <tr key={n.noticeId}>
                  <td><b>{n.title}</b></td>
                  <td>{n.description}</td>
                  <td>{n.deadline || <span className="text-muted">No deadline</span>}</td>
                  <td>{new Date(n.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {showAddNotice && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Add Notice</h3>
                <form onSubmit={handleAddNotice}>
                  <div className="form-group">
                    <label>Title</label>
                    <input placeholder="Notice Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="staymate-input" required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe the notice..." value={newNotice.description} onChange={e => setNewNotice({...newNotice, description: e.target.value})} className="staymate-input staymate-textarea" required />
                  </div>
                  <div className="form-group">
                    <label>Deadline (optional)</label>
                    <input type="date" value={newNotice.deadline} onChange={e => setNewNotice({...newNotice, deadline: e.target.value})} className="staymate-input" />
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="staymate-btn-primary">Post Notice</button>
                    <button type="button" onClick={() => setShowAddNotice(false)} className="staymate-btn-secondary">Cancel</button>
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

const messStyles = `
  .controls-bar { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 25px; background: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #A3B18A; }
  .control-group { display: flex; align-items: center; gap: 10px; }
  .control-group label { font-weight: 600; color: #344E41; }
  .tabs { display: flex; gap: 10px; margin-left: auto; }
  .tab-btn { padding: 8px 20px; background: #A3B18A; color: #344E41; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
  .tab-btn.active { background: #3A5A40; color: #FFFFFF; }
  .tab-btn:hover:not(.active) { background: #588157; color: #FFFFFF; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
  .section-header h3 { margin: 0; color: #344E41; }
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .text-muted { color: #588157; font-size: 12px; }
  .staymate-input { width: 100%; padding: 10px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-textarea { min-height: 80px; resize: vertical; }
  .staymate-btn-primary { background-color: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-primary:hover { background-color: #344E41; }
  .staymate-btn-secondary { background-color: #A3B18A; color: #344E41; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-secondary:hover { background-color: #588157; color: #FFFFFF; }
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(52, 78, 65, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(2px); }
  .modal-content { background: #FFFFFF; padding: 30px; border-radius: 12px; width: 450px; max-width: 90vw; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 1px solid #A3B18A; }
  .modal-content h3 { margin-top: 0; color: #344E41; margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 24px; }
  .modal-actions button { flex: 1; }
`;

export default MessNotices;