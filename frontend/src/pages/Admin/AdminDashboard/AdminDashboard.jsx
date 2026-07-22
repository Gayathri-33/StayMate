import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const ownerName =
        localStorage.getItem("ownerName") || "Admin";

    const hostelName =
        localStorage.getItem("hostelName") ||
        "Sri Sai Boys Hostel";

    const statistics = [
        {
            title: "Total Residents",
            value: "120",
            icon: "👥",
            style: "blue"
        },
        {
            title: "Total Rooms",
            value: "80",
            icon: "🛏",
            style: "sage"
        },
        {
            title: "Occupied Rooms",
            value: "65",
            icon: "🔑",
            style: "blue"
        },
        {
            title: "Available Rooms",
            value: "15",
            icon: "✓",
            style: "sage"
        },
        {
            title: "Pending Complaints",
            value: "5",
            icon: "📢",
            style: "blue"
        },
        {
            title: "Pending Fees",
            value: "12",
            icon: "₹",
            style: "sage"
        },
        {
            title: "Today's Menu",
            value: "Updated",
            icon: "🍽",
            style: "blue"
        }
    ];

    const sidebarItems = [
        { name: "Dashboard", icon: "▦" },
        { name: "Hostel Details", icon: "⌂" },
        { name: "Residents", icon: "♟" },
        { name: "Rooms", icon: "▤" },
        { name: "Menu", icon: "☷" },
        { name: "Fees", icon: "₹" },
        { name: "Complaints", icon: "!" },
        { name: "Room Shift Requests", icon: "⇄" },
        { name: "Ratings & Feedback", icon: "☆" },
        { name: "Profile", icon: "○" }
    ];

    const recentActivities = [
        {
            title: "New resident added",
            description: "Rahul Kumar was added to Room 204.",
            time: "10 minutes ago",
            icon: "👤"
        },
        {
            title: "Fee payment received",
            description: "Monthly fee was received from Arjun Reddy.",
            time: "35 minutes ago",
            icon: "₹"
        },
        {
            title: "Complaint submitted",
            description: "A water supply complaint was submitted.",
            time: "1 hour ago",
            icon: "!"
        },
        {
            title: "Room shift requested",
            description: "Resident requested a shift from Room 105.",
            time: "2 hours ago",
            icon: "⇄"
        }
    ];

    const quickActions = [
        {
            name: "Add Room",
            description: "Add a new hostel room",
            icon: "▤"
        },
        {
            name: "Update Menu",
            description: "Update today's menu",
            icon: "☷"
        },
        {
            name: "Record Payment",
            description: "Add a fee payment",
            icon: "₹"
        }
    ];

    const handleSidebarItem = (itemName) => {

        setSidebarOpen(false);

        if (itemName === "Dashboard") {
            return;
        }

        alert(`${itemName} module will be added next.`);
    };

    const handleQuickAction = (actionName) => {
        alert(`${actionName} module will be added next.`);
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("ownerName");
        localStorage.removeItem("ownerEmail");
        localStorage.removeItem("hostelName");
        localStorage.removeItem("staymateHostel");
        localStorage.removeItem("hostelCreated");

        navigate("/");
    };

    return (
        <div className="admin-dashboard-page">

            {sidebarOpen && (

                <button
                    type="button"
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                ></button>

            )}

            <aside
                className={`admin-sidebar ${
                    sidebarOpen ? "admin-sidebar-open" : ""
                }`}
            >

                <div className="admin-sidebar-brand">

                    <div className="admin-sidebar-logo">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M4 21V6.5C4 5.67 4.67 5 5.5 5H14V21M14 9H18.5C19.33 9 20 9.67 20 10.5V21M2 21H22M8 9H10M8 13H10M8 17H10M17 13H18M17 17H18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </div>

                    <div>
                        <h2>StayMate</h2>
                        <p>Admin Portal</p>
                    </div>

                </div>

                <div className="admin-hostel-mini-card">

                    <span className="admin-hostel-mini-icon">
                        🏢
                    </span>

                    <div>
                        <p>Managing</p>
                        <h3>{hostelName}</h3>
                    </div>

                </div>

                <nav className="admin-sidebar-navigation">

                    <p className="admin-navigation-label">
                        Main menu
                    </p>

                    {sidebarItems.map((item) => (

                        <button
                            type="button"
                            key={item.name}
                            className={
                                item.name === "Dashboard"
                                    ? "admin-nav-item admin-nav-active"
                                    : "admin-nav-item"
                            }
                            onClick={() =>
                                handleSidebarItem(item.name)
                            }
                        >

                            <span className="admin-nav-icon">
                                {item.icon}
                            </span>

                            <span>{item.name}</span>

                        </button>

                    ))}

                </nav>

                <div className="admin-sidebar-bottom">

                    <button
                        type="button"
                        className="admin-logout-button"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>

            <div className="admin-main-content">

                <header className="admin-topbar">

                    <div className="admin-topbar-left">

                        <button
                            type="button"
                            className="admin-menu-button"
                            onClick={() =>
                                setSidebarOpen(!sidebarOpen)
                            }
                            aria-label="Open sidebar"
                        >
                            ☰
                        </button>

                        <div>
                            <h1>Admin Dashboard</h1>
                            <p>Welcome back, {ownerName}</p>
                        </div>

                    </div>

                    <div className="admin-topbar-actions">

                        <button
                            type="button"
                            className="admin-notification-button"
                            aria-label="Notifications"
                        >
                            ♢
                            <span></span>
                        </button>

                        <button
                            type="button"
                            className="admin-profile-button"
                            onClick={() =>
                                handleSidebarItem("Profile")
                            }
                        >

                            <span className="admin-profile-avatar">
                                {ownerName.charAt(0).toUpperCase()}
                            </span>

                            <span className="admin-profile-details">
                                <strong>{ownerName}</strong>
                                <small>Administrator</small>
                            </span>

                        </button>

                    </div>

                </header>

                <main className="admin-dashboard-content">

                    <section className="admin-welcome-banner">

                        <div className="admin-banner-content">

                            <span className="admin-banner-label">
                                Hostel Overview
                            </span>

                            <h2>{hostelName}</h2>

                            <p>
                                Monitor residents, rooms, fees,
                                complaints and daily hostel activities
                                from one place.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    handleSidebarItem(
                                        "Hostel Details"
                                    )
                                }
                            >
                                View Hostel Details
                                <span>→</span>
                            </button>

                        </div>

                        <div className="admin-occupancy-card">

                            <div className="admin-occupancy-top">

                                <div>
                                    <p>Room Occupancy</p>
                                    <h3>81%</h3>
                                </div>

                                <span>65 / 80 rooms</span>

                            </div>

                            <div className="admin-progress-track">
                                <div className="admin-progress-value"></div>
                            </div>

                            <div className="admin-occupancy-footer">

                                <span>
                                    <i className="occupied-dot"></i>
                                    65 Occupied
                                </span>

                                <span>
                                    <i className="available-dot"></i>
                                    15 Available
                                </span>

                            </div>

                        </div>

                    </section>

                    <section className="admin-statistics-section">

                        <div className="admin-section-heading">

                            <div>
                                <h2>Hostel Statistics</h2>
                                <p>
                                    Current overview of your hostel
                                </p>
                            </div>

                        </div>

                        <div className="admin-statistics-grid">

                            {statistics.map((statistic) => (

                                <article
                                    className="admin-stat-card"
                                    key={statistic.title}
                                >

                                    <div
                                        className={`admin-stat-icon ${statistic.style}`}
                                    >
                                        {statistic.icon}
                                    </div>

                                    <div className="admin-stat-information">
                                        <p>{statistic.title}</p>
                                        <h3>{statistic.value}</h3>
                                    </div>

                                </article>

                            ))}

                        </div>

                    </section>

                    <section className="admin-dashboard-bottom-grid">

                        <div className="admin-activity-section">

                            <div className="admin-section-heading">

                                <div>
                                    <h2>Recent Activities</h2>
                                    <p>
                                        Latest updates from your hostel
                                    </p>
                                </div>

                                <button type="button">
                                    View All
                                </button>

                            </div>

                            <div className="admin-activity-list">

                                {recentActivities.map((activity) => (

                                    <div
                                        className="admin-activity-item"
                                        key={activity.title}
                                    >

                                        <span className="admin-activity-icon">
                                            {activity.icon}
                                        </span>

                                        <div className="admin-activity-details">

                                            <h3>{activity.title}</h3>

                                            <p>
                                                {activity.description}
                                            </p>

                                        </div>

                                        <span className="admin-activity-time">
                                            {activity.time}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                        <div className="admin-quick-actions-section">

                            <div className="admin-section-heading">

                                <div>
                                    <h2>Quick Actions</h2>
                                    <p>Frequently used actions</p>
                                </div>

                            </div>

                            <div className="admin-quick-actions-grid">

                                {quickActions.map((action) => (

                                    <button
                                        type="button"
                                        key={action.name}
                                        onClick={() =>
                                            handleQuickAction(
                                                action.name
                                            )
                                        }
                                    >

                                        <span>{action.icon}</span>

                                        <div>
                                            <strong>
                                                {action.name}
                                            </strong>

                                            <small>
                                                {action.description}
                                            </small>
                                        </div>

                                    </button>

                                ))}

                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default AdminDashboard;