import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value
        });

        setMessage("");
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!loginData.email || !loginData.password) {
            setMessage("Please enter your email and password.");
            return;
        }

        /*
            Spring Boot login API integration
            will be added here later.
        */

        console.log("Login data:", loginData);

        setMessage(
            "Login details submitted successfully."
        );
    };

    return (
        <div className="login-page">

            <div className="login-decoration login-decoration-one"></div>
            <div className="login-decoration login-decoration-two"></div>

            <header className="login-header">

                <Link to="/" className="login-brand">

                    <span className="login-brand-icon">

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

            <main className="login-main">

                <section className="login-container">

                    <div className="login-info">

                        <div className="login-info-content">

                            <span className="login-info-label">
                                Welcome back
                            </span>

                            <h1>
                                Everything about your hostel,
                                in one place.
                            </h1>

                            <p>
                                Access fee details, daily menus,
                                complaints, room requests, notices,
                                and other hostel services.
                            </p>

                            <div className="login-benefits">

                                <div className="login-benefit">

                                    <span className="benefit-check">
                                        ✓
                                    </span>

                                    <span>
                                        Secure student access
                                    </span>

                                </div>

                                <div className="login-benefit">

                                    <span className="benefit-check">
                                        ✓
                                    </span>

                                    <span>
                                        Quick hostel updates
                                    </span>

                                </div>

                                <div className="login-benefit">

                                    <span className="benefit-check">
                                        ✓
                                    </span>

                                    <span>
                                        Simple complaint management
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="login-info-footer">
                            Secure • Fast • Student Friendly
                        </div>

                    </div>

                    <div className="login-form-section">

                        <div className="login-form-heading">

                            <div className="login-form-icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM5 20C5 16.69 8.13 14 12 14C15.87 14 19 16.69 19 20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                            </div>

                            <h2>Login to StayMate</h2>

                            <p>
                                Enter your details to continue
                            </p>

                        </div>

                        <form
                            className="login-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="login-input-group">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <div className="login-input-wrapper">

                                    <span className="input-icon">

                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M4 6H20V18H4V6ZM4 7L12 13L20 7"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                    </span>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                            </div>

                            <div className="login-input-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div className="login-input-wrapper">

                                    <span className="input-icon">

                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10M5 10H19V21H5V10ZM12 14V17"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                    </span>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                            </div>

                            <div className="login-options">

                                <label className="remember-option">

                                    <input type="checkbox" />

                                    <span>Remember me</span>

                                </label>

                                <button
                                    type="button"
                                    className="forgot-password"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            {message && (
                                <p
                                    className={
                                        message.includes("successfully")
                                            ? "login-message success-message"
                                            : "login-message error-message"
                                    }
                                >
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="login-submit-button"
                            >
                                Login
                            </button>

                        </form>

                        <p className="login-register-text">

                            Don&apos;t have an account?

                            <Link to="/register">
                                Register
                            </Link>

                        </p>

                        <Link
                            to="/"
                            className="back-home-link"
                        >
                            ← Back to Home
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Login;