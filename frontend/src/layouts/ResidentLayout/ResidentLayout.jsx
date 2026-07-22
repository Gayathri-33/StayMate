import {
    useEffect,
    useState
} from "react";

import {
    Outlet,
    useLocation,
    useNavigate
} from "react-router-dom";

import ResidentSidebar from
    "../../components/ResidentSidebar/ResidentSidebar";

import "./ResidentLayout.css";

function ResidentLayout() {

    const location = useLocation();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

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

    const roomNumber =
        savedResident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "Not assigned";

    const pageInformation = {
        "/resident/dashboard": {
            title: "Resident Dashboard",
            description:
                "Welcome back! Here is your hostel overview."
        },
        "/resident/menu": {
            title: "Daily Menu",
            description:
                "View today's meals and the weekly food schedule."
        },
        "/resident/fees": {
            title: "Fee Management",
            description:
                "View fee details, pending dues and payment history."
        },
        "/resident/room-details": {
            title: "Room Details",
            description:
                "View your room and roommate information."
        },
        "/resident/room-shift": {
            title: "Room Shift Request",
            description:
                "Submit and track your room shift requests."
        },
        "/resident/complaints": {
            title: "Complaints",
            description:
                "Raise and track hostel-related complaints."
        },
        "/resident/feedback": {
            title: "Ratings & Feedback",
            description:
                "Share your hostel experience and suggestions."
        },
        "/resident/profile": {
            title: "Manage Profile",
            description:
                "View and update your personal information."
        }
    };

    const currentPage =
        pageInformation[location.pathname] || {
            title: "Resident Portal",
            description:
                "Manage your hostel activities with StayMate."
        };

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const currentDate =
        new Intl.DateTimeFormat("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(new Date());

    return (
        <div className="resident-layout-page">

            <ResidentSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="resident-layout-content">

                <header className="resident-layout-topbar">

                    <div className="resident-topbar-left">

                        <button
                            type="button"
                            className="resident-menu-button"
                            onClick={() =>
                                setSidebarOpen(!sidebarOpen)
                            }
                            aria-label="Open resident sidebar"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4 7H20M4 12H20M4 17H20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>

                        </button>

                        <div className="resident-page-heading">

                            <h1>{currentPage.title}</h1>

                            <p>
                                {currentPage.description}
                            </p>

                        </div>

                    </div>

                    <div className="resident-topbar-right">

                        <div className="resident-current-date">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="4"
                                    y="5"
                                    width="16"
                                    height="15"
                                    rx="2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                />

                                <path
                                    d="M8 3V7M16 3V7M4 10H20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <span>{currentDate}</span>

                        </div>

                        <button
                            type="button"
                            className="resident-notification-button"
                            aria-label="View notifications"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M18 9C18 6 15.3 4 12 4C8.7 4 6 6 6 9V14L4 17H20L18 14V9ZM10 20H14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="resident-notification-dot"></span>

                        </button>

                        <button
                            type="button"
                            className="resident-topbar-profile"
                            onClick={() =>
                                navigate("/resident/profile")
                            }
                        >

                            <span className="resident-topbar-avatar">
                                {residentName
                                    .charAt(0)
                                    .toUpperCase()}
                            </span>

                            <span className="resident-topbar-user">

                                <strong>{residentName}</strong>

                                <small>
                                    {roomNumber === "Not assigned"
                                        ? "Resident"
                                        : `Room ${roomNumber}`}
                                </small>

                            </span>

                            <svg
                                className="resident-profile-arrow"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M8 10L12 14L16 10"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </button>

                    </div>

                </header>

                <main className="resident-layout-main">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default ResidentLayout;