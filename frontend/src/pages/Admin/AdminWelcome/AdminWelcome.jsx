import { useNavigate } from "react-router-dom";
import "./AdminWelcome.css";

function AdminWelcome() {

    const navigate = useNavigate();

    const ownerName =
        localStorage.getItem("ownerName") || "Admin";

    const managementFeatures = [
        {
            title: "Hostel Information",
            description: "Manage hostel details and information.",
            icon: "🏢"
        },
        {
            title: "Rooms",
            description: "Add rooms and monitor availability.",
            icon: "🛏"
        },
        {
            title: "Residents",
            description: "Add and manage hostel residents.",
            icon: "👥"
        },
        {
            title: "Daily Menu",
            description: "Create and update the daily food menu.",
            icon: "🍽"
        },
        {
            title: "Fee Management",
            description: "Track fee payments and pending dues.",
            icon: "₹"
        },
        {
            title: "Complaints",
            description: "Review and resolve resident complaints.",
            icon: "📢"
        },
        {
            title: "Ratings & Feedback",
            description: "View ratings and resident feedback.",
            icon: "★"
        }
    ];

    const createHostel = () => {
        navigate("/admin/create-hostel");
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("ownerName");
        localStorage.removeItem("hostelName");

        navigate("/");
    };

    return (
        <div className="admin-welcome-page">

            <div className="admin-welcome-circle welcome-circle-one"></div>
            <div className="admin-welcome-circle welcome-circle-two"></div>

            <header className="admin-welcome-header">

                <button
                    type="button"
                    className="admin-welcome-brand"
                    onClick={() => navigate("/")}
                >

                    <span className="admin-welcome-logo">

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

                    </span>

                    <span>
                        <strong>StayMate</strong>
                        <small>Admin Portal</small>
                    </span>

                </button>

                <div className="admin-welcome-user">

                    <span className="admin-welcome-avatar">
                        {ownerName.charAt(0).toUpperCase()}
                    </span>

                    <div className="admin-welcome-user-details">
                        <strong>{ownerName}</strong>
                        <small>Administrator</small>
                    </div>

                    <button
                        type="button"
                        className="admin-welcome-logout"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            <main className="admin-welcome-main">

                <section className="admin-welcome-hero">

                    <div className="admin-welcome-hero-content">

                        <span className="admin-setup-label">
                            Account setup
                        </span>

                        <h1>Welcome to StayMate!</h1>

                        <h2>
                            Hello, {ownerName}
                            <span> 👋</span>
                        </h2>

                        <p className="admin-welcome-primary-text">
                            It looks like you haven&apos;t created
                            your hostel profile yet.
                        </p>

                        <p className="admin-welcome-secondary-text">
                            Create your hostel to start managing
                            residents, rooms, menus, complaints and
                            fee payments—all from one simple dashboard.
                        </p>

                        <button
                            type="button"
                            className="admin-create-hostel-button"
                            onClick={createHostel}
                        >
                            <span className="admin-create-button-icon">
                                +
                            </span>

                            Create Hostel

                            <span className="admin-create-arrow">
                                →
                            </span>
                        </button>

                        <p className="admin-setup-note">
                            This will only take a few minutes.
                        </p>

                    </div>

                    <div className="admin-welcome-illustration">

                        <div className="admin-building-card">

                            <div className="admin-building-icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4 21V5.5C4 4.67 4.67 4 5.5 4H14V21M14 8H18.5C19.33 8 20 8.67 20 9.5V21M2 21H22M8 8H10M8 12H10M8 16H10M17 12H18M17 16H18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                            </div>

                            <div className="admin-building-placeholder">
                                <span>+</span>
                                <p>Your Hostel</p>
                                <small>Waiting to be created</small>
                            </div>

                        </div>

                        <div className="admin-floating-card floating-card-one">
                            <span>🛏</span>
                            <div>
                                <strong>Rooms</strong>
                                <small>Manage easily</small>
                            </div>
                        </div>

                        <div className="admin-floating-card floating-card-two">
                            <span>👥</span>
                            <div>
                                <strong>Residents</strong>
                                <small>Stay organized</small>
                            </div>
                        </div>

                    </div>

                </section>

                <section className="admin-management-section">

                    <div className="admin-management-heading">

                        <span>Everything in one place</span>

                        <h2>What you&apos;ll be able to manage</h2>

                        <p>
                            Once your hostel is created, these management
                            tools will be available in your dashboard.
                        </p>

                    </div>

                    <div className="admin-management-grid">

                        {managementFeatures.map((feature) => (

                            <article
                                className="admin-management-card"
                                key={feature.title}
                            >

                                <span className="admin-management-icon">
                                    {feature.icon}
                                </span>

                                <div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>

                            </article>

                        ))}

                    </div>

                </section>

            </main>

            <footer className="admin-welcome-footer">
                © 2026 StayMate. Smart hostel management made simple.
            </footer>

        </div>
    );
}

export default AdminWelcome;