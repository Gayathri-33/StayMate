import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import adminService from "../../services/adminService";

function RoomsBeds() {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomNumber: "", capacity: "" });

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

  const refreshData = (code) => {
    adminService.getRooms(code).then(res => setRooms(res.data));
    adminService.getBeds(code).then(res => setBeds(res.data));
  };

  useEffect(() => {
    if (selectedHostel) refreshData(selectedHostel.hostelCode);
  }, [selectedHostel]);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    await adminService.addRoom(selectedHostel.hostelCode, {
      roomNumber: newRoom.roomNumber,
      capacity: parseInt(newRoom.capacity)
    });
    setShowAddRoom(false);
    setNewRoom({ roomNumber: "", capacity: "" });
    refreshData(selectedHostel.hostelCode);
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Delete this room and all its beds? (Beds must be unoccupied)")) {
      await adminService.deleteRoom(id);
      refreshData(selectedHostel.hostelCode);
    }
  };

  return (
    <Layout title="Rooms & Beds Management" menuItems={menu}>
      <style>{roomStyles}</style>
      <div className="controls-bar">
        <div className="control-group">
          <label>Select Hostel:</label>
          <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} className="staymate-input">
            {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName} ({h.hostelCode})</option>)}
          </select>
        </div>
      </div>

      <div className="section-header">
        <h3>Rooms</h3>
        <button onClick={() => setShowAddRoom(true)} className="staymate-btn-primary">+ Add Room</button>
      </div>
      
      <table className="staymate-table">
        <thead>
          <tr>
            <th>Room No</th><th>Capacity</th><th>Occupied</th><th>Available</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? <tr><td colSpan="5" className="empty-row">No rooms added yet.</td></tr> : 
          rooms.map(r => (
            <tr key={r.roomId}>
              <td><b>{r.roomNumber}</b></td>
              <td>{r.capacity}</td>
              <td>{r.occupiedBeds}</td>
              <td><span className="text-available">{r.availableBeds}</span></td>
              <td><button onClick={() => handleDeleteRoom(r.roomId)} className="staymate-btn-sm danger">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddRoom && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Room</h3>
            <form onSubmit={handleAddRoom}>
              <div className="form-group">
                <label>Room Number</label>
                <input placeholder="e.g. 101" value={newRoom.roomNumber} onChange={e => setNewRoom({...newRoom, roomNumber: e.target.value})} className="staymate-input" required />
              </div>
              <div className="form-group">
                <label>Capacity (No. of Beds)</label>
                <input type="number" min="1" placeholder="e.g. 4" value={newRoom.capacity} onChange={e => setNewRoom({...newRoom, capacity: e.target.value})} className="staymate-input" required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="staymate-btn-primary">Save & Generate Beds</button>
                <button type="button" onClick={() => setShowAddRoom(false)} className="staymate-btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="section-header" style={{marginTop: "40px"}}>
        <h3>All Beds</h3>
      </div>
      <table className="staymate-table">
        <thead>
          <tr>
            <th>Bed No</th><th>Room</th><th>Status</th><th>Resident</th>
          </tr>
        </thead>
        <tbody>
          {beds.length === 0 ? <tr><td colSpan="4" className="empty-row">No beds found.</td></tr> : 
          beds.map(b => (
            <tr key={b.bedId}>
              <td><b>{b.bedNumber}</b></td>
              <td>{b.roomNumber}</td>
              <td><span className={`badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
              <td>{b.residentName || <span className="text-muted">Unoccupied</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

const roomStyles = `
  .controls-bar { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 25px; background: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #A3B18A; }
  .control-group { display: flex; align-items: center; gap: 10px; }
  .control-group label { font-weight: 600; color: #344E41; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
  .section-header h3 { margin: 0; color: #344E41; }
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .text-muted { color: #588157; font-size: 12px; }
  .text-available { color: #3A5A40; font-weight: 700; }
  .staymate-input { width: 100%; padding: 10px 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 14px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-btn-primary { background-color: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-primary:hover { background-color: #344E41; }
  .staymate-btn-secondary { background-color: #A3B18A; color: #344E41; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 600; }
  .staymate-btn-secondary:hover { background-color: #588157; color: #FFFFFF; }
  .staymate-btn-sm { padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; }
  .staymate-btn-sm.danger { background: #8B2E2E; color: #FFFFFF; }
  .staymate-btn-sm.danger:hover { background: #6B2222; }
  .badge-vacant { background: #3A5A40; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-occupied { background: #8B2E2E; color: #FFFFFF; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(52, 78, 65, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(2px); }
  .modal-content { background: #FFFFFF; padding: 30px; border-radius: 12px; width: 400px; max-width: 90vw; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 1px solid #A3B18A; }
  .modal-content h3 { margin-top: 0; color: #344E41; margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 24px; }
  .modal-actions button { flex: 1; }
`;

export default RoomsBeds;