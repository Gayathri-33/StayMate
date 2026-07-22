import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function AdminRegister() {

    const [admin, setAdmin] = useState({
        ownerName: "",
        ownerEmail: "",
        password: "",
        confirmPassword: "",
        aadhaarNumber: "",
        panNumber: "",
        hostelAddress: "",
        totalRoomCount: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        let updatedValue = value;

        if (name === "panNumber") {
            updatedValue = value.toUpperCase();
        }

        setAdmin({
            ...admin,
            [name]: updatedValue
        });

        setMessage("");
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (admin.password.length < 6) {
            setMessageType("error");
            setMessage("Password must contain at least 6 characters.");
            return;
        }

        if (admin.password !== admin.confirmPassword) {
            setMessageType("error");
            setMessage("Password and confirm password do not match.");
            return;
        }

        if (!/^[0-9]{12}$/.test(admin.aadhaarNumber)) {
            setMessageType("error");
            setMessage("Aadhaar number must contain exactly 12 digits.");
            return;
        }

        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

        if (!panPattern.test(admin.panNumber)) {
            setMessageType("error");
            setMessage(
                "Enter a valid PAN number, for example ABCDE1234F."
            );
            return;
        }

        if (Number(admin.totalRoomCount) < 1) {
            setMessageType("error");
            setMessage("Total room count must be at least 1.");
            return;
        }

        /*
            Connect the Spring Boot administrator
            registration API here later.
        */

        console.log("Admin registration:", admin);

        setMessageType("success");
        setMessage("Admin registration details submitted successfully.");
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

                <section className="registration-container admin-form-container">

                    <div className="registration-heading">

                        <div className="registration-heading-icon">

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
                            <span className="registration-type">
                                Hostel administrator
                            </span>

                            <h1>Admin Registration</h1>

                            <p>
                                Enter the owner and hostel details
                                to create an administrator account.
                            </p>
                        </div>

                    </div>

                    <form
                        className="registration-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="registration-form-grid">

                            <div className="registration-input-group">

                                <label htmlFor="ownerName">
                                    Owner Name
                                </label>

                                <input
                                    type="text"
                                    id="ownerName"
                                    name="ownerName"
                                    placeholder="Enter the owner's name"
                                    value={admin.ownerName}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                />

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="ownerEmail">
                                    Owner Email
                                </label>

                                <input
                                    type="email"
                                    id="ownerEmail"
                                    name="ownerEmail"
                                    placeholder="Enter the owner's email"
                                    value={admin.ownerEmail}
                                    onChange={handleChange}
                                    autoComplete="email"
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
                                        value={admin.password}
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
                                    value={admin.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                />

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="aadhaarNumber">
                                    Owner Aadhaar Number
                                </label>

                                <input
                                    type="text"
                                    id="aadhaarNumber"
                                    name="aadhaarNumber"
                                    placeholder="Enter 12-digit Aadhaar number"
                                    value={admin.aadhaarNumber}
                                    onChange={handleChange}
                                    maxLength="12"
                                    inputMode="numeric"
                                    required
                                />

                            </div>

                            <div className="registration-input-group">

                                <label htmlFor="panNumber">
                                    PAN Number
                                </label>

                                <input
                                    type="text"
                                    id="panNumber"
                                    name="panNumber"
                                    placeholder="Example: ABCDE1234F"
                                    value={admin.panNumber}
                                    onChange={handleChange}
                                    maxLength="10"
                                    required
                                />

                            </div>

                            <div className="registration-input-group registration-full-width">

                                <label htmlFor="hostelAddress">
                                    Hostel Address
                                </label>

                                <textarea
                                    id="hostelAddress"
                                    name="hostelAddress"
                                    placeholder="Enter the complete hostel address"
                                    value={admin.hostelAddress}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                ></textarea>

                            </div>

                            <div className="registration-input-group registration-full-width">

                                <label htmlFor="totalRoomCount">
                                    Total Room Count
                                </label>

                                <input
                                    type="number"
                                    id="totalRoomCount"
                                    name="totalRoomCount"
                                    placeholder="Enter the total number of rooms"
                                    value={admin.totalRoomCount}
                                    onChange={handleChange}
                                    min="1"
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
                            Register as Admin
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

export default AdminRegister;