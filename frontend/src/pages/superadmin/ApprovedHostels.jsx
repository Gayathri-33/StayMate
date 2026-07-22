import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import hostelService from "../../services/hostelService";

function ApprovedHostels() {

    const [hostels, setHostels] = useState([]);

    useEffect(() => {
        const fetchHostels = async () => {
            try {
                const response = await hostelService.getApprovedHostels();
                setHostels(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHostels();
    }, []);

    return (

        <div style={{ display: "flex", background: "#F8FAFC" }}>

            <Sidebar />

            <div style={{ marginLeft: "250px", width: "100%" }}>

                <Navbar />

                <div style={{ padding: "30px" }}>

                    <h2>Approved Hostels</h2>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            background: "#fff"
                        }}
                    >

                        <thead>

                            <tr style={{ background: "#2563EB", color: "#fff" }}>

                                <th style={th}>Code</th>
                                <th style={th}>Hostel</th>
                                <th style={th}>Owner</th>
                                <th style={th}>Email</th>
                                <th style={th}>Phone</th>
                                <th style={th}>City</th>
                                <th style={th}>Rooms</th>
                                <th style={th}>Beds</th>

                            </tr>

                        </thead>

                        <tbody>

                            {hostels.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        style={{ textAlign: "center", padding: "20px" }}
                                    >

                                        No Approved Hostels

                                    </td>

                                </tr>

                            ) : (

                                hostels.map((hostel) => (

                                    <tr key={hostel.hostelId}>

                                        <td style={td}>{hostel.hostelCode}</td>
                                        <td style={td}>{hostel.hostelName}</td>
                                        <td style={td}>{hostel.ownerName}</td>
                                        <td style={td}>{hostel.email}</td>
                                        <td style={td}>{hostel.phone}</td>
                                        <td style={td}>{hostel.city}</td>
                                        <td style={td}>{hostel.totalRooms}</td>
                                        <td style={td}>{hostel.totalBeds}</td>

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

const th = {
    padding: "12px",
    border: "1px solid #ddd"
};

const td = {
    padding: "12px",
    border: "1px solid #ddd"
};

export default ApprovedHostels;