import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard";

import {
  FaUserTie,
  FaUsers,
  FaBuilding,
  FaBed,
  FaDoorOpen,
  FaDoorClosed,
  FaExclamationCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

function Dashboard() {

  const stats = [
    {
      title: "Total Admins",
      count: 5,
      icon: <FaUserTie />,
      color: "#2563EB",
    },
    {
      title: "Total Students",
      count: 420,
      icon: <FaUsers />,
      color: "#22C55E",
    },
    {
      title: "Total Hostels",
      count: 4,
      icon: <FaBuilding />,
      color: "#7C3AED",
    },
    {
      title: "Total Rooms",
      count: 260,
      icon: <FaBed />,
      color: "#0EA5E9",
    },
    {
      title: "Occupied Rooms",
      count: 235,
      icon: <FaDoorClosed />,
      color: "#EF4444",
    },
    {
      title: "Available Rooms",
      count: 25,
      icon: <FaDoorOpen />,
      color: "#10B981",
    },
    {
      title: "Pending Complaints",
      count: 7,
      icon: <FaExclamationCircle />,
      color: "#F59E0B",
    },
    {
      title: "Fees Collected",
      count: "₹14,25,000",
      icon: <FaMoneyBillWave />,
      color: "#16A34A",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "30px",
          }}
        >
          <h2>Welcome Back 👋</h2>

          <p
            style={{
              color: "#64748B",
              marginBottom: "30px",
            }}
          >
            StayMate Super Admin Dashboard
          </p>

          {/* Dashboard Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
            }}
          >
            {stats.map((item, index) => (
              <DashboardCard
                key={index}
                title={item.title}
                count={item.count}
                icon={item.icon}
                color={item.color}
              />
            ))}
          </div>

          {/* Bottom Section */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px",
              marginTop: "35px",
            }}
          >
            {/* Recent Activities */}

            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,.08)",
              }}
            >
              <h3>Recent Activities</h3>

              <hr />

              <ul
                style={{
                  lineHeight: "45px",
                }}
              >
                <li>✅ New Admin Created</li>

                <li>✅ Boys Hostel Added</li>

                <li>✅ Complaint #24 Resolved</li>

                <li>✅ New Notice Published</li>

                <li>✅ Fee Report Generated</li>
              </ul>
            </div>

            {/* Quick Actions */}

            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,.08)",
              }}
            >
              <h3>Quick Actions</h3>

              <hr />

              <button className="action-btn">
                + Create Admin
              </button>

              <button className="action-btn">
                + Add Hostel
              </button>

              <button className="action-btn">
                + Publish Notice
              </button>

              <button className="action-btn">
                + Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .action-btn{
            width:100%;
            padding:14px;
            margin-top:15px;
            border:none;
            border-radius:8px;
            background:#2563EB;
            color:white;
            font-size:15px;
            cursor:pointer;
            transition:.3s;
        }

        .action-btn:hover{
            background:#1D4ED8;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;