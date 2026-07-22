import {
  FaUsers,
  FaDoorOpen,
  FaBed,
  FaClipboardList,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaUserPlus,
  FaHome,
} from "react-icons/fa";

import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

function Dashboard() {
  const cards = [
    {
      title: "Residents",
      value: 128,
      color: "#2563EB",
      icon: <FaUsers size={28} color="white" />,
    },
    {
      title: "Rooms",
      value: 42,
      color: "#059669",
      icon: <FaDoorOpen size={28} color="white" />,
    },
    {
      title: "Occupied Beds",
      value: 98,
      color: "#DC2626",
      icon: <FaBed size={28} color="white" />,
    },
    {
      title: "Available Beds",
      value: 30,
      color: "#7C3AED",
      icon: <FaBed size={28} color="white" />,
    },
    {
      title: "Pending Requests",
      value: 12,
      color: "#F59E0B",
      icon: <FaClipboardList size={28} color="white" />,
    },
    {
      title: "Complaints",
      value: 4,
      color: "#EF4444",
      icon: <FaExclamationCircle size={28} color="white" />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "#F1F5F9",
        minHeight: "100vh",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
        }}
      >
        <AdminNavbar />

        <div style={{ padding: "30px" }}>
          {/* Welcome Section */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)",
              color: "white",
              padding: "35px",
              borderRadius: "15px",
              marginBottom: "30px",
              boxShadow: "0 10px 25px rgba(0,0,0,.15)",
            }}
          >
            <h2>Welcome Admin 👋</h2>

            <p style={{ marginTop: "10px", fontSize: "16px" }}>
              Manage residents, rooms, complaints and hostel operations from one
              dashboard.
            </p>
          </div>

          {/* Dashboard Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
            }}
          >
            {cards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                  transition: ".3s",
                  cursor: "pointer",
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "#64748B",
                      marginBottom: "10px",
                    }}
                  >
                    {card.title}
                  </h3>

                  <h1
                    style={{
                      color: "#0F172A",
                      margin: 0,
                    }}
                  >
                    {card.value}
                  </h1>
                </div>

                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "15px",
                    background: card.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "25px",
              marginTop: "35px",
            }}
          >
            {/* Recent Activities */}

            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              }}
            >
              <h3>Recent Activities</h3>

              <hr />

              <p>✅ Resident Rahul registered.</p>

              <p>🏠 Room 102 assigned.</p>

              <p>🛏️ Bed B3 allocated.</p>

              <p>💰 Monthly fee collected.</p>

              <p>📢 Complaint submitted.</p>
            </div>

            {/* Quick Actions */}

            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              }}
            >
              <h3>Quick Actions</h3>

              <hr />

              <button
                style={buttonStyle}
              >
                <FaUserPlus />

                Add Resident
              </button>

              <button
                style={buttonStyle}
              >
                <FaDoorOpen />

                Add Room
              </button>

              <button
                style={buttonStyle}
              >
                <FaHome />

                Allocate Bed
              </button>

              <button
                style={buttonStyle}
              >
                <FaMoneyBillWave />

                Collect Fee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  border: "none",
  borderRadius: "10px",
  background: "#2563EB",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
};

export default Dashboard;