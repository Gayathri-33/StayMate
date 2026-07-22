import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import dashboardService from "../../services/dashboardService";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    totalAdmins: 0,
    totalHostels: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    pendingComplaints: 0,
    feeCollected: 0
  });

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        const response = await dashboardService.getDashboardData();

        if (isMounted) {
          setDashboard(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (

    <div style={{ display: "flex", background: "#F8FAFC" }}>

      <Sidebar />

      <div style={{ marginLeft: "250px", width: "100%" }}>

        <Navbar />

        <div style={{ padding: "30px" }}>

          <h2>Super Admin Dashboard</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginTop: "25px"
            }}
          >

            <Card title="Total Admins" value={dashboard.totalAdmins} />
            <Card title="Total Hostels" value={dashboard.totalHostels} />
            <Card title="Total Rooms" value={dashboard.totalRooms} />
            <Card title="Occupied Rooms" value={dashboard.occupiedRooms} />
            <Card title="Available Rooms" value={dashboard.availableRooms} />
            <Card title="Pending Complaints" value={dashboard.pendingComplaints} />
            <Card title="Fee Collected" value={`₹ ${dashboard.feeCollected}`} />

          </div>

        </div>

      </div>

    </div>

  );

}

function Card({ title, value }) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h3>{title}</h3>

      <h1
        style={{
          color: "#2563EB",
          marginTop: "15px"
        }}
      >
        {value}
      </h1>

    </div>

  );

}

export default Dashboard;