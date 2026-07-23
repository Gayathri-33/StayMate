import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";

function RoomShift() {
  const [myRequests, setMyRequests] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("Not Assigned");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ newRoomId: "", reason: "" });
  const [loading, setLoading] = useState(false);

  const menu = [
    { label: "Dashboard", path: "/resident/dashboard" },
    { label: "Make Payment", path: "/resident/payment" },
    { label: "Complaints", path: "/resident/complaints" },
    { label: "Room Shift", path: "/resident/shift" },
    { label: "Feedback", path: "/resident/feedback" }
  ];

  const refresh = () => {
    residentService.getMyRoomShiftRequests().then(res => setMyRequests(res.data));
  };

  useEffect(() => { 
    refresh(); 
    // Fetch current room details from dashboard
    residentService.getDashboard().then(res => {
      if (res.data.roomNumber) setCurrentRoom(res.data.roomNumber);
    });
  }, []);

  const openForm = async () => {
    try {
      // FIXED: Use the resident-specific endpoint
      const roomsRes = await residentService.getAvailableRoomsForShift();
      setAvailableRooms(roomsRes.data);
      setShowForm(true);
    } catch {
      alert("Unable to load available rooms. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await residentService.requestRoomShift({
        newRoomId: parseInt(form.newRoomId),
        reasonLeaving: form.reason, // Sending as reasonLeaving for backend compatibility
        reasonWanted: "Requested via shift form"
      });
      setForm({ newRoomId: "", reason: "" });
      setShowForm(false);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Room Shift Requests" menuItems={menu}>
      <style>{shiftStyles}</style>
      <div className="page-header">
        <p>Request a room change. Subject to admin approval and bed availability.</p>
        <button onClick={openForm} className="staymate-btn-primary">+ Request Shift</button>
      </div>

      <table className="staymate-table">
        <thead>
          <tr>
            <th>Previous Room</th><th>Requested Room</th><th>Reason</th><th>Status</th><th>Requested On</th>
          </tr>
        </thead>
        <tbody>
          {myRequests.length === 0 ? <tr><td colSpan="5" className="empty-row">No room shift requests yet.</td></tr> :
          myRequests.map(r => (
            <tr key={r.id}>
              <td>{r.oldRoomNumber}</td>
              <td>{r.newRoomNumber}</td>
              <td>{r.reasonLeaving}</td>
              <td><span className={`badge-${r.status.toLowerCase()}`}>{r.status}</span></td>
              <td>{new Date(r.requestedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Request Room Shift</h3>
            <form onSubmit={handleSubmit}>
              
              {/* Previous Room (Read Only) */}
              <div className="form-group">
                <label>Previous Room</label>
                <input 
                  type="text" 
                  value={currentRoom} 
                  disabled 
                  className="staymate-input read-only-input" 
                />
              </div>

              {/* New Room Requested (Dropdown) */}
              <div className="form-group">
                <label>New Room Requested</label>
                <select 
                  value={form.newRoomId} 
                  onChange={e => setForm({...form, newRoomId: e.target.value})} 
                  className="staymate-input" 
                  required
                >
                  <option value="">-- Select available room --</option>
                  {availableRooms.map(r => (
                    <option key={r.roomId} value={r.roomId}>
                      Room {r.roomNumber} ({r.availableBeds} beds available)
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason Textbox */}
              <div className="form-group">
                <label>Reason for Shift</label>
                <textarea 
                  value={form.reason} 
                  onChange={e => setForm({...form, reason: e.target.value})} 
                  className="staymate-input staymate-textarea" 
                  placeholder="Explain why you need to shift rooms..."
                  required 
                />
              </div>

              <div className="modal-actions">
                <button type="submit" disabled={loading} className="staymate-btn-primary">
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="staymate-btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

const shiftStyles = `
  .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px; }
  .page-header p { color: #588157; margin: 0; font-size: 15px; }
  .staymate-btn-primary { background-color: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-primary:hover { background-color: #344E41; }
  .staymate-btn-primary:disabled { background-color: #A3B18A; cursor: not-allowed; }
  .staymate-btn-secondary { background-color: #A3B18A; color: #344E41; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-secondary:hover { background-color: #588157; color: #FFFFFF; }
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .staymate-input { width: 100%; padding: 10px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .read-only-input { background-color: #E2E8F0 !important; color: #64748B !important; cursor: not-allowed; }
  .staymate-textarea { min-height: 80px; resize: vertical; }
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(52, 78, 65, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(2px); }
  .modal-content { background: #FFFFFF; padding: 30px; border-radius: 12px; width: 500px; max-width: 90vw; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 1px solid #A3B18A; }
  .modal-content h3 { margin-top: 0; color: #344E41; margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 24px; }
  .modal-actions button { flex: 1; }
  .badge-pending { background: #A3B18A; color: #344E41; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-approved { background: #3A5A40; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-rejected { background: #8B2E2E; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
`;

export default RoomShift;