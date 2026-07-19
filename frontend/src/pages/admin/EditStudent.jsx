import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditStudent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState({

        fullName: "",
        email: "",
        phone: "",
        rollNumber: "",
        collegeName: "",
        department: "",
        year: "",
        gender: "",
        joiningDate: "",
        parentName: "",
        parentPhone: "",
        address: "",
        profileImage: ""

    });

    useEffect(() => {

        const loadStudent = async () => {

            try {

                const response = await axios.get(

                    `http://localhost:8083/students/${id}`

                );

                setStudent(response.data);

            }

            catch(error){

                console.log(error);

            }

        };

        loadStudent();

    }, [id]);

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const updateStudent = async (e) => {

        e.preventDefault();

        try{

            await axios.put(

                `http://localhost:8083/students/${id}`,

                student

            );

            alert("Student Updated Successfully");

            navigate("/admin/students");

        }

        catch(error){

            console.log(error);

            alert("Unable to Update Student");

        }

    };

    return(

        <div style={{padding:"20px"}}>

            <h2>Edit Student</h2>

            <form onSubmit={updateStudent}>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={student.fullName}
                    onChange={handleChange}
                    required
                />

                <br/><br/>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                    required
                />

                <br/><br/>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={student.phone}
                    onChange={handleChange}
                    required
                />

                <br/><br/>

                <input
                    type="text"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={student.rollNumber}
                    onChange={handleChange}
                    required
                />

                <br/><br/>

                <input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    value={student.collegeName}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={student.department}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={student.year}
                    onChange={handleChange}
                />

                <br/><br/>

                <select
                    name="gender"
                    value={student.gender}
                    onChange={handleChange}
                >

                    <option value="">Select Gender</option>

                    <option value="MALE">Male</option>

                    <option value="FEMALE">Female</option>

                    <option value="OTHER">Other</option>

                </select>

                <br/><br/>

                <input
                    type="date"
                    name="joiningDate"
                    value={student.joiningDate}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="text"
                    name="parentName"
                    placeholder="Parent Name"
                    value={student.parentName}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="text"
                    name="parentPhone"
                    placeholder="Parent Phone"
                    value={student.parentPhone}
                    onChange={handleChange}
                />

                <br/><br/>

                <textarea
                    name="address"
                    placeholder="Address"
                    value={student.address}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="text"
                    name="profileImage"
                    placeholder="Profile Image URL"
                    value={student.profileImage}
                    onChange={handleChange}
                />

                <br/><br/>

                <button type="submit">

                    Update Student

                </button>

            </form>

        </div>

    );

}

export default EditStudent;