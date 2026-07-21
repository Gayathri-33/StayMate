import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./AllocationStatus.css";

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

function getRoomRequests() {

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
}

function findResidentRequest(resident) {

    const requests = getRoomRequests();

    return [...requests]
        .reverse()
        .find((request) => {

            if (
                resident.allocationRequestId &&
                request.id ===
                resident.allocationRequestId
            ) {
                return true;
            }

            if (
                resident.residentId &&
                request.residentId ===
                resident.residentId
            ) {
                return true;
            }

            if (
                resident.email &&
                request.email?.toLowerCase() ===
                resident.email.toLowerCase()
            ) {
                return true;
            }

            return false;
        });
}

function AllocationStatus() {

    const navigate = useNavigate();

    const [resident, setResident] =
        useState(getResident);

    const [allocationRequest, setAllocationRequest] =
        useState(() =>
            findResidentRequest(getResident())
        );

    const [refreshMessage, setRefreshMessage] =
        useState("");

    const allocationStatus =
        allocationRequest?.status ||
        resident.allocationStatus ||
        localStorage.getItem("allocationStatus") ||
        "PENDING";

    const residentName =
        resident.fullName ||
        resident.name ||
        allocationRequest?.residentName ||
        localStorage.getItem("residentName") ||
        "Resident";

    const roomNumber =
        allocationRequest?.roomNumber ||
        resident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "";

    useEffect(() => {

        if (!allocationRequest) {
            return;
        }

        const updatedResident = {
            ...resident,
            allocationStatus:
                allocationRequest.status,
            allocationRequestId:
                allocationRequest.id,
            roomNumber:
                allocationRequest.roomNumber || ""
        };

        setResident(updatedResident);

        localStorage.setItem(
            "resident",
            JSON.stringify(updatedResident)
        );

        localStorage.setItem(
            "allocationStatus",
            allocationRequest.status
        );

        if (allocationRequest.roomNumber) {

            localStorage.setItem(
                "roomNumber",
                allocationRequest.roomNumber
            );
        }

    }, [allocationRequest]);

    const refreshStatus = () => {

        const latestResident = getResident();

        const latestRequest =
            findResidentRequest(latestResident);

        setResident(latestResident);
        setAllocationRequest(latestRequest);

        if (latestRequest) {

            setRefreshMessage(
                `Status refreshed: ${latestRequest.status}`
            );

        } else {

            setRefreshMessage(
                "No room allocation request was found."
            );
        }

        setTimeout(() => {
            setRefreshMessage("");
        }, 2500);
    };

    const goToDashboard = () => {

        if (allocationStatus !== "APPROVED") {
            return;
        }

        navigate("/resident/dashboard");
    };

    const submitNewRequest = () => {

        const updatedResident = {
            ...resident,
            allocationStatus: "NONE",
            allocationRequestId: "",
            roomNumber: ""
        };

        localStorage.setItem(
            "resident",
            JSON.stringify(updatedResident)
        );

        localStorage.setItem(
            "allocationStatus",
            "NONE"
        );

        localStorage.removeItem("roomNumber");

        navigate("/resident/room-request");
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const statusInformation = {

        PENDING: {
            label: "Approval Pending",
            title: "Your request is being reviewed",
            description:
                "Your room allocation request has been submitted successfully. The hostel administrator will review your details and assign an available room.",
            icon: "clock"
        },

        APPROVED: {
            label: "Request Approved",
            title: "Your room has been allocated!",
            description:
                "Your request was approved by the hostel administrator. You can now access your Resident Dashboard and use all hostel services.",
            icon: "approved"
        },

        REJECTED: {
            label: "Request Rejected",
            title: "Your request was not approved",
            description:
                "Unfortunately, the hostel administrator could not approve your room allocation request. Review the reason and submit a new request.",
            icon: "rejected"
        }

    };

    const currentStatus =
        statusInformation[allocationStatus] ||
        statusInformation.PENDING;

    return (
        <div className="allocation-status-page">

            <div className="status-background-circle status-circle-one"></div>
            <div className="status-background-circle status-circle-two"></div>

            <header className="allocation-status-header">

                <button
                    type="button"
                    className="allocation-status-brand"
                    onClick={() => navigate("/")}
                >

                    <span className="status-brand-icon">

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

                <div className="status-header-user">

                    <span className="status-user-avatar">
                        {residentName
                            .charAt(0)
                            .toUpperCase()}
                    </span>

                    <div>
                        <strong>{residentName}</strong>
                        <small>Resident</small>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            <main className="allocation-status-main">

                <section className="allocation-status-container">

                    <div className="allocation-status-progress">

                        <div className="status-progress-item completed">
                            <span>✓</span>
                            <p>Registration</p>
                        </div>

                        <div className="status-progress-line completed"></div>

                        <div className="status-progress-item completed">
                            <span>✓</span>
                            <p>Login</p>
                        </div>

                        <div className="status-progress-line completed"></div>

                        <div className="status-progress-item completed">
                            <span>✓</span>
                            <p>Room Request</p>
                        </div>

                        <div
                            className={`status-progress-line ${
                                allocationStatus === "APPROVED"
                                    ? "completed"
                                    : ""
                            }`}
                        ></div>

                        <div
                            className={`status-progress-item ${
                                allocationStatus === "APPROVED"
                                    ? "completed"
                                    : "active"
                            }`}
                        >
                            <span>
                                {allocationStatus === "APPROVED"
                                    ? "✓"
                                    : "4"}
                            </span>

                            <p>Admin Approval</p>
                        </div>

                    </div>

                    <div
                        className={`allocation-status-result status-${allocationStatus.toLowerCase()}`}
                    >

                        <div className="allocation-status-icon">

                            {currentStatus.icon === "clock" && (

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    />

                                    <path
                                        d="M12 7V12L15.5 14"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                    />
                                </svg>

                            )}

                            {currentStatus.icon === "approved" && (

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    />

                                    <path
                                        d="M8 12L11 15L16.5 9"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                            )}

                            {currentStatus.icon === "rejected" && (

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    />

                                    <path
                                        d="M9 9L15 15M15 9L9 15"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                    />
                                </svg>

                            )}

                        </div>

                        <span className="allocation-status-label">
                            {currentStatus.label}
                        </span>

                        <h1>{currentStatus.title}</h1>

                        <p className="allocation-status-description">
                            {currentStatus.description}
                        </p>

                        {allocationStatus === "PENDING" && (

                            <div className="pending-status-information">

                                <div>
                                    <span>Request ID</span>

                                    <strong>
                                        {allocationRequest?.id ||
                                            "Not available"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Requested Date</span>

                                    <strong>
                                        {allocationRequest
                                            ?.requestedDate ||
                                            "Not available"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Preferred Room</span>

                                    <strong>
                                        {allocationRequest
                                            ?.preferredRoomType ||
                                            "Not available"}
                                    </strong>
                                </div>

                            </div>

                        )}

                        {allocationStatus === "APPROVED" && (

                            <div className="approved-room-card">

                                <span className="approved-room-icon">

                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M4 21V5H18V21M2 21H21M8 9H14M8 13H14M8 17H12M15 17H16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                </span>

                                <div>
                                    <p>Your Allocated Room</p>
                                    <h2>Room {roomNumber}</h2>

                                    <span>
                                        {
                                            allocationRequest
                                                ?.preferredRoomType
                                        }
                                    </span>
                                </div>

                            </div>

                        )}

                        {allocationStatus === "REJECTED" && (

                            <div className="rejection-reason">

                                <span>Reason from administrator</span>

                                <p>
                                    {allocationRequest
                                        ?.rejectionReason ||
                                        "Your request could not be approved at this time."}
                                </p>

                            </div>

                        )}

                        {refreshMessage && (

                            <p className="status-refresh-message">
                                {refreshMessage}
                            </p>

                        )}

                        <div className="allocation-status-actions">

                            {allocationStatus === "PENDING" && (

                                <button
                                    type="button"
                                    className="status-refresh-button"
                                    onClick={refreshStatus}
                                >

                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M20 7V3L18 5C16.4 3.7 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16 21 19.3 18.4 20.5 15"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    Refresh Status

                                </button>

                            )}

                            {allocationStatus === "APPROVED" && (

                                <button
                                    type="button"
                                    className="status-dashboard-button"
                                    onClick={goToDashboard}
                                >
                                    Go to Resident Dashboard
                                    <span>→</span>
                                </button>

                            )}

                            {allocationStatus === "REJECTED" && (

                                <button
                                    type="button"
                                    className="status-new-request-button"
                                    onClick={submitNewRequest}
                                >
                                    Submit New Request
                                    <span>→</span>
                                </button>

                            )}

                        </div>

                    </div>

                    <div className="allocation-help-section">

                        <span className="allocation-help-icon">
                            i
                        </span>

                        <div>
                            <h2>Need help?</h2>

                            <p>
                                Contact your hostel administrator if
                                your request remains pending for a
                                long time or if you need to update
                                your details.
                            </p>
                        </div>

                    </div>

                </section>

            </main>

            <footer className="allocation-status-footer">
                © 2026 StayMate. Smart hostel management made simple.
            </footer>

        </div>
    );
}

export default AllocationStatus;