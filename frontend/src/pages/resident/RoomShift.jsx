import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";
import adminService from "../../services/adminService";

function RoomShift() {
  const [myRequests, setMyRequests] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ newRoomId: "", reasonLeaving: "", reasonWanted: "" });
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

  useEffect(() => { refresh(); }, []);

  const openForm = async () => {
    try {
      const dashRes = await residentService.getDashboard();
      const hostelCode = dashRes.data.hostelCode;
      const roomsRes = await adminService.getRooms(hostelCode);
      setAvailableRooms(roomsRes.data.filter(r => r.availableBeds > 0));
      setShowForm(true);
    } catch {
      alert("Unable to load available rooms");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await residentService.requestRoomShift({
        newRoomId: parseInt(form.newRoomId),
        reasonLeaving: form.reasonLeaving,
        reasonWanted: form.reasonWanted
      });
      setForm({ newRoomId: "", reasonLeaving: "", reasonWanted: "" });
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
            <th>Old Room</th><th>New Room</th><th>Reasons</th><th>Status</th><th>Requested On</th>
          </tr>
        </thead>
        <tbody>
          {myRequests.length === 0 ? <tr><td colSpan="5" className="empty-row">No room shift requests yet.</td></tr> :
          myRequests.map(r => (
            <tr key={r.id}>
              <td>{r.oldRoomNumber}</td>
              <td>{r.newRoomNumber}</td>
              <td>
                <b>Leaving:</b> {r.reasonLeaving}<br/>
                <b>Wanted:</b> {r.reasonWanted}
              </td>
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
              <div className="form-group">
                <label>Select New Room</label>
                <select value={form.newRoomId} onChange={e => setForm({...form, newRoomId: e.target.value})} className="staymate-input" required>
                  <option value="">-- Choose a room --</option>
                  {availableRooms.map(r => (
                    <option key={r.roomId} value={r.roomId}>
                      Room {r.roomNumber} ({r.availableBeds} bed(s) available)
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Why are you leaving your current room?</label>
                <textarea value={form.reasonLeaving} onChange={e => setForm({...form, reasonLeaving: e.target.value})} className="staymate-input staymate-textarea" required />
              </div>
              <div className="form-group">
                <label>Why do you want the new room?</label>
                <textarea value={form.reasonWanted} onChange={e => setForm({...form, reasonWanted: e.target.value})} className="staymate-input staymate-textarea" required />
              </div>
              <div className="modal-actions">
                <button type="submit" disabled={loading} className="staymate-btn-primary">{loading ? "Submitting..." : "Submit Request"}</button>
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
  .staymate-textarea { min-height: 70px; resize: vertical; }
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
  @media (max-width: 768px) {
    .page-header { flex-direction: column; align-items: flex-start; }
    .staymate-table { display: block; overflow-x: auto; }
  }
`;

export default RoomShift;