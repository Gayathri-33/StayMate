import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import roomService from "../../services/roomService";

function RoomList() {
  const hostelCode = JSON.parse(localStorage.getItem("user")).hostelCode;

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const response = await roomService.getRooms(hostelCode);
      setRooms(response.data);
    };
    loadRooms();
  }, [hostelCode]);

  const loadRooms = async () => {
    const response = await roomService.getRooms(hostelCode);
    setRooms(response.data);
  };

  const deleteRoom = async (id) => {
    if (window.confirm("Delete Room?")) {
      await roomService.deleteRoom(id);
      loadRooms();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Rooms</h2>

        <Link to="/admin/rooms/add" className="btn btn-success">
          Add Room
        </Link>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Room No</th>

            <th>Type</th>

            <th>Capacity</th>

            <th>Occupied</th>

            <th>Available</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.capacity}</td>
              <td>{room.occupiedBeds}</td>
              <td>{room.availableBeds}</td>
              <td>{room.status}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomList;
