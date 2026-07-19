import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({

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

    const handleChange = (e) => {

        setStudent({

            ...student,
            [e.target.name]: e.target.value

        });

    };

    const saveStudent = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8083/students",
                student
            );

            alert("Student Added Successfully");

            navigate("/admin/students");

        }

        catch (err) {

            console.log(err);

            alert("Unable to save student");

        }

    };

    return (

        <div style={{ width: "60%", margin: "20px auto" }}>

            <h2>Add Student</h2>

            <form onSubmit={saveStudent}>

                <input
                    type="text"
                    name="rollNumber"
                    placeholder="Roll Number"
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <select
                    name="gender"
                    onChange={handleChange}
                    required
                >

                    <option value="">Select Gender</option>

                    <option value="MALE">Male</option>

                    <option value="FEMALE">Female</option>

                    <option value="OTHER">Other</option>

                </select>

                <br /><br />

                <input
                    type="date"
                    name="joiningDate"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="parentName"
                    placeholder="Parent Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="parentPhone"
                    placeholder="Parent Phone"
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    rows="4"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="profileImage"
                    placeholder="Profile Image URL"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    Save Student

                </button>

            </form>

        </div>

    );

}

export default AddStudent;