import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import adminService from "../../services/adminService";

function AdminList() {
  const [admins, setAdmins] = useState([]);

  const loadAdmins = async () => {
    try {
      const response = await adminService.getAdmins();
      setAdmins(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAdmins = async () => {
      try {
        const response = await adminService.getAdmins();

        if (isMounted) {
          setAdmins(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchAdmins();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmDelete) return;

    try {
      await adminService.deleteAdmin(id);

      alert("Admin Deleted Successfully");

      loadAdmins();
    } catch (error) {
      console.error(error);

      alert("Failed to Delete Admin");
    }
  };

  return (
    <div style={{ display: "flex", background: "#F8FAFC" }}>
      <Sidebar />

      <div style={{ marginLeft: "250px", width: "100%" }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h2>Admin List</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr style={{ background: "#2563EB", color: "#fff" }}>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Phone</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Admins Found
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.userId}>
                    <td style={td}>{admin.userId}</td>
                    <td style={td}>{admin.fullName}</td>
                    <td style={td}>{admin.email}</td>
                    <td style={td}>{admin.phone}</td>
                    <td style={td}>{admin.status}</td>

                    <td style={td}>
                      <button style={editBtn}>
                        Edit
                      </button>

                      <button
                        style={deleteBtn}
                        onClick={() => handleDelete(admin.userId)}
                      >
                        Delete
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
  border: "1px solid #ddd",
};

const td = {
  padding: "12px",
  border: "1px solid #ddd",
};

const editBtn = {
  background: "#22C55E",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteBtn = {
  background: "#EF4444",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminList;