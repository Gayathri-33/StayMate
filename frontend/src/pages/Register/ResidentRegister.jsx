import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function ResidentRegister() {

    const [resident, setResident] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        hostelCode: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setResident({
            ...resident,
            [name]: value
        });

        setMessage("");
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!/^[0-9]{10}$/.test(resident.phoneNumber)) {
            setMessageType("error");
            setMessage("Phone number must contain exactly 10 digits.");
            return;
        }

        if (resident.password.length < 6) {
            setMessageType("error");
            setMessage("Password must contain at least 6 characters.");
            return;
        }

        if (resident.password !== resident.confirmPassword) {
            setMessageType("error");
            setMessage("Password and confirm password do not match.");
            return;
        }

        /*
            Connect the Spring Boot resident
            registration API here later.
        */

        console.log("Resident registration:", resident);

        setMessageType("success");
        setMessage("Resident registration details submitted successfully.");
    };

    return (
        <div className="registration-page">

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

            <main className="registration-main">

                <section className="registration-container">

                    <div className="registration-heading">

                        <div className="registration-heading-icon">

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

                        <div>
                            <span className="registration-type">
                                Resident account
                            </span>

                            <h1>Resident Registration</h1>

                            <p>
                                Enter your details and hostel code
                                to create your account.
                            </p>
                        </div>

                    </div>

                    <form
                        className="registration-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="registration-form-grid">

                            <div className="registration-input-group">

                                <label htmlFor="fullName">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={resident.fullName}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                />

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={resident.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="phoneNumber">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Enter 10-digit number"
                                    value={resident.phoneNumber}
                                    onChange={handleChange}
                                    maxLength="10"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                    required
                                />

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="hostelCode">
                                    Hostel Code
                                </label>

                                <input
                                    type="text"
                                    id="hostelCode"
                                    name="hostelCode"
                                    placeholder="Enter your hostel code"
                                    value={resident.hostelCode}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div className="registration-password">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="Minimum 6 characters"
                                        value={resident.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Re-enter your password"
                                    value={resident.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                />

                            </div>

                        </div>

                        {message && (
                            <p
                                className={`registration-message ${
                                    messageType === "success"
                                        ? "registration-success"
                                        : "registration-error"
                                }`}
                            >
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="registration-submit"
                        >
                            Register as Resident
                        </button>

                    </form>

                    <div className="registration-navigation">

                        <Link to="/register">
                            ← Change account type
                        </Link>

                        <span></span>

                        <p>
                            Already registered?
                            <Link to="/login">Login</Link>
                        </p>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default ResidentRegister;