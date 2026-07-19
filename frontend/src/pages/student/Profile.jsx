import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    // Temporary student id
    const studentId = 1;

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

        const loadProfile = async () => {

            try {

                const response = await axios.get(

                    `http://localhost:8083/students/${studentId}`

                );

                setStudent(response.data);

            }

            catch(error){

                console.log(error);

            }

        };

        loadProfile();

    }, []);

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const updateProfile = async (e) => {

        e.preventDefault();

        try{

            await axios.put(

                `http://localhost:8083/students/${studentId}`,

                student

            );

            alert("Profile Updated Successfully");

        }

        catch(error){

            console.log(error);

            alert("Unable to Update");

        }

    };

    return (

        <div style={{padding:"20px"}}>

            <h2>My Profile</h2>

            <form onSubmit={updateProfile}>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={student.fullName}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={student.phone}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="text"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={student.rollNumber}
                    readOnly
                />

                <br/><br/>

                <input
                    type="text"
                    name="collegeName"
                    placeholder="College"
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

                <button type="submit">

                    Update Profile

                </button>

            </form>

        </div>

    );

}

export default Profile;