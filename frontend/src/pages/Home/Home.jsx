import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            <div className="home-decoration decoration-one"></div>
            <div className="home-decoration decoration-two"></div>

            <header className="home-header">

                <Link to="/" className="home-brand">

                    <span className="brand-icon">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
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

                    <span>StayMate</span>

                </Link>

            </header>

            <main className="home-main">

                <section className="home-card">

                    <div className="home-badge">
                        Your hostel companion
                    </div>

                    <div className="hero-logo">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M3 21H21M5 21V5.5C5 4.67 5.67 4 6.5 4H14V21M14 8H18.5C19.33 8 20 8.67 20 9.5V21M8 8H11M8 12H11M8 16H11M17 12H18M17 16H18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </div>

                    <h1>StayMate</h1>

                    <h2>
                        Smart Hostel Management Made Simple
                    </h2>

                    <p className="home-description">
                        Manage hostel fees, view daily menus, submit
                        complaints, request room shifts, and stay updated—
                        all in one place.
                    </p>

                    <div className="home-actions">

                        <Link
                            to="/login"
                            className="home-button login-button"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="home-button register-button"
                        >
                            Register
                        </Link>

                    </div>

                    <div className="home-features">

                        <span>
                            <i></i>
                            Secure
                        </span>

                        <span>
                            <i></i>
                            Fast
                        </span>

                        <span>
                            <i></i>
                            Student Friendly
                        </span>

                    </div>

                </section>

            </main>

            <footer className="home-footer">
                © 2026 StayMate. Making hostel life easier.
            </footer>

        </div>
    );
}

export default Home;