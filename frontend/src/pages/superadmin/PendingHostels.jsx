import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import hostelService from "../../services/hostelService";

function PendingHostels() {

    const [hostels, setHostels] = useState([]);

    const loadPendingHostels = async () => {
        try {
            const response = await hostelService.getPendingHostels();
            setHostels(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // call async loader inside effect to avoid synchronous setState in effect body
        const fetchPending = async () => {
            await loadPendingHostels();
        };

        fetchPending();
    }, []);


    const approveHostel = async (id) => {

        try {

            await hostelService.approveHostel(id);

            alert("Hostel Approved Successfully");

            loadPendingHostels();

        } catch (error) {

            console.log(error);

        }

    };

    const rejectHostel = async (id) => {

        if (!window.confirm("Reject this Hostel?")) return;

        try {

            await hostelService.rejectHostel(id);

            alert("Hostel Rejected");

            loadPendingHostels();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ display: "flex", background: "#F8FAFC" }}>

            <Sidebar />

            <div style={{ marginLeft: "250px", width: "100%" }}>

                <Navbar />

                <div style={{ padding: "30px" }}>

                    <h2>Pending Hostel Requests</h2>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            background: "#fff"
                        }}
                    >

                        <thead>

                            <tr style={{ background: "#2563EB", color: "#fff" }}>

                                <th style={th}>ID</th>
                                <th style={th}>Hostel</th>
                                <th style={th}>Owner</th>
                                <th style={th}>Email</th>
                                <th style={th}>Phone</th>
                                <th style={th}>Status</th>
                                <th style={th}>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {hostels.length === 0 ? (

                                <tr>

                                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>

                                        No Pending Requests

                                    </td>

                                </tr>

                            ) : (

                                hostels.map((hostel) => (

                                    <tr key={hostel.hostelId}>

                                        <td style={td}>{hostel.hostelId}</td>
                                        <td style={td}>{hostel.hostelName}</td>
                                        <td style={td}>{hostel.ownerName}</td>
                                        <td style={td}>{hostel.email}</td>
                                        <td style={td}>{hostel.phone}</td>
                                        <td style={td}>{hostel.status}</td>

                                        <td style={td}>

                                            <button
                                                style={approveBtn}
                                                onClick={() => approveHostel(hostel.hostelId)}
                                            >
                                                Approve
                                            </button>

                                            <button
                                                style={rejectBtn}
                                                onClick={() => rejectHostel(hostel.hostelId)}
                                            >
                                                Reject
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

const th = {
    padding: "12px",
    border: "1px solid #ddd"
};

const td = {
    padding: "12px",
    border: "1px solid #ddd"
};

const approveBtn = {
    background: "#22C55E",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px"
};

const rejectBtn = {
    background: "#EF4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer"
};

export default PendingHostels;