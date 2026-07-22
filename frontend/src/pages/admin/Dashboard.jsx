import Sidebar from "../../components/admin/AdminSidebar";
import Navbar from "../../components/admin/AdminNavbar";

function Dashboard() {

  return (

    <div style={{ display: "flex", background: "#F8FAFC" }}>

      <Sidebar />

      <div style={{ marginLeft: "250px", width: "100%" }}>

        <Navbar />

        <div style={{ padding: "30px" }}>

          <h2>Admin Dashboard</h2>

          <h4>Welcome to StayMate Admin Panel</h4>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;