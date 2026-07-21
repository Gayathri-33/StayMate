import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomAllocationRequest.css";

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

function RoomAllocationRequest() {

    const navigate = useNavigate();
    const savedResident = getSavedResident();

    const residentId =
        savedResident.residentId ||
        localStorage.getItem("residentId") ||
        `RES-${Date.now().toString().slice(-6)}`;

    const [requestData, setRequestData] = useState({
        residentName:
            savedResident.fullName ||
            savedResident.name ||
            localStorage.getItem("residentName") ||
            "",
        email:
            savedResident.email ||
            localStorage.getItem("residentEmail") ||
            "",
        phoneNumber:
            savedResident.phoneNumber ||
            savedResident.phone ||
            localStorage.getItem("residentPhone") ||
            "",
        hostelCode:
            savedResident.hostelCode ||
            localStorage.getItem("hostelCode") ||
            "",
        preferredRoomType: "",
        additionalNote: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        let updatedValue = value;

        if (name === "phoneNumber") {
            updatedValue = value.replace(/\D/g, "");
        }

        setRequestData({
            ...requestData,
            [name]: updatedValue
        });

        setMessage("");
    };

    const getExistingRequests = () => {

        try {

            const savedRequests =
                localStorage.getItem(
                    "roomAllocationRequests"
                );

            return savedRequests
                ? JSON.parse(savedRequests)
                : [];

        } catch {
            return [];
        }
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (
            !requestData.residentName.trim() ||
            !requestData.email.trim() ||
            !requestData.phoneNumber ||
            !requestData.hostelCode.trim() ||
            !requestData.preferredRoomType
        ) {
            setMessageType("error");
            setMessage(
                "Please fill in all the required fields."
            );
            return;
        }

        if (
            !/^[0-9]{10}$/.test(
                requestData.phoneNumber
            )
        ) {
            setMessageType("error");
            setMessage(
                "Phone number must contain exactly 10 digits."
            );
            return;
        }

        const existingRequests =
            getExistingRequests();

        const activeRequest =
            existingRequests.find(
                (request) =>
                    (
                        request.residentId === residentId ||
                        request.email.toLowerCase() ===
                        requestData.email
                            .trim()
                            .toLowerCase()
                    ) &&
                    (
                        request.status === "PENDING" ||
                        request.status === "APPROVED"
                    )
            );

        if (activeRequest) {

            setMessageType("error");

            setMessage(
                activeRequest.status === "APPROVED"
                    ? "A room has already been allocated to you."
                    : "You already have a pending room allocation request."
            );

            return;
        }

        setSubmitting(true);

        const newRequest = {
            id:
                `REQ-${Date.now()
                    .toString()
                    .slice(-6)}`,
            residentId,
            residentName:
                requestData.residentName.trim(),
            email:
                requestData.email.trim(),
            phoneNumber:
                requestData.phoneNumber,
            hostelCode:
                requestData.hostelCode
                    .trim()
                    .toUpperCase(),
            preferredRoomType:
                requestData.preferredRoomType,
            additionalNote:
                requestData.additionalNote.trim(),
            requestedDate:
                new Intl.DateTimeFormat(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                ).format(new Date()),
            status: "PENDING",
            roomNumber: "",
            rejectionReason: ""
        };

        const updatedRequests = [
            ...existingRequests,
            newRequest
        ];

        localStorage.setItem(
            "roomAllocationRequests",
            JSON.stringify(updatedRequests)
        );

        const updatedResident = {
            ...savedResident,
            residentId,
            fullName:
                newRequest.residentName,
            email:
                newRequest.email,
            phoneNumber:
                newRequest.phoneNumber,
            hostelCode:
                newRequest.hostelCode,
            preferredRoomType:
                newRequest.preferredRoomType,
            allocationStatus: "PENDING",
            allocationRequestId:
                newRequest.id,
            roomNumber: ""
        };

        localStorage.setItem(
            "resident",
            JSON.stringify(updatedResident)
        );

        localStorage.setItem(
            "residentId",
            residentId
        );

        localStorage.setItem(
            "residentName",
            newRequest.residentName
        );

        localStorage.setItem(
            "residentEmail",
            newRequest.email
        );

        localStorage.setItem(
            "residentPhone",
            newRequest.phoneNumber
        );

        localStorage.setItem(
            "hostelCode",
            newRequest.hostelCode
        );

        localStorage.setItem(
            "allocationStatus",
            "PENDING"
        );

        setMessageType("success");
        setMessage(
            "Room allocation request submitted successfully."
        );

        setTimeout(() => {
            navigate("/resident/allocation-status");
        }, 1000);
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="room-request-page">

            <div className="room-request-circle request-circle-one"></div>
            <div className="room-request-circle request-circle-two"></div>

            <header className="room-request-header">

                <button
                    type="button"
                    className="room-request-brand"
                    onClick={() => navigate("/")}
                >

                    <span className="room-request-brand-icon">

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
                        <small>Resident Portal</small>
                    </span>

                </button>

                <button
                    type="button"
                    className="room-request-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>

            <main className="room-request-main">

                <section className="room-request-container">

                    <div className="room-request-heading">

                        <div className="room-request-heading-icon">

                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M4 21V5H18V21M2 21H21M8 9H14M8 13H14M8 17H12M15 17H16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>

                        </div>

                        <div>

                            <span>Room allocation</span>

                            <h1>Request Your Hostel Room</h1>

                            <p>
                                Submit your room preference. The hostel
                                administrator will review your request
                                and allocate an available room.
                            </p>

                        </div>

                    </div>

                    <div className="room-request-progress">

                        <div className="room-progress-item completed">
                            <span>✓</span>
                            <p>Registration</p>
                        </div>

                        <div className="room-progress-line completed"></div>

                        <div className="room-progress-item completed">
                            <span>✓</span>
                            <p>Login</p>
                        </div>

                        <div className="room-progress-line completed"></div>

                        <div className="room-progress-item active">
                            <span>3</span>
                            <p>Room Request</p>
                        </div>

                        <div className="room-progress-line"></div>

                        <div className="room-progress-item">
                            <span>4</span>
                            <p>Admin Approval</p>
                        </div>

                    </div>

                    <div className="room-request-content">

                        <aside className="room-request-information">

                            <span className="room-information-label">
                                What happens next?
                            </span>

                            <h2>
                                Your request will be reviewed by the admin
                            </h2>

                            <div className="room-information-steps">

                                <div>
                                    <span>1</span>

                                    <p>
                                        <strong>
                                            Submit your preference
                                        </strong>

                                        Choose your preferred room type
                                        and submit the request.
                                    </p>
                                </div>

                                <div>
                                    <span>2</span>

                                    <p>
                                        <strong>
                                            Admin reviews request
                                        </strong>

                                        The admin checks room
                                        availability.
                                    </p>
                                </div>

                                <div>
                                    <span>3</span>

                                    <p>
                                        <strong>
                                            Room is allocated
                                        </strong>

                                        You can access the Resident
                                        Dashboard after approval.
                                    </p>
                                </div>

                            </div>

                            <div className="room-request-note">
                                <span>i</span>

                                <p>
                                    You can track the request from the
                                    allocation status page.
                                </p>
                            </div>

                        </aside>

                        <form
                            className="room-allocation-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="room-form-title">
                                <h2>Resident Information</h2>

                                <p>
                                    Verify your information before
                                    submitting the request.
                                </p>
                            </div>

                            <div className="room-form-grid">

                                <div className="room-request-input">

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

                                <div className="room-request-input">

                                    <label htmlFor="residentName">
                                        Full Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="residentName"
                                        name="residentName"
                                        placeholder="Enter your full name"
                                        value={
                                            requestData.residentName
                                        }
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="room-request-input">

                                    <label htmlFor="email">
                                        Email Address
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={requestData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="room-request-input">

                                    <label htmlFor="phoneNumber">
                                        Phone Number
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Enter 10-digit number"
                                        value={
                                            requestData.phoneNumber
                                        }
                                        onChange={handleChange}
                                        maxLength="10"
                                        inputMode="numeric"
                                        required
                                    />

                                </div>

                                <div className="room-request-input">

                                    <label htmlFor="hostelCode">
                                        Hostel Code
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="hostelCode"
                                        name="hostelCode"
                                        placeholder="Enter your hostel code"
                                        value={
                                            requestData.hostelCode
                                        }
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="room-request-input">

                                    <label htmlFor="preferredRoomType">
                                        Preferred Room Type
                                        <span>*</span>
                                    </label>

                                    <select
                                        id="preferredRoomType"
                                        name="preferredRoomType"
                                        value={
                                            requestData
                                                .preferredRoomType
                                        }
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select room preference
                                        </option>

                                        <option value="Single Room">
                                            Single Room
                                        </option>

                                        <option value="Two Sharing">
                                            Two Sharing
                                        </option>

                                        <option value="Three Sharing">
                                            Three Sharing
                                        </option>

                                        <option value="Four Sharing">
                                            Four Sharing
                                        </option>

                                    </select>

                                </div>

                                <div className="room-request-input room-request-full-width">

                                    <label htmlFor="additionalNote">
                                        Additional Note
                                        <small>Optional</small>
                                    </label>

                                    <textarea
                                        id="additionalNote"
                                        name="additionalNote"
                                        placeholder="Mention any specific room requirement"
                                        value={
                                            requestData.additionalNote
                                        }
                                        onChange={handleChange}
                                        rows="4"
                                        maxLength="300"
                                    ></textarea>

                                    <p className="room-note-count">
                                        {
                                            requestData
                                                .additionalNote.length
                                        }
                                        /300
                                    </p>

                                </div>

                            </div>

                            {message && (

                                <p
                                    className={`room-request-message ${
                                        messageType === "success"
                                            ? "room-request-success"
                                            : "room-request-error"
                                    }`}
                                >
                                    {message}
                                </p>

                            )}

                            <button
                                type="submit"
                                className="room-request-submit"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Submitting Request..."
                                    : "Submit Room Request"}
                            </button>

                        </form>

                    </div>

                </section>

            </main>

            <footer className="room-request-footer">
                © 2026 StayMate. Smart hostel management made simple.
            </footer>

        </div>
    );
}

export default RoomAllocationRequest;