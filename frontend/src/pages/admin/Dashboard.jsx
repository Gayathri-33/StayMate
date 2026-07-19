import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    return (

        <div style={{ padding: "30px" }}>

            <h1>StayMate Admin Dashboard</h1>

            <p>Welcome Admin 👋</p>

            <hr />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >

                <DashboardCard
                    title="Students"
                    color="#1976d2"
                    onClick={() => navigate("/admin/students")}
                />

                <DashboardCard
                    title="Rooms"
                    color="#388e3c"
                    onClick={() => navigate("/admin/rooms")}
                />

                <DashboardCard
                    title="Hostels"
                    color="#7b1fa2"
                    onClick={() => navigate("/admin/hostels")}
                />

                <DashboardCard
                    title="Complaints"
                    color="#d32f2f"
                    onClick={() => navigate("/admin/complaints")}
                />

                <DashboardCard
                    title="Payments"
                    color="#f57c00"
                    onClick={() => navigate("/admin/payments")}
                />

                <DashboardCard
                    title="Menu"
                    color="#0097a7"
                    onClick={() => navigate("/admin/menu")}
                />

                <DashboardCard
                    title="Notices"
                    color="#5d4037"
                    onClick={() => navigate("/admin/notices")}
                />

            </div>

        </div>

    );

}

function DashboardCard({ title, color, onClick }) {

    return (

        <div

            onClick={onClick}

            style={{

                background: color,
                color: "white",
                padding: "35px",
                borderRadius: "10px",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "bold"

            }}

        >

            {title}

        </div>

    );

}

export default Dashboard;