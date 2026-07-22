import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import adminService from "../../services/adminService";

function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  });

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const response = await adminService.getAdminById(id);

        setAdmin({
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          password: ""
        });
      } catch (error) {
        console.error(error);
        alert("Failed to Load Admin");
      }
    };

    loadAdmin();
  }, [id]);

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adminService.updateAdmin(id, admin);

      alert("Admin Updated Successfully");

      navigate("/superadmin/admins");
    } catch (error) {
      console.error(error);

      alert("Failed to Update Admin");
    }
  };

  return (
    <div style={{ display: "flex", background: "#F8FAFC" }}>
      <Sidebar />

      <div style={{ marginLeft: "250px", width: "100%" }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h2>Edit Admin</h2>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: "30px",
              maxWidth: "600px",
              borderRadius: "10px"
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
              placeholder="Leave blank to keep existing password"
              style={inputStyle}
            />

            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Update Admin
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
  marginTop: "5px",
  marginBottom: "18px",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

export default EditAdmin;