import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
    return (
        <div className="register-choice-page">

            <div className="register-circle circle-one"></div>
            <div className="register-circle circle-two"></div>

            <header className="register-header">

                <Link to="/" className="register-brand">

                    <span className="register-brand-icon">
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

                    <span>StayMate</span>

                </Link>

            </header>

            <main className="register-choice-main">

                <section className="register-choice-container">

                    <span className="register-page-label">
                        Create an account
                    </span>

                    <h1>How would you like to register?</h1>

                    <p className="register-choice-description">
                        Select your account type to continue with the
                        StayMate registration process.
                    </p>

                    <div className="register-options">

                        <Link
                            to="/register/resident"
                            className="register-option-card"
                        >

                            <div className="option-icon resident-icon">

                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM5 20C5 16.69 8.13 14 12 14C15.87 14 19 16.69 19 20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>

                            </div>

                            <div className="option-content">

                                <span className="option-type">
                                    For students
                                </span>

                                <h2>Register as Resident</h2>

                                <p>
                                    Join your hostel using the hostel
                                    code provided by the administrator.
                                </p>

                                <span className="option-link">
                                    Continue as Resident
                                    <span>→</span>
                                </span>

                            </div>

                        </Link>

                        <Link
                            to="/register/admin"
                            className="register-option-card"
                        >

                            <div className="option-icon admin-icon">

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

                            <div className="option-content">

                                <span className="option-type">
                                    For hostel owners
                                </span>

                                <h2>Register as Admin</h2>

                                <p>
                                    Register your hostel and manage
                                    rooms, residents and services.
                                </p>

                                <span className="option-link">
                                    Continue as Admin
                                    <span>→</span>
                                </span>

                            </div>

                        </Link>

                    </div>

                    <p className="existing-account">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                    <Link to="/" className="register-home-link">
                        ← Back to Home
                    </Link>

                </section>

            </main>

        </div>
    );
}

export default Register;