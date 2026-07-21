import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import superAdminService from "../../services/superAdminService";

function AddAdmin() {

  const [admin, setAdmin] = useState({

    fullName: "",
    email: "",
    phone: "",
    password: ""

  });

  const handleChange = (e) => {

    setAdmin({

      ...admin,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  console.log("Sending:", admin);

  try {

    const response = await superAdminService.addAdmin(admin);

    console.log("Success:", response.data);

    alert("Admin Created Successfully");

    setAdmin({
      fullName: "",
      email: "",
      phone: "",
      password: ""
    });

  } catch (error) {

    console.error(error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    }

    alert("Failed to Create Admin");

  }

};

  return (

    <div style={{ display: "flex", background: "#F8FAFC" }}>

      <Sidebar />

      <div style={{ marginLeft: "250px", width: "100%" }}>

        <Navbar />

        <div style={{ padding: "30px" }}>

          <h2>Create New Admin</h2>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              maxWidth: "600px"
            }}
          >

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={admin.fullName}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={admin.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              style={inputStyle}
            />

            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "#2563EB",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Create Admin
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",
  padding: "12px",
  marginBottom: "18px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc"

};

export default AddAdmin;