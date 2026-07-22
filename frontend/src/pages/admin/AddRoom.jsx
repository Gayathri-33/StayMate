import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import roomService from "../../services/roomService";

function AddRoom() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [room, setRoom] = useState({
    roomNumber: "",
    roomType: "",
    capacity: "",
    occupiedBeds: 0,
    availableBeds: "",
    hostelCode: user?.hostelCode || "",
  });

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const saveRoom = async (e) => {
    e.preventDefault();

    console.log("Room Data:", room);

    try {
      const res = await roomService.addRoom(room);

      console.log("Response:", res);

      alert("Room Added Successfully");

      navigate("/admin/rooms");
    } catch (err) {
      console.log("Error:", err);

      console.log("Response:", err.response);

      alert("Failed to Add Room");
    }
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />

      <div
        style={{
          marginLeft: "270px",
          padding: "30px",
          marginTop: "80px",
        }}
      >
        <div className="card">
          <div className="card-header bg-primary text-white">Add Room</div>

          <div className="card-body">
            <form onSubmit={saveRoom}>
              <input
                className="form-control mb-3"
                placeholder="Room Number"
                name="roomNumber"
                value={room.roomNumber}
                onChange={handleChange}
              />

              <select
                className="form-control mb-3"
                name="roomType"
                value={room.roomType}
                onChange={handleChange}
              >
                <option value="">Select Room Type</option>
                <option value="AC">AC</option>
                <option value="Non AC">Non AC</option>
              </select>

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Capacity"
                name="capacity"
                value={room.capacity}
                onChange={handleChange}
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Occupied Beds"
                name="occupiedBeds"
                value={room.occupiedBeds}
                onChange={handleChange}
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Available Beds"
                name="availableBeds"
                value={room.availableBeds}
                onChange={handleChange}
              />

              <button className="btn btn-success">Save Room</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRoom;
