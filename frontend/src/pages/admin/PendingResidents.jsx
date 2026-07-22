import { useEffect, useState } from "react";
import residentService from "../../services/residentService";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

function PendingResidents() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadResidents = async () => {
    try {
      const response = await residentService.getPendingResidents();
      setResidents(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load residents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const response = await residentService.getPendingResidents();
        setResidents(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load residents.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const approveResident = async (id) => {
    if (!window.confirm("Approve this resident?")) return;

    try {
      await residentService.approveResident(id);
      alert("Resident Approved Successfully");
      loadResidents();
    } catch (error) {
      console.error(error);
      alert("Approval Failed");
    }
  };

  const rejectResident = async (id) => {
    if (!window.confirm("Reject this resident?")) return;

    try {
      await residentService.rejectResident(id);
      alert("Resident Rejected Successfully");
      loadResidents();
    } catch (error) {
      console.error(error);
      alert("Rejection Failed");
    }
  };

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
        <h2>Pending Residents</h2>

        {loading ? (
          <h3>Loading...</h3>
        ) : residents.length === 0 ? (
          <h3>No Pending Residents</h3>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              background: "#fff",
              boxShadow: "0 3px 10px rgba(0,0,0,.1)",
            }}
          >
            <thead
              style={{
                background: "#2563eb",
                color: "#fff",
              }}
            >
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Hostel Code</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {residents.map((resident) => (
                <tr key={resident.residentId}>
                  <td style={tdStyle}>{resident.fullName}</td>
                  <td style={tdStyle}>{resident.email}</td>
                  <td style={tdStyle}>{resident.phone}</td>
                  <td style={tdStyle}>{resident.hostelCode}</td>

                  <td style={tdStyle}>
                    <button
                      onClick={() => approveResident(resident.residentId)}
                      style={{
                        background: "#16a34a",
                        color: "#fff",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectResident(resident.residentId)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

export default PendingResidents;