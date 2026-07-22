import { useState } from "react";
import hostelService from "../../services/hostelService";

function HostelRegistration() {

    const [hostel, setHostel] = useState({

        hostelName: "",
        ownerName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        totalRooms: "",
        totalBeds: "",
        idProof: "",
        hostelLicense: ""

    });

    const handleChange = (e) => {

        setHostel({

            ...hostel,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await hostelService.registerHostel(hostel);

            alert("Registration Submitted Successfully");

            setHostel({
                hostelName: "",
                ownerName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                totalRooms: "",
                totalBeds: "",
                idProof: "",
                hostelLicense: ""
            });

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <div style={{ padding: "40px" }}>

            <h2>Hostel Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="hostelName"
                    placeholder="Hostel Name"
                    value={hostel.hostelName}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="ownerName"
                    placeholder="Owner Name"
                    value={hostel.ownerName}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="email"
                    placeholder="Email"
                    value={hostel.email}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={hostel.phone}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="address"
                    placeholder="Address"
                    value={hostel.address}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="city"
                    placeholder="City"
                    value={hostel.city}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="state"
                    placeholder="State"
                    value={hostel.state}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="pincode"
                    placeholder="Pincode"
                    value={hostel.pincode}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="totalRooms"
                    placeholder="Total Rooms"
                    value={hostel.totalRooms}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="totalBeds"
                    placeholder="Total Beds"
                    value={hostel.totalBeds}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="idProof"
                    placeholder="ID Proof"
                    value={hostel.idProof}
                    onChange={handleChange}
                /><br /><br />

                <input
                    name="hostelLicense"
                    placeholder="Hostel License"
                    value={hostel.hostelLicense}
                    onChange={handleChange}
                /><br /><br />

                <button>
                    Register Hostel
                </button>

            </form>

        </div>

    );

}

export default HostelRegistration;