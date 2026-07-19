import { useEffect, useState } from "react";
import axios from "axios";

function Complaints() {

    // Temporary Student ID
    const studentId = 1;

    const [complaints, setComplaints] = useState([]);

    const [complaint, setComplaint] = useState({

        category: "",
        complaintTitle: "",
        complaintDescription: ""

    });

    const loadComplaints = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8083/complaints"
            );

            // Temporary filtering until login is implemented
            const myComplaints = response.data.filter(

                c => c.student && c.student.studentId === studentId

            );

            setComplaints(myComplaints);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchComplaints = async () => {

            await loadComplaints();

        };

        fetchComplaints();

    }, []);

    const handleChange = (e) => {

        setComplaint({

            ...complaint,

            [e.target.name]: e.target.value

        });

    };

    const submitComplaint = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:8083/complaints",

                {

                    ...complaint,

                    student: {

                        studentId: studentId

                    }

                }

            );

            alert("Complaint Submitted Successfully");

            setComplaint({

                category: "",

                complaintTitle: "",

                complaintDescription: ""

            });

            loadComplaints();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Submit Complaint");

        }

    };

    return (

        <div style={{padding:"20px"}}>

            <h2>My Complaints</h2>

            <form onSubmit={submitComplaint}>

                <select

                    name="category"

                    value={complaint.category}

                    onChange={handleChange}

                    required

                >

                    <option value="">Select Category</option>

                    <option value="WATER">Water</option>

                    <option value="ELECTRICITY">Electricity</option>

                    <option value="WIFI">WiFi</option>

                    <option value="FOOD">Food</option>

                    <option value="CLEANING">Cleaning</option>

                    <option value="SECURITY">Security</option>

                    <option value="OTHERS">Others</option>

                </select>

                <br/><br/>

                <input

                    type="text"

                    name="complaintTitle"

                    placeholder="Complaint Title"

                    value={complaint.complaintTitle}

                    onChange={handleChange}

                    required

                />

                <br/><br/>

                <textarea

                    rows="5"

                    cols="50"

                    name="complaintDescription"

                    placeholder="Describe your complaint"

                    value={complaint.complaintDescription}

                    onChange={handleChange}

                    required

                />

                <br/><br/>

                <button type="submit">

                    Submit Complaint

                </button>

            </form>

            <hr/>

            <h3>Complaint History</h3>

            <table

                border="1"

                cellPadding="10"

                style={{

                    width:"100%",

                    borderCollapse:"collapse"

                }}

            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Category</th>

                        <th>Title</th>

                        <th>Description</th>

                        <th>Status</th>

                        <th>Admin Remarks</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        complaints.length === 0 ?

                        <tr>

                            <td colSpan="7" align="center">

                                No Complaints Found

                            </td>

                        </tr>

                        :

                        complaints.map((item)=>(

                            <tr key={item.complaintId}>

                                <td>{item.complaintId}</td>

                                <td>{item.category}</td>

                                <td>{item.complaintTitle}</td>

                                <td>{item.complaintDescription}</td>

                                <td>{item.status}</td>

                                <td>{item.adminRemarks}</td>

                                <td>{item.complaintDate}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Complaints;