import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateHostel.css";

function CreateHostel() {

    const navigate = useNavigate();

    const [hostel, setHostel] = useState({
        hostelName:
            localStorage.getItem("hostelName") || "",
        ownerName:
            localStorage.getItem("ownerName") || "",
        ownerPhone: "",
        ownerEmail:
            localStorage.getItem("ownerEmail") || "",
        hostelAddress:
            localStorage.getItem("hostelAddress") || "",
        totalRooms:
            localStorage.getItem("totalRooms") || "",
        totalCapacity: "",
        description: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        let updatedValue = value;

        if (name === "ownerPhone") {
            updatedValue = value.replace(/\D/g, "");
        }

        setHostel({
            ...hostel,
            [name]: updatedValue
        });

        setMessage("");
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (
            !hostel.hostelName.trim() ||
            !hostel.ownerName.trim() ||
            !hostel.ownerPhone ||
            !hostel.ownerEmail.trim() ||
            !hostel.hostelAddress.trim() ||
            !hostel.totalRooms ||
            !hostel.totalCapacity
        ) {
            setMessageType("error");
            setMessage("Please fill in all the required fields.");
            return;
        }

        if (!/^[0-9]{10}$/.test(hostel.ownerPhone)) {
            setMessageType("error");
            setMessage(
                "Owner phone number must contain exactly 10 digits."
            );
            return;
        }

        if (Number(hostel.totalRooms) < 1) {
            setMessageType("error");
            setMessage("Total rooms must be at least 1.");
            return;
        }

        if (Number(hostel.totalCapacity) < 1) {
            setMessageType("error");
            setMessage("Total capacity must be at least 1.");
            return;
        }

        if (
            Number(hostel.totalCapacity) <
            Number(hostel.totalRooms)
        ) {
            setMessageType("error");
            setMessage(
                "Total capacity cannot be less than total rooms."
            );
            return;
        }

        setSubmitting(true);

        const hostelData = {
            hostelName: hostel.hostelName.trim(),
            ownerName: hostel.ownerName.trim(),
            ownerPhone: hostel.ownerPhone,
            ownerEmail: hostel.ownerEmail.trim(),
            hostelAddress: hostel.hostelAddress.trim(),
            totalRooms: Number(hostel.totalRooms),
            totalCapacity: Number(hostel.totalCapacity),
            description: hostel.description.trim()
        };

        /*
            Replace this localStorage code with
            your Spring Boot API later.
        */

        localStorage.setItem(
            "staymateHostel",
            JSON.stringify(hostelData)
        );

        localStorage.setItem(
            "hostelName",
            hostelData.hostelName
        );

        localStorage.setItem(
            "ownerName",
            hostelData.ownerName
        );

        localStorage.setItem(
            "ownerEmail",
            hostelData.ownerEmail
        );

        localStorage.setItem(
            "hostelCreated",
            "true"
        );

        console.log("Hostel data:", hostelData);

        setMessageType("success");
        setMessage("Hostel created successfully.");

        setTimeout(() => {
            navigate("/admin/dashboard");
        }, 1000);
    };

    return (
        <div className="create-hostel-page">

            <div className="create-hostel-circle create-circle-one"></div>
            <div className="create-hostel-circle create-circle-two"></div>

            <header className="create-hostel-header">

                <button
                    type="button"
                    className="create-hostel-brand"
                    onClick={() => navigate("/")}
                >

                    <span className="create-hostel-brand-icon">

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

                <button
                    type="button"
                    className="create-hostel-back-button"
                    onClick={() => navigate("/admin/welcome")}
                >
                    ← Back
                </button>

            </header>

            <main className="create-hostel-main">

                <section className="create-hostel-container">

                    <div className="create-hostel-heading">

                        <div className="create-hostel-heading-icon">

                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M4 21V6.5C4 5.67 4.67 5 5.5 5H14V21M14 9H18.5C19.33 9 20 9.67 20 10.5V21M2 21H22M8 9H10M8 13H10M8 17H10M17 13H18M17 17H18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </div>

                        <div>

                            <span>Hostel setup</span>

                            <h1>Create Your Hostel</h1>

                            <p>
                                Add your hostel information to start
                                managing rooms, residents and services.
                            </p>

                        </div>

                    </div>

                    <div className="create-hostel-progress">

                        <div className="create-progress-item completed">
                            <span>✓</span>
                            <p>Admin Account</p>
                        </div>

                        <div className="create-progress-line"></div>

                        <div className="create-progress-item active">
                            <span>2</span>
                            <p>Hostel Information</p>
                        </div>

                        <div className="create-progress-line"></div>

                        <div className="create-progress-item">
                            <span>3</span>
                            <p>Admin Dashboard</p>
                        </div>

                    </div>

                    <form
                        className="create-hostel-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="create-form-section">

                            <div className="create-form-section-heading">

                                <span>1</span>

                                <div>
                                    <h2>Hostel Information</h2>

                                    <p>
                                        Enter the basic information
                                        about your hostel.
                                    </p>
                                </div>

                            </div>

                            <div className="create-hostel-form-grid">

                                <div className="create-hostel-input">

                                    <label htmlFor="hostelName">
                                        Hostel Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="hostelName"
                                        name="hostelName"
                                        placeholder="Enter the hostel name"
                                        value={hostel.hostelName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="create-hostel-input">

                                    <label htmlFor="ownerName">
                                        Owner Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="ownerName"
                                        name="ownerName"
                                        placeholder="Enter the owner's name"
                                        value={hostel.ownerName}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        required
                                    />

                                </div>

                                <div className="create-hostel-input">

                                    <label htmlFor="ownerPhone">
                                        Owner Phone Number
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        id="ownerPhone"
                                        name="ownerPhone"
                                        placeholder="Enter 10-digit number"
                                        value={hostel.ownerPhone}
                                        onChange={handleChange}
                                        maxLength="10"
                                        inputMode="numeric"
                                        autoComplete="tel"
                                        required
                                    />

                                </div>

                                <div className="create-hostel-input">

                                    <label htmlFor="ownerEmail">
                                        Owner Email
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="email"
                                        id="ownerEmail"
                                        name="ownerEmail"
                                        placeholder="Enter the owner's email"
                                        value={hostel.ownerEmail}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                                <div className="create-hostel-input create-full-width">

                                    <label htmlFor="hostelAddress">
                                        Hostel Address
                                        <span>*</span>
                                    </label>

                                    <textarea
                                        id="hostelAddress"
                                        name="hostelAddress"
                                        placeholder="Enter the complete hostel address"
                                        value={hostel.hostelAddress}
                                        onChange={handleChange}
                                        rows="3"
                                        required
                                    ></textarea>

                                </div>

                            </div>

                        </div>

                        <div className="create-form-section">

                            <div className="create-form-section-heading">

                                <span>2</span>

                                <div>
                                    <h2>Capacity Details</h2>

                                    <p>
                                        Enter room and resident capacity.
                                    </p>
                                </div>

                            </div>

                            <div className="create-hostel-form-grid">

                                <div className="create-hostel-input">

                                    <label htmlFor="totalRooms">
                                        Total Rooms
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="number"
                                        id="totalRooms"
                                        name="totalRooms"
                                        placeholder="Example: 80"
                                        value={hostel.totalRooms}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />

                                </div>

                                <div className="create-hostel-input">

                                    <label htmlFor="totalCapacity">
                                        Total Capacity
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="number"
                                        id="totalCapacity"
                                        name="totalCapacity"
                                        placeholder="Example: 150"
                                        value={hostel.totalCapacity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />

                                </div>

                                <div className="create-hostel-input create-full-width">

                                    <label htmlFor="description">
                                        Description
                                        <small>Optional</small>
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Write a short description about your hostel"
                                        value={hostel.description}
                                        onChange={handleChange}
                                        rows="4"
                                        maxLength="500"
                                    ></textarea>

                                    <p className="create-character-count">
                                        {hostel.description.length}/500
                                    </p>

                                </div>

                            </div>

                        </div>

                        {message && (

                            <p
                                className={`create-hostel-message ${
                                    messageType === "success"
                                        ? "create-hostel-success"
                                        : "create-hostel-error"
                                }`}
                            >
                                {message}
                            </p>

                        )}

                        <div className="create-hostel-actions">

                            <button
                                type="button"
                                className="create-cancel-button"
                                onClick={() =>
                                    navigate("/admin/welcome")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="create-submit-button"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Creating Hostel..."
                                    : "Create Hostel"}
                            </button>

                        </div>

                    </form>

                </section>

            </main>

            <footer className="create-hostel-footer">
                © 2026 StayMate. Smart hostel management made simple.
            </footer>

        </div>
    );
}

export default CreateHostel;