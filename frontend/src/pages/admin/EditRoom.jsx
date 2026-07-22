import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import roomService from "../../services/roomService";

function EditRoom() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [room, setRoom] = useState({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await roomService.getRoom(id);
      if (mounted) setRoom(res.data);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const updateRoom = async (e) => {
    e.preventDefault();

    await roomService.updateRoom(id, room);

    alert("Room Updated");

    navigate("/admin/rooms");
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />

      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-warning">Edit Room</div>

          <div className="card-body">
            <form onSubmit={updateRoom}>
              <input
                className="form-control mb-3"
                name="roomNumber"
                value={room.roomNumber || ""}
                onChange={handleChange}
              />

              <select
                className="form-control mb-3"
                name="roomType"
                value={room.roomType || ""}
                onChange={handleChange}
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
              </select>

              <input
                className="form-control mb-3"
                name="capacity"
                value={room.capacity || ""}
                onChange={handleChange}
              />

              <button className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditRoom;
