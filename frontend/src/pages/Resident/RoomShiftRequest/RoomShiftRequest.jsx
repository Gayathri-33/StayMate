import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomShiftRequest.css";

function getResident() {

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

function getStoredShiftRequests() {

    try {

        const storedRequests =
            localStorage.getItem(
                "roomShiftRequests"
            );

        return storedRequests
            ? JSON.parse(storedRequests)
            : [];

    } catch {
        return [];
    }
}

function RoomShiftRequest() {

    const navigate = useNavigate();
    const resident = getResident();

    const residentId =
        resident.residentId ||
        localStorage.getItem("residentId") ||
        "RES-001";

    const residentName =
        resident.fullName ||
        resident.name ||
        localStorage.getItem("residentName") ||
        "Resident";

    const currentRoom =
        resident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "";

    const currentRoomType =
        resident.roomType ||
        resident.preferredRoomType ||
        "Two Sharing";

    const [formData, setFormData] = useState({
        preferredRoomType: "",
        preferredFloor: "",
        shiftReason: "",
        additionalDetails: "",
        priority: "NORMAL"
    });

    const [requests, setRequests] = useState(() => {

        const allRequests =
            getStoredShiftRequests();

        return allRequests.filter(
            (request) =>
                request.residentId === residentId
        );
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setMessage("");
    };

    const saveAllRequests = (
        updatedResidentRequests
    ) => {

        const allRequests =
            getStoredShiftRequests();

        const otherResidentRequests =
            allRequests.filter(
                (request) =>
                    request.residentId !== residentId
            );

        const updatedAllRequests = [
            ...otherResidentRequests,
            ...updatedResidentRequests
        ];

        localStorage.setItem(
            "roomShiftRequests",
            JSON.stringify(updatedAllRequests)
        );

        setRequests(updatedResidentRequests);
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!currentRoom) {
            setMessageType("error");
            setMessage(
                "You must have an allocated room before requesting a room shift."
            );
            return;
        }

        if (
            !formData.preferredRoomType ||
            !formData.shiftReason
        ) {
            setMessageType("error");
            setMessage(
                "Please select a preferred room type and reason."
            );
            return;
        }

        if (
            formData.shiftReason === "OTHER" &&
            !formData.additionalDetails.trim()
        ) {
            setMessageType("error");
            setMessage(
                "Please explain the reason for your room shift request."
            );
            return;
        }

        const existingPendingRequest =
            requests.find(
                (request) =>
                    request.status === "PENDING"
            );

        if (existingPendingRequest) {
            setMessageType("error");
            setMessage(
                "You already have a pending room shift request."
            );
            return;
        }

        setSubmitting(true);

        const newRequest = {
            id:
                `SHIFT-${Date.now()
                    .toString()
                    .slice(-6)}`,
            residentId,
            residentName,
            currentRoom,
            currentRoomType,
            preferredRoomType:
                formData.preferredRoomType,
            preferredFloor:
                formData.preferredFloor ||
                "No Preference",
            shiftReason:
                formData.shiftReason,
            additionalDetails:
                formData.additionalDetails.trim(),
            priority:
                formData.priority,
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
            allocatedRoom: "",
            adminMessage: ""
        };

        const updatedRequests = [
            newRequest,
            ...requests
        ];

        saveAllRequests(updatedRequests);

        setFormData({
            preferredRoomType: "",
            preferredFloor: "",
            shiftReason: "",
            additionalDetails: "",
            priority: "NORMAL"
        });

        setMessageType("success");
        setMessage(
            "Room shift request submitted successfully."
        );

        setSubmitting(false);
    };

    const cancelRequest = (requestId) => {

        const confirmation =
            window.confirm(
                "Do you want to cancel this room shift request?"
            );

        if (!confirmation) {
            return;
        }

        const updatedRequests =
            requests.map((request) => {

                if (request.id === requestId) {

                    return {
                        ...request,
                        status: "CANCELLED"
                    };
                }

                return request;
            });

        saveAllRequests(updatedRequests);

        setMessageType("success");
        setMessage(
            "Room shift request cancelled successfully."
        );
    };

    const getReasonLabel = (reason) => {

        const reasonLabels = {
            ROOMMATE_ISSUE: "Roommate Issue",
            MAINTENANCE: "Maintenance Problem",
            HEALTH_REASON: "Health Reason",
            NOISE: "Noise or Disturbance",
            ROOM_TYPE: "Need Different Room Type",
            FLOOR_CHANGE: "Need Different Floor",
            OTHER: "Other Reason"
        };

        return reasonLabels[reason] || reason;
    };

    return (
        <div className="room-shift-page">

            <section className="room-shift-banner">

                <div>

                    <span className="room-shift-banner-label">
                        Room Management
                    </span>

                    <h2>Request a Room Shift</h2>

                    <p>
                        Submit your room change request with your
                        preferred room type and reason. The hostel
                        administrator will review your request.
                    </p>

                </div>

                <div className="room-shift-current-room">

                    <span>Current Room</span>

                    <strong>
                        {currentRoom || "Not Allocated"}
                    </strong>

                    <small>{currentRoomType}</small>

                </div>

            </section>

            <section className="room-shift-summary">

                <article>

                    <span className="room-shift-summary-icon">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M4 21V5H18V21M2 21H21M8 9H14M8 13H14M8 17H12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>

                    </span>

                    <div>
                        <p>Current Room</p>
                        <h3>
                            Room {currentRoom || "Not Assigned"}
                        </h3>
                    </div>

                </article>

                <article>

                    <span className="room-shift-summary-icon">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M4 8H19M16 5L19 8L16 11M20 16H5M8 13L5 16L8 19"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </span>

                    <div>
                        <p>Pending Requests</p>

                        <h3>
                            {
                                requests.filter(
                                    (request) =>
                                        request.status ===
                                        "PENDING"
                                ).length
                            }
                        </h3>
                    </div>

                </article>

                <article>

                    <span className="room-shift-summary-icon">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            />

                            <path
                                d="M8 12L11 15L16 9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </span>

                    <div>
                        <p>Approved Requests</p>

                        <h3>
                            {
                                requests.filter(
                                    (request) =>
                                        request.status ===
                                        "APPROVED"
                                ).length
                            }
                        </h3>
                    </div>

                </article>

            </section>

            <section className="room-shift-content">

                <div className="room-shift-form-card">

                    <div className="room-shift-section-heading">

                        <div>
                            <h2>New Shift Request</h2>

                            <p>
                                Enter your room preference and the
                                reason for requesting a shift.
                            </p>
                        </div>

                        <span>New Request</span>

                    </div>

                    <form
                        className="room-shift-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="room-shift-form-grid">

                            <div className="room-shift-input">

                                <label htmlFor="currentRoom">
                                    Current Room
                                </label>

                                <input
                                    type="text"
                                    id="currentRoom"
                                    value={
                                        currentRoom
                                            ? `Room ${currentRoom}`
                                            : "Not allocated"
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="room-shift-input">

                                <label htmlFor="currentRoomType">
                                    Current Room Type
                                </label>

                                <input
                                    type="text"
                                    id="currentRoomType"
                                    value={currentRoomType}
                                    readOnly
                                />

                            </div>

                            <div className="room-shift-input">

                                <label htmlFor="preferredRoomType">
                                    Preferred Room Type
                                    <span>*</span>
                                </label>

                                <select
                                    id="preferredRoomType"
                                    name="preferredRoomType"
                                    value={
                                        formData.preferredRoomType
                                    }
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select room type
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

                            <div className="room-shift-input">

                                <label htmlFor="preferredFloor">
                                    Preferred Floor
                                    <small>Optional</small>
                                </label>

                                <select
                                    id="preferredFloor"
                                    name="preferredFloor"
                                    value={
                                        formData.preferredFloor
                                    }
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        No floor preference
                                    </option>

                                    <option value="Ground Floor">
                                        Ground Floor
                                    </option>

                                    <option value="First Floor">
                                        First Floor
                                    </option>

                                    <option value="Second Floor">
                                        Second Floor
                                    </option>

                                    <option value="Third Floor">
                                        Third Floor
                                    </option>

                                </select>

                            </div>

                            <div className="room-shift-input">

                                <label htmlFor="shiftReason">
                                    Reason for Shift
                                    <span>*</span>
                                </label>

                                <select
                                    id="shiftReason"
                                    name="shiftReason"
                                    value={formData.shiftReason}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select a reason
                                    </option>

                                    <option value="ROOMMATE_ISSUE">
                                        Roommate Issue
                                    </option>

                                    <option value="MAINTENANCE">
                                        Maintenance Problem
                                    </option>

                                    <option value="HEALTH_REASON">
                                        Health Reason
                                    </option>

                                    <option value="NOISE">
                                        Noise or Disturbance
                                    </option>

                                    <option value="ROOM_TYPE">
                                        Need Different Room Type
                                    </option>

                                    <option value="FLOOR_CHANGE">
                                        Need Different Floor
                                    </option>

                                    <option value="OTHER">
                                        Other Reason
                                    </option>

                                </select>

                            </div>

                            <div className="room-shift-input">

                                <label htmlFor="priority">
                                    Request Priority
                                </label>

                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="NORMAL">
                                        Normal
                                    </option>

                                    <option value="URGENT">
                                        Urgent
                                    </option>

                                </select>

                            </div>

                            <div className="room-shift-input room-shift-full-width">

                                <label htmlFor="additionalDetails">
                                    Additional Details
                                    <small>Optional</small>
                                </label>

                                <textarea
                                    id="additionalDetails"
                                    name="additionalDetails"
                                    placeholder="Explain your reason and any specific room requirements"
                                    value={
                                        formData.additionalDetails
                                    }
                                    onChange={handleChange}
                                    rows="5"
                                    maxLength="500"
                                ></textarea>

                                <p className="room-shift-character-count">
                                    {
                                        formData
                                            .additionalDetails.length
                                    }
                                    /500
                                </p>

                            </div>

                        </div>

                        {message && (

                            <p
                                className={`room-shift-message ${
                                    messageType === "success"
                                        ? "room-shift-success"
                                        : "room-shift-error"
                                }`}
                            >
                                {message}
                            </p>

                        )}

                        <div className="room-shift-form-actions">

                            <button
                                type="button"
                                className="room-shift-room-details-button"
                                onClick={() =>
                                    navigate(
                                        "/resident/room-details"
                                    )
                                }
                            >
                                View Room Details
                            </button>

                            <button
                                type="submit"
                                className="room-shift-submit-button"
                                disabled={
                                    submitting || !currentRoom
                                }
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit Shift Request"}
                            </button>

                        </div>

                    </form>

                </div>

                <aside className="room-shift-guidelines">

                    <span className="room-shift-guidelines-icon">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            />

                            <path
                                d="M12 11V16M12 8H12.01"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>

                    </span>

                    <h2>Before submitting</h2>

                    <ul>
                        <li>
                            Room shifts depend on room availability.
                        </li>

                        <li>
                            The administrator may contact you for
                            additional details.
                        </li>

                        <li>
                            Only one pending request is allowed at
                            a time.
                        </li>

                        <li>
                            Urgent requests should have a valid
                            reason.
                        </li>

                        <li>
                            You will be notified after the admin
                            reviews your request.
                        </li>
                    </ul>

                </aside>

            </section>

            <section className="room-shift-history-card">

                <div className="room-shift-section-heading">

                    <div>
                        <h2>Request History</h2>

                        <p>
                            Track your previous room shift requests.
                        </p>
                    </div>

                    <span>
                        {requests.length} Requests
                    </span>

                </div>

                {requests.length === 0 ? (

                    <div className="room-shift-empty">

                        <span>⇄</span>

                        <h3>No room shift requests</h3>

                        <p>
                            Your submitted requests will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="room-shift-request-list">

                        {requests.map((request) => (

                            <article
                                className="room-shift-request-card"
                                key={request.id}
                            >

                                <div className="room-shift-request-top">

                                    <div>
                                        <h3>{request.id}</h3>

                                        <p>
                                            Requested on{" "}
                                            {request.requestedDate}
                                        </p>
                                    </div>

                                    <span
                                        className={`room-shift-status room-shift-status-${request.status.toLowerCase()}`}
                                    >
                                        {request.status}
                                    </span>

                                </div>

                                <div className="room-shift-request-details">

                                    <div>
                                        <span>Current Room</span>
                                        <strong>
                                            Room{" "}
                                            {request.currentRoom}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Preferred Room</span>
                                        <strong>
                                            {
                                                request.preferredRoomType
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Reason</span>
                                        <strong>
                                            {getReasonLabel(
                                                request.shiftReason
                                            )}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Priority</span>
                                        <strong>
                                            {request.priority}
                                        </strong>
                                    </div>

                                </div>

                                {request.status === "APPROVED" && (

                                    <div className="room-shift-approved-result">
                                        New room allocated:{" "}
                                        <strong>
                                            Room{" "}
                                            {
                                                request.allocatedRoom
                                            }
                                        </strong>
                                    </div>

                                )}

                                {request.status === "REJECTED" && (

                                    <div className="room-shift-rejected-result">
                                        {request.adminMessage ||
                                            "Request rejected by administrator."}
                                    </div>

                                )}

                                {request.status === "PENDING" && (

                                    <button
                                        type="button"
                                        className="room-shift-cancel-button"
                                        onClick={() =>
                                            cancelRequest(
                                                request.id
                                            )
                                        }
                                    >
                                        Cancel Request
                                    </button>

                                )}

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default RoomShiftRequest;