import { useEffect, useState } from "react";
import axios from "axios";

function Complaints() {

    const [complaints, setComplaints] = useState([]);

    const loadComplaints = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8083/complaints"
            );

            setComplaints(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchComplaints = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8083/complaints"
                );

                setComplaints(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchComplaints();

    }, []);

    const updateComplaint = async (complaint) => {

        try {

            await axios.put(

                `http://localhost:8083/complaints/${complaint.complaintId}`,

                complaint

            );

            loadComplaints();

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleStatus = (complaint, value) => {

        complaint.status = value;

        if(value === "RESOLVED"){

            complaint.resolvedDate = new Date();

        }

        updateComplaint(complaint);

    };

    const handleRemarks = (complaint, value) => {

        complaint.adminRemarks = value;

        setComplaints([...complaints]);

    };

    const deleteComplaint = async (id) => {

        if(!window.confirm("Delete Complaint?"))
            return;

        try{

            await axios.delete(

                `http://localhost:8083/complaints/${id}`

            );

            loadComplaints();

        }

        catch(error){

            console.log(error);

        }

    };

    return(

        <div style={{padding:"20px"}}>

            <h2>Complaint Management</h2>

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

                        <th>Student</th>

                        <th>Category</th>

                        <th>Title</th>

                        <th>Description</th>

                        <th>Status</th>

                        <th>Remarks</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                {

                    complaints.map((item)=>(

                        <tr key={item.complaintId}>

                            <td>{item.complaintId}</td>

                            <td>

                                {

                                    item.student ?

                                    item.student.rollNumber :

                                    "-"

                                }

                            </td>

                            <td>{item.category}</td>

                            <td>{item.complaintTitle}</td>

                            <td>{item.complaintDescription}</td>

                            <td>

                                <select

                                    value={item.status}

                                    onChange={(e)=>

                                        handleStatus(item,e.target.value)

                                    }

                                >

                                    <option value="PENDING">

                                        Pending

                                    </option>

                                    <option value="IN_PROGRESS">

                                        In Progress

                                    </option>

                                    <option value="RESOLVED">

                                        Resolved

                                    </option>

                                </select>

                            </td>

                            <td>

                                <input

                                    type="text"

                                    value={item.adminRemarks || ""}

                                    onChange={(e)=>

                                        handleRemarks(item,e.target.value)

                                    }

                                />

                            </td>

                            <td>

                                <button

                                    onClick={()=>

                                        updateComplaint(item)

                                    }

                                >

                                    Save

                                </button>

                                {" "}

                                <button

                                    onClick={()=>

                                        deleteComplaint(item.complaintId)

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

export default Complaints;