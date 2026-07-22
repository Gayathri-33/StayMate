import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

function EditResident() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />

        <div style={{ padding: "30px" }}>
          <h2>Edit Resident</h2>
          <p>This page is under development.</p>
        </div>
      </div>
    </div>
  );
}

export default EditResident;