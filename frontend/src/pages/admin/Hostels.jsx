import { useEffect, useState } from "react";
import axios from "axios";

function Hostels() {

    const [hostels, setHostels] = useState([]);

    const [hostel, setHostel] = useState({

        hostelName: "",
        address: "",
        totalRooms: "",
        availableRooms: "",
        wardenName: "",
        wardenPhone: ""

    });

    const [editing, setEditing] = useState(false);

    const [hostelId, setHostelId] = useState(null);

    const loadHostels = async () => {

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

        setHostel({

            ...hostel,

            [e.target.name]: e.target.value

        });

    };

    const saveHostel = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await axios.put(

                    `http://localhost:8083/hostels/${hostelId}`,

                    hostel

                );

                alert("Hostel Updated");

            }

            else {

                await axios.post(

                    "http://localhost:8083/hostels",

                    hostel

                );

                alert("Hostel Added");

            }

            setHostel({

                hostelName: "",
                address: "",
                totalRooms: "",
                availableRooms: "",
                wardenName: "",
                wardenPhone: ""

            });

            setEditing(false);

            loadHostels();

        }

        catch (error) {

            console.log(error);

        }

    };

    const editHostel = (item) => {

        setEditing(true);

        setHostelId(item.hostelId);

        setHostel(item);

    };

    const deleteHostel = async (id) => {

        if (!window.confirm("Delete Hostel?"))
            return;

        try {

            await axios.delete(

                `http://localhost:8083/hostels/${id}`

            );

            loadHostels();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Hostel Management</h2>

            <form onSubmit={saveHostel}>

                <input
                    name="hostelName"
                    placeholder="Hostel Name"
                    value={hostel.hostelName}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="address"
                    placeholder="Address"
                    value={hostel.address}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="totalRooms"
                    placeholder="Total Rooms"
                    value={hostel.totalRooms}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="availableRooms"
                    placeholder="Available Rooms"
                    value={hostel.availableRooms}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="wardenName"
                    placeholder="Warden Name"
                    value={hostel.wardenName}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="wardenPhone"
                    placeholder="Warden Phone"
                    value={hostel.wardenPhone}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    {editing ? "Update Hostel" : "Add Hostel"}

                </button>

            </form>

            <hr />

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
                        <th>Name</th>
                        <th>Address</th>
                        <th>Total Rooms</th>
                        <th>Available Rooms</th>
                        <th>Warden</th>
                        <th>Phone</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        hostels.map((item) => (

                            <tr key={item.hostelId}>

                                <td>{item.hostelId}</td>

                                <td>{item.hostelName}</td>

                                <td>{item.address}</td>

                                <td>{item.totalRooms}</td>

                                <td>{item.availableRooms}</td>

                                <td>{item.wardenName}</td>

                                <td>{item.wardenPhone}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editHostel(item)
                                        }
                                    >

                                        Edit

                                    </button>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            deleteHostel(item.hostelId)
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

export default Hostels;