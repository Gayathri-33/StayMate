import { useNavigate } from "react-router-dom";
import "./ResidentDashboard.css";

function getSavedData(key) {

    try {

        return (
            JSON.parse(
                localStorage.getItem(key)
            ) || {}
        );

    } catch {
        return {};
    }
}

function ResidentDashboard() {

    const navigate = useNavigate();

    const resident =
        getSavedData("resident");

    const hostel =
        getSavedData("staymateHostel");

    const residentName =
        resident.fullName ||
        resident.name ||
        localStorage.getItem("residentName") ||
        "Resident";

    const roomNumber =
        resident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "204";

    const hostelName =
        resident.hostelName ||
        hostel.hostelName ||
        localStorage.getItem("hostelName") ||
        "Sri Sai Boys Hostel";

    const monthlyFee =
        resident.monthlyFee || 6500;

    const pendingFee =
        resident.pendingFee || 6500;

    const quickActions = [
        {
            title: "View Menu",
            description: "Check today’s meals",
            path: "/resident/menu",
            icon: "menu"
        },
        {
            title: "Pay Fees",
            description: "Pay hostel fees",
            path: "/resident/fees",
            icon: "fees"
        },
        {
            title: "Room Details",
            description: "View room information",
            path: "/resident/room-details",
            icon: "room"
        },
        {
            title: "Room Shift",
            description: "Request a room change",
            path: "/resident/room-shift",
            icon: "shift"
        },
        {
            title: "Raise Complaint",
            description: "Report a hostel issue",
            path: "/resident/complaints",
            icon: "complaint"
        },
        {
            title: "Hostel Feedback",
            description: "Rate your experience",
            path: "/resident/feedback",
            icon: "feedback"
        },
        {
            title: "Manage Profile",
            description: "Update your details",
            path: "/resident/profile",
            icon: "profile"
        }
    ];

    const todayMenu = [
        {
            meal: "Breakfast",
            time: "7:30 AM – 9:00 AM",
            food: "Idli, Sambar and Chutney",
            icon: "breakfast"
        },
        {
            meal: "Lunch",
            time: "12:30 PM – 2:00 PM",
            food: "Rice, Dal, Curry and Curd",
            icon: "lunch"
        },
        {
            meal: "Snacks",
            time: "4:30 PM – 5:30 PM",
            food: "Tea and Samosa",
            icon: "snacks"
        },
        {
            meal: "Dinner",
            time: "7:30 PM – 9:00 PM",
            food: "Chapati, Rice and Paneer Curry",
            icon: "dinner"
        }
    ];

    const recentActivities = [
        {
            title: "Room allocation approved",
            description:
                `Room ${roomNumber} was allocated to you.`,
            time: "Yesterday",
            icon: "room"
        },
        {
            title: "Monthly fee generated",
            description:
                "Your hostel fee for July is available.",
            time: "2 days ago",
            icon: "fees"
        },
        {
            title: "Menu updated",
            description:
                "The weekly hostel menu was updated.",
            time: "3 days ago",
            icon: "menu"
        }
    ];

    const hostelNotices = [
        {
            title: "Hostel inspection",
            description:
                "Room inspection will be conducted on Saturday at 10:00 AM.",
            date: "25 July",
            type: "Important"
        },
        {
            title: "Water supply maintenance",
            description:
                "Water supply may be interrupted between 2:00 PM and 4:00 PM.",
            date: "24 July",
            type: "Maintenance"
        },
        {
            title: "Weekend special dinner",
            description:
                "A special dinner will be served on Sunday.",
            date: "26 July",
            type: "General"
        }
    ];

    const formattedFee =
        Number(monthlyFee).toLocaleString("en-IN");

    const formattedPendingFee =
        Number(pendingFee).toLocaleString("en-IN");

    return (
        <div className="resident-dashboard-page">

            <section className="resident-dashboard-banner">

                <div className="resident-dashboard-banner-content">

                    <span className="resident-dashboard-label">
                        Resident Overview
                    </span>

                    <h2>
                        Welcome back, {residentName}
                        <span> 👋</span>
                    </h2>

                    <p>
                        Manage your hostel room, meals, fees,
                        complaints and requests from one place.
                    </p>

                    <div className="resident-dashboard-banner-actions">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/resident/menu")
                            }
                        >
                            View Today&apos;s Menu
                            <span>→</span>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/resident/room-details"
                                )
                            }
                        >
                            View Room
                        </button>

                    </div>

                </div>

                <div className="resident-dashboard-room-card">

                    <span className="dashboard-room-label">
                        Your Room
                    </span>

                    <strong>{roomNumber}</strong>

                    <p>
                        {resident.roomType ||
                            resident.preferredRoomType ||
                            "Two Sharing"}
                    </p>

                    <span className="dashboard-room-status">
                        <i></i>
                        Allocated
                    </span>

                </div>

            </section>

            <section className="resident-dashboard-summary">

                <article>

                    <span className="dashboard-summary-icon">
                        <DashboardIcon name="room" />
                    </span>

                    <div>
                        <p>Room Number</p>
                        <h3>{roomNumber}</h3>
                        <small>Block A • Second Floor</small>
                    </div>

                </article>

                <article>

                    <span className="dashboard-summary-icon">
                        <DashboardIcon name="fees" />
                    </span>

                    <div>
                        <p>Pending Fee</p>
                        <h3>₹{formattedPendingFee}</h3>
                        <small>Due on 10 August 2026</small>
                    </div>

                </article>

                <article>

                    <span className="dashboard-summary-icon">
                        <DashboardIcon name="complaint" />
                    </span>

                    <div>
                        <p>Open Complaints</p>
                        <h3>1</h3>
                        <small>One complaint in progress</small>
                    </div>

                </article>

                <article>

                    <span className="dashboard-summary-icon">
                        <DashboardIcon name="feedback" />
                    </span>

                    <div>
                        <p>Your Rating</p>
                        <h3>4.2 / 5</h3>
                        <small>Last updated this month</small>
                    </div>

                </article>

            </section>

            <section className="resident-dashboard-section">

                <div className="resident-dashboard-heading">

                    <div>
                        <h2>Quick Actions</h2>

                        <p>
                            Access frequently used hostel services.
                        </p>
                    </div>

                </div>

                <div className="resident-quick-actions-grid">

                    {quickActions.map((action) => (

                        <button
                            type="button"
                            className="resident-quick-action"
                            key={action.title}
                            onClick={() =>
                                navigate(action.path)
                            }
                        >

                            <span className="resident-quick-action-icon">
                                <DashboardIcon
                                    name={action.icon}
                                />
                            </span>

                            <div>
                                <h3>{action.title}</h3>
                                <p>{action.description}</p>
                            </div>

                            <span className="resident-action-arrow">
                                →
                            </span>

                        </button>

                    ))}

                </div>

            </section>

            <section className="resident-dashboard-middle-grid">

                <article className="resident-dashboard-card resident-menu-card">

                    <div className="resident-dashboard-heading">

                        <div>
                            <h2>Today&apos;s Menu</h2>

                            <p>
                                Meals scheduled for today.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/resident/menu")
                            }
                        >
                            Full Menu
                        </button>

                    </div>

                    <div className="resident-today-menu-list">

                        {todayMenu.map((item) => (

                            <div
                                className="resident-menu-item"
                                key={item.meal}
                            >

                                <span className="resident-menu-icon">
                                    <DashboardIcon
                                        name={item.icon}
                                    />
                                </span>

                                <div className="resident-menu-information">

                                    <div>
                                        <h3>{item.meal}</h3>
                                        <span>{item.time}</span>
                                    </div>

                                    <p>{item.food}</p>

                                </div>

                            </div>

                        ))}

                    </div>

                </article>

                <article className="resident-dashboard-card resident-fee-card">

                    <div className="resident-dashboard-heading">

                        <div>
                            <h2>Fee Overview</h2>

                            <p>
                                Current monthly hostel payment.
                            </p>
                        </div>

                        <span className="resident-fee-pending-label">
                            Payment Pending
                        </span>

                    </div>

                    <div className="resident-fee-amount">

                        <span>Amount due</span>

                        <h3>₹{formattedPendingFee}</h3>

                        <p>
                            Monthly hostel fee: ₹{formattedFee}
                        </p>

                    </div>

                    <div className="resident-fee-details">

                        <div>
                            <span>Billing Month</span>
                            <strong>July 2026</strong>
                        </div>

                        <div>
                            <span>Due Date</span>
                            <strong>10 August 2026</strong>
                        </div>

                        <div>
                            <span>Payment Status</span>
                            <strong className="fee-status-pending">
                                Pending
                            </strong>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="resident-pay-fee-button"
                        onClick={() =>
                            navigate("/resident/fees")
                        }
                    >
                        Pay Hostel Fee
                        <span>→</span>
                    </button>

                </article>

            </section>

            <section className="resident-dashboard-bottom-grid">

                <article className="resident-dashboard-card">

                    <div className="resident-dashboard-heading">

                        <div>
                            <h2>Recent Activities</h2>

                            <p>
                                Your recent StayMate activities.
                            </p>
                        </div>

                    </div>

                    <div className="resident-activity-list">

                        {recentActivities.map((activity) => (

                            <div
                                className="resident-activity-item"
                                key={activity.title}
                            >

                                <span className="resident-activity-icon">
                                    <DashboardIcon
                                        name={activity.icon}
                                    />
                                </span>

                                <div>
                                    <h3>{activity.title}</h3>
                                    <p>{activity.description}</p>
                                </div>

                                <time>{activity.time}</time>

                            </div>

                        ))}

                    </div>

                </article>

                <article className="resident-dashboard-card">

                    <div className="resident-dashboard-heading">

                        <div>
                            <h2>Hostel Notices</h2>

                            <p>
                                Important updates from the admin.
                            </p>
                        </div>

                        <span className="resident-notice-count">
                            {hostelNotices.length}
                        </span>

                    </div>

                    <div className="resident-notice-list">

                        {hostelNotices.map((notice) => (

                            <div
                                className="resident-notice-item"
                                key={notice.title}
                            >

                                <div className="resident-notice-date">
                                    <span>
                                        {notice.date.split(" ")[0]}
                                    </span>

                                    <small>
                                        {notice.date.split(" ")[1]}
                                    </small>
                                </div>

                                <div className="resident-notice-information">

                                    <span>{notice.type}</span>
                                    <h3>{notice.title}</h3>
                                    <p>{notice.description}</p>

                                </div>

                            </div>

                        ))}

                    </div>

                </article>

            </section>

            <section className="resident-hostel-information">

                <span className="resident-hostel-information-icon">

                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M4 21V5H14V21M14 9H20V21M2 21H22M8 9H10M8 13H10M8 17H10M17 13H18M17 17H18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                </span>

                <div>
                    <span>Currently staying at</span>
                    <h2>{hostelName}</h2>

                    <p>
                        {hostel.hostelAddress ||
                            "Madanapalle, Andhra Pradesh"}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/resident/room-details")
                    }
                >
                    View Details
                </button>

            </section>

        </div>
    );
}

