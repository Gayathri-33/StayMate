import {
    NavLink,
    useNavigate
} from "react-router-dom";

import "./ResidentSidebar.css";

function ResidentSidebar({
    isOpen = false,
    onClose = () => {}
}) {

    const navigate = useNavigate();

    let savedResident = {};

    try {
        savedResident =
            JSON.parse(
                localStorage.getItem("resident")
            ) || {};
    } catch {
        savedResident = {};
    }

    const residentName =
        savedResident.fullName ||
        savedResident.name ||
        localStorage.getItem("residentName") ||
        "Resident";

    const hostelName =
        savedResident.hostelName ||
        localStorage.getItem("hostelName") ||
        "StayMate Hostel";

    const roomNumber =
        savedResident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "Not assigned";

    const navigationItems = [
        {
            name: "Dashboard",
            path: "/resident/dashboard",
            icon: "dashboard"
        },
        {
            name: "View Menu",
            path: "/resident/menu",
            icon: "menu"
        },
        {
            name: "Pay Fees",
            path: "/resident/fees",
            icon: "fees"
        },
        {
            name: "Room Details",
            path: "/resident/room-details",
            icon: "room"
        },
        {
            name: "Room Shift Request",
            path: "/resident/room-shift",
            icon: "shift"
        },
        {
            name: "Raise Complaint",
            path: "/resident/complaints",
            icon: "complaint"
        },
        {
            name: "Hostel Feedback",
            path: "/resident/feedback",
            icon: "feedback"
        },
        {
            name: "Manage Profile",
            path: "/resident/profile",
            icon: "profile"
        }
    ];

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("resident");
        localStorage.removeItem("residentName");
        localStorage.removeItem("roomNumber");
        localStorage.removeItem("allocationStatus");

        onClose();
        navigate("/login");
    };

    return (
        <>

            {isOpen && (
                <button
                    type="button"
                    className="resident-sidebar-overlay"
                    onClick={onClose}
                    aria-label="Close resident sidebar"
                ></button>
            )}

            <aside
                className={`resident-sidebar ${
                    isOpen ? "resident-sidebar-open" : ""
                }`}
            >

                <div className="resident-sidebar-brand">

                    <div className="resident-sidebar-logo">

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

                    <div className="resident-sidebar-brand-text">
                        <h2>StayMate</h2>
                        <p>Resident Portal</p>
                    </div>

                    <button
                        type="button"
                        className="resident-sidebar-close"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        ×
                    </button>

                </div>

                <div className="resident-hostel-card">

                    <span className="resident-hostel-icon">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M4 21V6H14V21M14 10H20V21M2 21H22M8 10H10M8 14H10M8 18H10M17 14H18M17 18H18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </span>

                    <div>
                        <p>Currently staying at</p>
                        <h3>{hostelName}</h3>

                        <span className="resident-room-label">
                            Room {roomNumber}
                        </span>
                    </div>

                </div>

                <nav className="resident-sidebar-navigation">

                    <p className="resident-navigation-heading">
                        Resident Menu
                    </p>

                    {navigationItems.map((item) => (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === "/resident/dashboard"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                isActive
                                    ? "resident-nav-link resident-nav-active"
                                    : "resident-nav-link"
                            }
                        >

                            <span className="resident-nav-icon">
                                <SidebarIcon name={item.icon} />
                            </span>

                            <span className="resident-nav-name">
                                {item.name}
                            </span>

                        </NavLink>

                    ))}

                </nav>

                <div className="resident-sidebar-footer">

                    <div className="resident-sidebar-user">

                        <span className="resident-user-avatar">
                            {residentName
                                .charAt(0)
                                .toUpperCase()}
                        </span>

                        <div>
                            <strong>{residentName}</strong>
                            <small>Resident</small>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="resident-logout-button"
                        onClick={handleLogout}
                    >

                        <SidebarIcon name="logout" />
                        <span>Logout</span>

                    </button>

                </div>

            </aside>

        </>
    );
}

function SidebarIcon({ name }) {

    const icons = {

        dashboard: (
            <>
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
            </>
        ),

        menu: (
            <>
                <path d="M7 5V10" />
                <path d="M5 5V8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8V5" />
                <path d="M7 10V20" />
                <path d="M15 5V20" />
                <path d="M15 5C18 7 19 10 15 13" />
            </>
        ),

        fees: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 9H21" />
                <path d="M7 15H11" />
            </>
        ),

        room: (
            <>
                <path d="M4 21V5H18V21" />
                <path d="M2 21H21" />
                <path d="M8 9H14" />
                <path d="M8 13H14" />
                <circle cx="15" cy="17" r="0.7" />
            </>
        ),

        shift: (
            <>
                <path d="M4 8H19" />
                <path d="M16 5L19 8L16 11" />
                <path d="M20 16H5" />
                <path d="M8 13L5 16L8 19" />
            </>
        ),

        complaint: (
            <>
                <path d="M5 4H19V16H10L6 20V16H5V4Z" />
                <path d="M12 8V11" />
                <circle cx="12" cy="14" r="0.5" />
            </>
        ),

        feedback: (
            <>
                <path d="M12 3L14.7 8.5L21 9.4L16.5 13.8L17.5 20L12 17L6.5 20L7.5 13.8L3 9.4L9.3 8.5L12 3Z" />
            </>
        ),

        profile: (
            <>
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21C5 16.8 8.1 14 12 14C15.9 14 19 16.8 19 21" />
            </>
        ),

        logout: (
            <>
                <path d="M10 4H5V20H10" />
                <path d="M13 8L17 12L13 16" />
                <path d="M8 12H17" />
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

export default ResidentSidebar;