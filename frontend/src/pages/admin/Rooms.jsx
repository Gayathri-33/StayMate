import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Rooms() {

    const [rooms, setRooms] = useState([]);

    const loadRooms = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8083/rooms"
            );

            setRooms(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8083/rooms"
                );

                setRooms(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRooms();
    }, []);

    const deleteRoom = async (id) => {

        if (!window.confirm("Delete this room?"))
            return;

        try {

            await axios.delete(
                `http://localhost:8083/rooms/${id}`
            );

            loadRooms();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}
            >

                <h2>Room Management</h2>

                <Link to="/admin/add-room">

                    <button>Add Room</button>

                </Link>

            </div>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Room No</th>
                        <th>Floor</th>
                        <th>Type</th>
                        <th>Capacity</th>
                        <th>Occupied</th>
                        <th>Monthly Fee</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        rooms.length === 0 ?

                            <tr>

                                <td
                                    colSpan="9"
                                    align="center"
                                >

                                    No Rooms Found

                                </td>

                            </tr>

                            :

                            rooms.map((room) => (

                                <tr key={room.roomId}>

                                    <td>{room.roomId}</td>

                                    <td>{room.roomNumber}</td>

                                    <td>{room.floorNumber}</td>

                                    <td>{room.roomType}</td>

                                    <td>{room.capacity}</td>

                                    <td>{room.occupiedCount}</td>

                                    <td>{room.monthlyFee}</td>

                                    <td>{room.roomStatus}</td>

                                    <td>

                                        <button>

                                            Edit

                                        </button>

                                        {" "}

                                        <button
                                            onClick={() =>
                                                deleteRoom(room.roomId)
                                            }
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

    );

}

export default Rooms;