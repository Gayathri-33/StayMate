import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Students() {

    const [students, setStudents] = useState([]);

    const loadStudents = async () => {
        try {
            const response = await axios.get("http://localhost:8083/students");
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            await loadStudents();
        };

        fetchStudents();
    }, []);

    const deleteStudent = async (id) => {

        if (!window.confirm("Delete this student?"))
            return;

        try {

            await axios.delete(`http://localhost:8083/students/${id}`);
            loadStudents();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "25px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}
            >

                <h2>Students</h2>

                <Link to="/admin/add-student">

                    <button>Add Student</button>

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
                        <th>Roll No</th>
                        <th>College</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Gender</th>
                        <th>Parent</th>
                        <th>Phone</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        students.length === 0 ?

                            <tr>

                                <td colSpan="9" align="center">

                                    No Students Found

                                </td>

                            </tr>

                            :

                            students.map((student) => (

                                <tr key={student.studentId}>

                                    <td>{student.studentId}</td>

                                    <td>{student.rollNumber}</td>

                                    <td>{student.collegeName}</td>

                                    <td>{student.department}</td>

                                    <td>{student.year}</td>

                                    <td>{student.gender}</td>

                                    <td>{student.parentName}</td>

                                    <td>{student.parentPhone}</td>

                                    <td>

                                        <Link
                                            to={`/admin/edit-student/${student.studentId}`}
                                        >

                                            <button>Edit</button>

                                        </Link>

                                        {" "}

                                        <button
                                            onClick={() =>
                                                deleteStudent(student.studentId)
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

export default Students;