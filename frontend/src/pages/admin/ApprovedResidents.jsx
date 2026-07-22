import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import residentService from "../../services/residentService";

function ApprovedResidents() {
  const [residents, setResidents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const loadResidents = async () => {
    try {
      const response = await residentService.getApprovedResidents();
      setResidents(response.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load residents");
    }
  };

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await residentService.getApprovedResidents();
        setResidents(response.data);
      } catch (err) {
        console.error(err);
        alert("Unable to load residents");
      }
    };
    fetchResidents();
  }, []);

  const deleteResident = async (id) => {
    if (!window.confirm("Delete this resident?")) return;

    try {
      await residentService.deleteResident(id);
      alert("Resident Deleted Successfully");
      loadResidents();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  const filteredResidents = residents.filter((resident) =>
    resident.fullName.toLowerCase().includes(search.toLowerCase()) ||
    resident.email.toLowerCase().includes(search.toLowerCase()) ||
    resident.phone.includes(search)
  );

  return (
    <>
      <AdminSidebar />
      <AdminNavbar />

      <div
        style={{
          marginLeft: "250px",
          marginTop: "80px",
          padding: "25px",
        }}
      >
        <h2>Approved Residents</h2>

        <input
          type="text"
          placeholder="Search Resident..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            padding: "10px",
            marginTop: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 5px 10px rgba(0,0,0,.1)",
          }}
        >
          <thead
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            <tr>
              <th style={thStyle}>Resident Code</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Hostel Code</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredResidents.map((resident) => (
              <tr key={resident.residentId}>
                <td style={tdStyle}>{resident.residentCode}</td>
                <td style={tdStyle}>{resident.fullName}</td>
                <td style={tdStyle}>{resident.email}</td>
                <td style={tdStyle}>{resident.phone}</td>
                <td style={tdStyle}>{resident.hostelCode}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      navigate(`/admin/resident/${resident.residentId}`)
                    }
                    style={viewBtn}
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin/edit-resident/${resident.residentId}`)
                    }
                    style={editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteResident(resident.residentId)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const thStyle = {
  padding: "15px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const viewBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  marginRight: "8px",
  cursor: "pointer",
};

const editBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  marginRight: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ApprovedResidents;