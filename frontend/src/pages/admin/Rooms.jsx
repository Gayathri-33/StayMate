import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import roomService from "../../services/roomService";

function Rooms() {
  const user = JSON.parse(localStorage.getItem("user"));
  const hostelCode = user?.hostelCode;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRooms = async () => {
    try {
      const res = await roomService.getRooms(hostelCode);
      setRooms(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hostelCode) return;

    // avoid calling setState synchronously within effect body
    const fetchRooms = async () => {
      try {
        await loadRooms();
      } catch (err) {
        // loadRooms already handles errors, but catch to avoid unhandled rejections
        console.error(err);
      }
    };

    fetchRooms();
  }, [hostelCode]);

  const deleteRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      await roomService.deleteRoom(id);
      loadRooms();
    } catch (err) {
      console.log(err);
      alert("Unable to delete room");
    }
  };

  return (
    <div style={{ display: "flex", background: "#f8fafc" }}>
      <AdminSidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <AdminNavbar />

        <div style={{ padding: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2>Room Management</h2>

            <Link
              to="/admin/rooms/add"
              className="btn btn-primary"
            >
              Add Room
            </Link>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Capacity</th>
                <th>Occupied Beds</th>
                <th>Available Beds</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : rooms.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Rooms Found
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.roomId}>
                    <td>{room.roomId}</td>

                    <td>{room.roomNumber}</td>

                    <td>{room.roomType}</td>

                    <td>{room.capacity}</td>

                    <td>{room.occupiedBeds}</td>

                    <td>{room.availableBeds}</td>

                    <td>
                      {room.availableBeds > 0 ? (
                        <span className="badge bg-success">
                          Available
                        </span>
                      ) : (
                        <span className="badge bg-danger">
                          Full
                        </span>
                      )}
                    </td>

                    <td>
                      <Link
                        to={`/admin/rooms/edit/${room.roomId}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteRoom(room.roomId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rooms;