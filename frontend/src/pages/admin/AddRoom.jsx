import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRoom() {

    const navigate = useNavigate();

    const [hostels, setHostels] = useState([]);

    const [room, setRoom] = useState({

        roomNumber: "",
        floorNumber: "",
        roomType: "",
        capacity: "",
        occupiedCount: "",
        monthlyFee: "",
        roomStatus: "",
        hostel: {
            hostelId: ""
        }

    });

    useEffect(() => {

        const fetchHostels = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8083/hostels"
                );

                setHostels(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchHostels();

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "hostelId") {

            setRoom({

                ...room,

                hostel: {

                    hostelId: value

                }

            });

        }

        else {

            setRoom({

                ...room,

                [name]: value

            });

        }

    };

    const saveRoom = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:8083/rooms",

                room

            );

            alert("Room Added Successfully");

            navigate("/admin/rooms");

        }

        catch (error) {

            console.log(error);

            alert("Unable to Save Room");

        }

    };

    return (

        <div style={{ width: "600px", margin: "20px auto" }}>

            <h2>Add Room</h2>

            <form onSubmit={saveRoom}>

                <input
                    type="text"
                    name="roomNumber"
                    placeholder="Room Number"
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="floorNumber"
                    placeholder="Floor Number"
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="roomType"
                    onChange={handleChange}
                >

                    <option value="">Select Room Type</option>

                    <option value="SINGLE">Single</option>

                    <option value="DOUBLE">Double</option>

                    <option value="TRIPLE">Triple</option>

                    <option value="FOUR_SHARING">Four Sharing</option>

                </select>

                <br /><br />

                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="occupiedCount"
                    placeholder="Occupied Count"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="monthlyFee"
                    placeholder="Monthly Fee"
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="roomStatus"
                    onChange={handleChange}
                >

                    <option value="">Room Status</option>

                    <option value="AVAILABLE">Available</option>

                    <option value="FULL">Full</option>

                    <option value="MAINTENANCE">Maintenance</option>

                </select>

                <br /><br />

                <select
                    name="hostelId"
                    onChange={handleChange}
                >

                    <option value="">Select Hostel</option>

                    {

                        hostels.map((hostel) => (

                            <option
                                key={hostel.hostelId}
                                value={hostel.hostelId}
                            >

                                {hostel.hostelName}

                            </option>

                        ))

                    }

                </select>

                <br /><br />

                <button type="submit">

                    Save Room

                </button>

            </form>

        </div>

    );

}

export default AddRoom;