import { useState } from "react";
import "./ResidentProfile.css";

function getSavedResident() {

    try {

        return (
            JSON.parse(
                localStorage.getItem("resident")
            ) || {}
        );

    } catch {
        return {};
    }
}

function getSavedHostel() {

    try {

        return (
            JSON.parse(
                localStorage.getItem("staymateHostel")
            ) || {}
        );

    } catch {
        return {};
    }
}

function createProfileData(resident) {

    return {
        fullName:
            resident.fullName ||
            resident.name ||
            localStorage.getItem("residentName") ||
            "",
        email:
            resident.email ||
            localStorage.getItem("residentEmail") ||
            "",
        phoneNumber:
            resident.phoneNumber ||
            resident.phone ||
            localStorage.getItem("residentPhone") ||
            "",
        dateOfBirth:
            resident.dateOfBirth || "",
        gender:
            resident.gender || "",
        course:
            resident.course || "",
        yearOfStudy:
            resident.yearOfStudy || "",
        address:
            resident.address || "",
        guardianName:
            resident.guardianName || "",
        emergencyPhone:
            resident.emergencyPhone || ""
    };
}

function ResidentProfile() {

    const savedResident = getSavedResident();
    const hostel = getSavedHostel();

    const [resident, setResident] =
        useState(savedResident);

    const [formData, setFormData] =
        useState(() =>
            createProfileData(savedResident)
        );

    const [editMode, setEditMode] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");

    const residentId =
        resident.residentId ||
        localStorage.getItem("residentId") ||
        "RES-001";

    const roomNumber =
        resident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "204";

    const hostelCode =
        resident.hostelCode ||
        localStorage.getItem("hostelCode") ||
        "STM101";

    const hostelName =
        resident.hostelName ||
        hostel.hostelName ||
        localStorage.getItem("hostelName") ||
        "Sri Sai Boys Hostel";

    const allocationStatus =
        resident.allocationStatus ||
        localStorage.getItem("allocationStatus") ||
        "APPROVED";

    const handleChange = (event) => {

        const { name, value } = event.target;

        let updatedValue = value;

        if (
            name === "phoneNumber" ||
            name === "emergencyPhone"
        ) {
            updatedValue =
                value.replace(/\D/g, "");
        }

        setFormData({
            ...formData,
            [name]: updatedValue
        });

        setMessage("");
    };

    const enableEditMode = () => {

        setEditMode(true);
        setMessage("");
    };

    const cancelEditing = () => {

        setFormData(
            createProfileData(resident)
        );

        setEditMode(false);
        setMessage("");
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (
            !formData.fullName.trim() ||
            !formData.email.trim() ||
            !formData.phoneNumber
        ) {
            setMessageType("error");
            setMessage(
                "Full name, email and phone number are required."
            );
            return;
        }

        if (
            !/^[0-9]{10}$/.test(
                formData.phoneNumber
            )
        ) {
            setMessageType("error");
            setMessage(
                "Phone number must contain exactly 10 digits."
            );
            return;
        }

        if (
            formData.emergencyPhone &&
            !/^[0-9]{10}$/.test(
                formData.emergencyPhone
            )
        ) {
            setMessageType("error");
            setMessage(
                "Emergency phone number must contain exactly 10 digits."
            );
            return;
        }

        const updatedResident = {
            ...resident,
            fullName:
                formData.fullName.trim(),
            email:
                formData.email.trim(),
            phoneNumber:
                formData.phoneNumber,
            dateOfBirth:
                formData.dateOfBirth,
            gender:
                formData.gender,
            course:
                formData.course.trim(),
            yearOfStudy:
                formData.yearOfStudy,
            address:
                formData.address.trim(),
            guardianName:
                formData.guardianName.trim(),
            emergencyPhone:
                formData.emergencyPhone
        };

        /*
            Replace this localStorage code with
            the Spring Boot profile update API later.
        */

        localStorage.setItem(
            "resident",
            JSON.stringify(updatedResident)
        );

        localStorage.setItem(
            "residentName",
            updatedResident.fullName
        );

        localStorage.setItem(
            "residentEmail",
            updatedResident.email
        );

        localStorage.setItem(
            "residentPhone",
            updatedResident.phoneNumber
        );

        setResident(updatedResident);
        setEditMode(false);

        setMessageType("success");
        setMessage(
            "Profile updated successfully."
        );
    };

    return (
        <div className="resident-profile-page">

            <section className="resident-profile-banner">

                <div className="resident-profile-cover"></div>

                <div className="resident-profile-banner-content">

                    <span className="resident-profile-avatar">
                        {formData.fullName
                            .charAt(0)
                            .toUpperCase() || "R"}
                    </span>

                    <div className="resident-profile-identity">

                        <div>

                            <h2>
                                {formData.fullName ||
                                    "Resident"}
                            </h2>

                            <p>
                                {formData.email ||
                                    "Email not available"}
                            </p>

                        </div>

                        <span className="resident-profile-verified">
                            <i>✓</i>
                            Verified Resident
                        </span>

                    </div>

                    <div className="resident-profile-banner-actions">

                        {!editMode ? (

                            <button
                                type="button"
                                className="resident-profile-edit-button"
                                onClick={enableEditMode}
                            >
                                <ProfileIcon name="edit" />
                                Edit Profile
                            </button>

                        ) : (

                            <button
                                type="button"
                                className="resident-profile-cancel-top"
                                onClick={cancelEditing}
                            >
                                Cancel Editing
                            </button>

                        )}

                    </div>

                </div>

            </section>

            <section className="resident-profile-summary">

                <article>

                    <span>
                        <ProfileIcon name="id" />
                    </span>

                    <div>
                        <p>Resident ID</p>
                        <h3>{residentId}</h3>
                    </div>

                </article>

                <article>

                    <span>
                        <ProfileIcon name="room" />
                    </span>

                    <div>
                        <p>Room Number</p>
                        <h3>Room {roomNumber}</h3>
                    </div>

                </article>

                <article>

                    <span>
                        <ProfileIcon name="hostel" />
                    </span>

                    <div>
                        <p>Hostel Code</p>
                        <h3>{hostelCode}</h3>
                    </div>

                </article>

                <article>

                    <span>
                        <ProfileIcon name="status" />
                    </span>

                    <div>
                        <p>Allocation Status</p>
                        <h3>{allocationStatus}</h3>
                    </div>

                </article>

            </section>

            {message && (

                <p
                    className={`resident-profile-message ${
                        messageType === "success"
                            ? "resident-profile-success"
                            : "resident-profile-error"
                    }`}
                >
                    {message}
                </p>

            )}

            <section className="resident-profile-content">

                <form
                    className="resident-profile-form"
                    onSubmit={handleSubmit}
                >

                    <div className="resident-profile-form-card">

                        <div className="resident-profile-section-heading">

                            <span>
                                <ProfileIcon name="profile" />
                            </span>

                            <div>
                                <h2>Personal Information</h2>

                                <p>
                                    Your personal and contact details.
                                </p>
                            </div>

                        </div>

                        <div className="resident-profile-form-grid">

                            <div className="resident-profile-input">

                                <label htmlFor="fullName">
                                    Full Name
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    readOnly={!editMode}
                                    required
                                />

                            </div>

                            <div className="resident-profile-input">

                                <label htmlFor="email">
                                    Email Address
                                    <span>*</span>
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    readOnly={!editMode}
                                    required
                                />

                            </div>

                            <div className="resident-profile-input">

                                <label htmlFor="phoneNumber">
                                    Phone Number
                                    <span>*</span>
                                </label>

                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={
                                        formData.phoneNumber
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter 10-digit number"
                                    maxLength="10"
                                    inputMode="numeric"
                                    readOnly={!editMode}
                                    required
                                />

                            </div>

                            <div className="resident-profile-input">

                                <label htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={
                                        formData.dateOfBirth
                                    }
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />

                            </div>

                            <div className="resident-profile-input">

                                <label htmlFor="gender">
                                    Gender
                                </label>

                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                >
                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                            <div className="resident-profile-input">

                                <label htmlFor="residentId">
                                    Resident ID
                                </label>

                                <input
                                    type="text"
                                    id="residentId"
                                    value={residentId}
                                    readOnly
                                />

                            </div>

                            <div className="resident-profile-input resident-profile-full-width">

                                <label htmlFor="address">
                                    Permanent Address
                                </label>

                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your permanent address"
                                    rows="3"
                                    readOnly={!editMode}
                                ></textarea>

                            </div>

                        </div>

                    </div>

                    <div className="resident-profile-form-card">

                        <div className="resident-profile-section-heading">

                            <span>
                                <ProfileIcon name="education" />
                            </span>

                            <div>
                                <h2>Academic Information</h2>

                                <p>
                                    Your course and study details.
                                </p>
                            </div>

                        </div>

                        <div className="resident-profile-form-grid">

                            <div className="resident-profile-input">

                                <label htmlFor="course">
                                    Course
                                </label>

                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    placeholder="Example: B.Tech CSE"
                                    readOnly={!editMode}
                                />

                            </div>

                            <div className="resident-profile-input">

                                <label htmlFor="yearOfStudy">
                                    Year of Study
                                </label>

                                <select
                                    id="yearOfStudy"
                                    name="yearOfStudy"
                                    value={
                                        formData.yearOfStudy
                                    }
                                    onChange={handleChange}
                                    disabled={!editMode}
                                >
                                    <option value="">
                                        Select year
                                    </option>

                                    <option value="First Year">
                                        First Year
                                    </option>

                                    <option value="Second Year">
                                        Second Year
                                    </option>

                                    <option value="Third Year">
                                        Third Year
                                    </option>

                                    <option value="Fourth Year">
                                        Fourth Year
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                    <div className="resident-profile-form-card">

                        <div className="resident-profile-section-heading">

                            <span>
                                <ProfileIcon name="emergency" />
                            </span>

                            <div>
                                <h2>Emergency Contact</h2>

                                <p>
                                    Person to contact during an emergency.
                                </p>
                            </div>

                        </div>

                        <div className="resident-profile-form-grid">

                            <div className="resident-profile-input">

                                <label htmlFor="guardianName">
                                    Guardian Name
                                </label>

                                <input
                                    type="text"
                                    id="guardianName"
                                    name="guardianName"
                                    value={
                                        formData.guardianName
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter guardian name"
                                    readOnly={!editMode}
                                />

                            </div>

                            <div className="resident-profile-input">

                                <label htmlFor="emergencyPhone">
                                    Emergency Phone
                                </label>

                                <input
                                    type="tel"
                                    id="emergencyPhone"
                                    name="emergencyPhone"
                                    value={
                                        formData.emergencyPhone
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter 10-digit number"
                                    maxLength="10"
                                    inputMode="numeric"
                                    readOnly={!editMode}
                                />

                            </div>

                        </div>

                    </div>

                    {editMode && (

                        <div className="resident-profile-form-actions">

                            <button
                                type="button"
                                className="resident-profile-cancel-button"
                                onClick={cancelEditing}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="resident-profile-save-button"
                            >
                                Save Changes
                            </button>

                        </div>

                    )}

                </form>

                <aside className="resident-profile-sidebar">

                    <article className="resident-profile-side-card">

                        <div className="resident-profile-side-heading">

                            <span>
                                <ProfileIcon name="hostel" />
                            </span>

                            <div>
                                <h2>Hostel Information</h2>
                                <p>Your current stay details</p>
                            </div>

                        </div>

                        <div className="resident-profile-detail-list">

                            <div>
                                <span>Hostel Name</span>
                                <strong>{hostelName}</strong>
                            </div>

                            <div>
                                <span>Hostel Code</span>
                                <strong>{hostelCode}</strong>
                            </div>

                            <div>
                                <span>Room Number</span>
                                <strong>Room {roomNumber}</strong>
                            </div>

                            <div>
                                <span>Room Type</span>

                                <strong>
                                    {resident.roomType ||
                                        resident.preferredRoomType ||
                                        "Two Sharing"}
                                </strong>
                            </div>

                        </div>

                    </article>

                    <article className="resident-profile-side-card">

                        <div className="resident-profile-side-heading">

                            <span>
                                <ProfileIcon name="security" />
                            </span>

                            <div>
                                <h2>Account Security</h2>
                                <p>Password and login security</p>
                            </div>

                        </div>

                        <div className="resident-security-status">

                            <span>✓</span>

                            <div>
                                <strong>Account secured</strong>

                                <p>
                                    Your password is protected.
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            className="resident-change-password"
                            onClick={() =>
                                alert(
                                    "Password change will be connected with the backend later."
                                )
                            }
                        >
                            Change Password
                        </button>

                    </article>

                    <article className="resident-profile-completion-card">

                        <div className="resident-completion-value">
                            <strong>80%</strong>
                            <span>Complete</span>
                        </div>

                        <div>
                            <h2>Profile completion</h2>

                            <p>
                                Complete all fields to help the
                                hostel administrator manage your
                                information.
                            </p>
                        </div>

                    </article>

                </aside>

            </section>

        </div>
    );
}

function ProfileIcon({ name }) {

    const icons = {

        edit: (
            <>
                <path d="M4 20H8L19 9C20.1 7.9 20.1 6.1 19 5C17.9 3.9 16.1 3.9 15 5L4 16V20Z" />
                <path d="M13 7L17 11" />
            </>
        ),

        id: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8" cy="11" r="2" />
                <path d="M5 16C5.5 14.5 6.5 14 8 14C9.5 14 10.5 14.5 11 16" />
                <path d="M14 10H18M14 14H18" />
            </>
        ),

        room: (
            <>
                <path d="M4 21V5H18V21M2 21H21" />
                <path d="M8 9H14M8 13H14M8 17H12" />
            </>
        ),

        hostel: (
            <>
                <path d="M4 21V5H14V21M14 9H20V21M2 21H22" />
                <path d="M8 9H10M8 13H10M8 17H10M17 13H18M17 17H18" />
            </>
        ),

        status: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12L11 15L16 9" />
            </>
        ),

        profile: (
            <>
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21C5 16.8 8.1 14 12 14C15.9 14 19 16.8 19 21" />
            </>
        ),

        education: (
            <>
                <path d="M3 9L12 4L21 9L12 14L3 9Z" />
                <path d="M7 12V17C10 19 14 19 17 17V12" />
                <path d="M21 9V15" />
            </>
        ),

        emergency: (
            <>
                <path d="M12 21C12 21 4 16.5 4 10C4 6.7 6.4 5 9 5C10.5 5 11.5 5.8 12 7C12.5 5.8 13.5 5 15 5C17.6 5 20 6.7 20 10C20 16.5 12 21 12 21Z" />
                <path d="M9 12H11L12 10L13 14L14 12H16" />
            </>
        ),

        security: (
            <>
                <path d="M12 3L19 6V11C19 16 16 19.5 12 21C8 19.5 5 16 5 11V6L12 3Z" />
                <path d="M9 12L11 14L15 9" />
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

export default ResidentProfile;