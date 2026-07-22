import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import roomService from "../../services/roomService";

function Rooms() {

  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    try {
      const res = await roomService.getRooms();
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await roomService.getRooms();
        if (mounted) setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);


  const deleteRoom = async (id) => {
    if(window.confirm("Delete this room?")){

      await roomService.deleteRoom(id);

      loadRooms();
    }
  }

  return (
    <>
      <AdminNavbar />

      <div style={{display:"flex"}}>

        <AdminSidebar/>

        <div style={{padding:"25px",flex:1}}>

          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              marginBottom:"20px"
            }}
          >

            <h2>Rooms</h2>

            <Link
              to="/admin/rooms/add"
              className="btn btn-primary"
            >
              Add Room
            </Link>

          </div>

          <table className="table table-bordered">

            <thead>

            <tr>

              <th>ID</th>
              <th>Room No</th>
              <th>Floor</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {
              rooms.map(room=>(

                <tr key={room.roomId}>

                  <td>{room.roomId}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.floorNumber}</td>
                  <td>{room.capacity}</td>
                  <td>{room.occupiedBeds}</td>
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
                      onClick={()=>deleteRoom(room.roomId)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            }

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}

export default Rooms;