function DashboardIcon({ name }) {

    const icons = {

        room: (
            <>
                <path d="M4 21V5H18V21M2 21H21" />
                <path d="M8 9H14M8 13H14M8 17H12" />
            </>
        ),

        fees: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 9H21M7 15H11" />
            </>
        ),

        complaint: (
            <>
                <path d="M5 4H19V16H10L6 20V16H5V4Z" />
                <path d="M12 8V11M12 14H12.01" />
            </>
        ),

        feedback: (
            <>
                <path d="M12 3L14.7 8.5L21 9.4L16.5 13.8L17.5 20L12 17L6.5 20L7.5 13.8L3 9.4L9.3 8.5L12 3Z" />
            </>
        ),

        menu: (
            <>
                <path d="M7 5V10M5 5V8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8V5" />
                <path d="M7 10V20M15 5V20M15 5C18 7 19 10 15 13" />
            </>
        ),

        shift: (
            <>
                <path d="M4 8H19M16 5L19 8L16 11" />
                <path d="M20 16H5M8 13L5 16L8 19" />
            </>
        ),

        profile: (
            <>
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21C5 16.8 8.1 14 12 14C15.9 14 19 16.8 19 21" />
            </>
        ),

        breakfast: (
            <>
                <path d="M5 10H19V12C19 16 16 19 12 19C8 19 5 16 5 12V10Z" />
                <path d="M8 6C8 4.5 9 4 9 3M12 6C12 4.5 13 4 13 3M16 6C16 4.5 17 4 17 3" />
            </>
        ),

        lunch: (
            <>
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
            </>
        ),

        snacks: (
            <>
                <path d="M5 8H17V14C17 17 14.5 19 11 19C7.5 19 5 17 5 14V8Z" />
                <path d="M17 10H19C20.1 10 21 10.9 21 12C21 13.1 20.1 14 19 14H17" />
                <path d="M8 4V6M11 3V6M14 4V6" />
            </>
        ),

        dinner: (
            <>
                <path d="M4 17H20M6 17C6 12 8.5 8 12 8C15.5 8 18 12 18 17" />
                <path d="M12 5V8M3 20H21" />
            </>
        )
    };

    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {icons[name]}
        </svg>
    );
}

export default ResidentDashboard;