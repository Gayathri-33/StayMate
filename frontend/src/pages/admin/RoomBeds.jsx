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
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
        <label style={{ fontWeight: "bold" }}>Select Hostel:</label>
        <select value={selectedHostel?.hostelId || ""} onChange={e => setSelectedHostel(hostels.find(h => h.hostelId == e.target.value))} style={inputStyle}>
          {hostels.map(h => <option key={h.hostelId} value={h.hostelId}>{h.hostelName} ({h.hostelCode})</option>)}
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h3 style={{ margin: 0 }}>Rooms</h3>
        <button onClick={() => setShowAddRoom(true)} style={primaryBtn}>+ Add Room</button>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr style={thStyle}>
            <th style={th}>Room No</th><th style={th}>Capacity</th><th style={th}>Occupied</th><th style={th}>Available</th><th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? <tr><td colSpan="5" style={{...td, textAlign:"center"}}>No rooms added yet.</td></tr> : 
          rooms.map(r => (
            <tr key={r.roomId} style={trStyle}>
              <td style={td}><b>{r.roomNumber}</b></td>
              <td style={td}>{r.capacity}</td>
              <td style={td}>{r.occupiedBeds}</td>
              <td style={td}><span style={{color: "#10B981", fontWeight:"bold"}}>{r.availableBeds}</span></td>
              <td style={td}><button onClick={() => handleDeleteRoom(r.roomId)} style={dangerBtn}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddRoom && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Add New Room</h3>
            <form onSubmit={handleAddRoom}>
              <input placeholder="Room Number (e.g. 101)" value={newRoom.roomNumber} onChange={e => setNewRoom({...newRoom, roomNumber: e.target.value})} style={inputStyle} required />
              <input placeholder="Capacity (No. of Beds)" type="number" min="1" value={newRoom.capacity} onChange={e => setNewRoom({...newRoom, capacity: e.target.value})} style={{...inputStyle, marginTop: "10px"}} required />
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button type="submit" style={primaryBtn}>Save & Generate Beds</button>
                <button type="button" onClick={() => setShowAddRoom(false)} style={secondaryBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: "40px" }}>All Beds</h3>
      <table style={tableStyle}>
        <thead>
          <tr style={thStyle}>
            <th style={th}>Bed No</th><th style={th}>Room</th><th style={th}>Status</th><th style={th}>Resident</th>
          </tr>
        </thead>
        <tbody>
          {beds.length === 0 ? <tr><td colSpan="4" style={{...td, textAlign:"center"}}>No beds found.</td></tr> : 
          beds.map(b => (
            <tr key={b.bedId} style={trStyle}>
              <td style={td}><b>{b.bedNumber}</b></td>
              <td style={td}>{b.roomNumber}</td>
              <td style={td}><span style={statusBadge(b.status)}>{b.status}</span></td>
              <td style={td}>{b.residentName || <span style={{color: "#94A3B8"}}>Unoccupied</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
const dangerBtn = { padding: "6px 12px", background: "#EF4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { background: "#fff", padding: "30px", borderRadius: "10px", width: "400px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" };
const statusBadge = (status) => ({
  padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold",
  background: status === "VACANT" ? "#D1FAE5" : status === "OCCUPIED" ? "#FEE2E2" : "#E2E8F0",
  color: status === "VACANT" ? "#065F46" : status === "OCCUPIED" ? "#991B1B" : "#475569"
});

export default RoomsBeds;