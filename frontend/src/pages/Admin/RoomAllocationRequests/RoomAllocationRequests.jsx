import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomAllocationRequests.css";

const sampleRequests = [
    {
        id: "REQ-1001",
        residentId: "RES-201",
        residentName: "Rahul Kumar",
        email: "rahul@gmail.com",
        phoneNumber: "9876543210",
        preferredRoomType: "Two Sharing",
        hostelCode: "STM101",
        requestedDate: "20 July 2026",
        status: "PENDING",
        roomNumber: "",
        rejectionReason: ""
    },
    {
        id: "REQ-1002",
        residentId: "RES-202",
        residentName: "Arjun Reddy",
        email: "arjun@gmail.com",
        phoneNumber: "9876501234",
        preferredRoomType: "Three Sharing",
        hostelCode: "STM101",
        requestedDate: "21 July 2026",
        status: "PENDING",
        roomNumber: "",
        rejectionReason: ""
    },
    {
        id: "REQ-1003",
        residentId: "RES-203",
        residentName: "Kiran Sai",
        email: "kiran@gmail.com",
        phoneNumber: "9123456780",
        preferredRoomType: "Two Sharing",
        hostelCode: "STM101",
        requestedDate: "18 July 2026",
        status: "APPROVED",
        roomNumber: "204",
        rejectionReason: ""
    },
    {
        id: "REQ-1004",
        residentId: "RES-204",
        residentName: "Manoj Kumar",
        email: "manoj@gmail.com",
        phoneNumber: "9012345678",
        preferredRoomType: "Single Room",
        hostelCode: "STM101",
        requestedDate: "17 July 2026",
        status: "REJECTED",
        roomNumber: "",
        rejectionReason: "No single rooms are currently available."
    }
];

const availableRooms = [
    "101",
    "102",
    "105",
    "201",
    "202",
    "205",
    "301",
    "302"
];

function getInitialRequests() {

    try {

        const storedRequests =
            localStorage.getItem(
                "roomAllocationRequests"
            );

        if (storedRequests) {
            return JSON.parse(storedRequests);
        }

    } catch (error) {
        console.error(
            "Unable to read room allocation requests:",
            error
        );
    }

    return sampleRequests;
}

function RoomAllocationRequests() {

    const navigate = useNavigate();

    const [requests, setRequests] =
        useState(getInitialRequests);

    const [selectedFilter, setSelectedFilter] =
        useState("ALL");

    const [searchText, setSearchText] =
        useState("");

    const [selectedRooms, setSelectedRooms] =
        useState({});

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");

    const pendingCount =
        requests.filter(
            (request) =>
                request.status === "PENDING"
        ).length;

    const approvedCount =
        requests.filter(
            (request) =>
                request.status === "APPROVED"
        ).length;

    const rejectedCount =
        requests.filter(
            (request) =>
                request.status === "REJECTED"
        ).length;

    const saveRequests = (updatedRequests) => {

        setRequests(updatedRequests);

        localStorage.setItem(
            "roomAllocationRequests",
            JSON.stringify(updatedRequests)
        );
    };

    const handleRoomSelection = (
        requestId,
        roomNumber
    ) => {

        setSelectedRooms({
            ...selectedRooms,
            [requestId]: roomNumber
        });

        setMessage("");
    };

    const updateCurrentResident = (
        approvedRequest
    ) => {

        try {

            const savedResident =
                JSON.parse(
                    localStorage.getItem("resident")
                );

            if (
                savedResident &&
                (
                    savedResident.email ===
                    approvedRequest.email ||
                    savedResident.residentId ===
                    approvedRequest.residentId
                )
            ) {

                const updatedResident = {
                    ...savedResident,
                    allocationStatus: "APPROVED",
                    roomNumber:
                        approvedRequest.roomNumber
                };

                localStorage.setItem(
                    "resident",
                    JSON.stringify(updatedResident)
                );

                localStorage.setItem(
                    "allocationStatus",
                    "APPROVED"
                );

                localStorage.setItem(
                    "roomNumber",
                    approvedRequest.roomNumber
                );
            }

        } catch (error) {
            console.error(
                "Unable to update resident:",
                error
            );
        }
    };

    const approveRequest = (requestId) => {

        const selectedRoom =
            selectedRooms[requestId];

        if (!selectedRoom) {
            setMessageType("error");
            setMessage(
                "Please select a room before approving the request."
            );
            return;
        }

        const updatedRequests =
            requests.map((request) => {

                if (request.id === requestId) {

                    return {
                        ...request,
                        status: "APPROVED",
                        roomNumber: selectedRoom,
                        rejectionReason: ""
                    };
                }

                return request;
            });

        saveRequests(updatedRequests);

        const approvedRequest =
            updatedRequests.find(
                (request) =>
                    request.id === requestId
            );

        updateCurrentResident(approvedRequest);

        setMessageType("success");
        setMessage(
            `${approvedRequest.residentName} has been allocated Room ${selectedRoom}.`
        );
    };

    const rejectRequest = (requestId) => {

        const requestToReject =
            requests.find(
                (request) =>
                    request.id === requestId
            );

        const confirmation =
            window.confirm(
                `Reject the room allocation request from ${requestToReject.residentName}?`
            );

        if (!confirmation) {
            return;
        }

        const updatedRequests =
            requests.map((request) => {

                if (request.id === requestId) {

                    return {
                        ...request,
                        status: "REJECTED",
                        roomNumber: "",
                        rejectionReason:
                            "The room allocation request was rejected by the administrator."
                    };
                }

                return request;
            });

        saveRequests(updatedRequests);

        setMessageType("success");
        setMessage(
            `${requestToReject.residentName}'s request has been rejected.`
        );
    };

    const filteredRequests =
        requests.filter((request) => {

            const matchesFilter =
                selectedFilter === "ALL" ||
                request.status === selectedFilter;

            const searchValue =
                searchText.trim().toLowerCase();

            const matchesSearch =
                !searchValue ||
                request.residentName
                    .toLowerCase()
                    .includes(searchValue) ||
                request.residentId
                    .toLowerCase()
                    .includes(searchValue) ||
                request.email
                    .toLowerCase()
                    .includes(searchValue) ||
                request.id
                    .toLowerCase()
                    .includes(searchValue);

            return matchesFilter && matchesSearch;
        });

    return (
        <div className="allocation-admin-page">

            <header className="allocation-admin-header">

                <button
                    type="button"
                    className="allocation-admin-brand"
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                >

                    <span className="allocation-brand-icon">

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
                    className="allocation-dashboard-button"
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>

            </header>

            <main className="allocation-admin-main">

                <section className="allocation-page-heading">

                    <div>

                        <span className="allocation-page-label">
                            Room Management
                        </span>

                        <h1>Room Allocation Requests</h1>

                        <p>
                            Review resident requests, select available
                            rooms and approve or reject allocation.
                        </p>

                    </div>

                    <div className="allocation-heading-icon">

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

                </section>

                <section className="allocation-summary-grid">

                    <article className="allocation-summary-card">

                        <span className="allocation-summary-icon total">
                            ▦
                        </span>

                        <div>
                            <p>Total Requests</p>
                            <h2>{requests.length}</h2>
                        </div>

                    </article>

                    <article className="allocation-summary-card">

                        <span className="allocation-summary-icon pending">
                            ◷
                        </span>

                        <div>
                            <p>Pending Requests</p>
                            <h2>{pendingCount}</h2>
                        </div>

                    </article>

                    <article className="allocation-summary-card">

                        <span className="allocation-summary-icon approved">
                            ✓
                        </span>

                        <div>
                            <p>Approved</p>
                            <h2>{approvedCount}</h2>
                        </div>

                    </article>

                    <article className="allocation-summary-card">

                        <span className="allocation-summary-icon rejected">
                            ×
                        </span>

                        <div>
                            <p>Rejected</p>
                            <h2>{rejectedCount}</h2>
                        </div>

                    </article>

                </section>

                {message && (

                    <div
                        className={`allocation-message ${
                            messageType === "success"
                                ? "allocation-message-success"
                                : "allocation-message-error"
                        }`}
                    >
                        {message}
                    </div>

                )}

                <section className="allocation-request-section">

                    <div className="allocation-toolbar">

                        <div className="allocation-search">

                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />

                                <path
                                    d="M16 16L21 21"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <input
                                type="search"
                                placeholder="Search resident, email or request ID"
                                value={searchText}
                                onChange={(event) =>
                                    setSearchText(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="allocation-filter-tabs">

                            {[
                                {
                                    name: "ALL",
                                    label: "All",
                                    count: requests.length
                                },
                                {
                                    name: "PENDING",
                                    label: "Pending",
                                    count: pendingCount
                                },
                                {
                                    name: "APPROVED",
                                    label: "Approved",
                                    count: approvedCount
                                },
                                {
                                    name: "REJECTED",
                                    label: "Rejected",
                                    count: rejectedCount
                                }
                            ].map((filter) => (

                                <button
                                    type="button"
                                    key={filter.name}
                                    className={
                                        selectedFilter ===
                                        filter.name
                                            ? "allocation-filter-active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSelectedFilter(
                                            filter.name
                                        )
                                    }
                                >
                                    {filter.label}
                                    <span>{filter.count}</span>
                                </button>

                            ))}

                        </div>

                    </div>

                    {filteredRequests.length === 0 ? (

                        <div className="allocation-empty-state">

                            <span>⌕</span>

                            <h2>No requests found</h2>

                            <p>
                                No room allocation requests match
                                your current search or filter.
                            </p>

                        </div>

                    ) : (

                        <div className="allocation-request-list">

                            {filteredRequests.map((request) => (

                                <article
                                    className="allocation-request-card"
                                    key={request.id}
                                >

                                    <div className="allocation-request-card-top">

                                        <div className="allocation-resident-summary">

                                            <span className="allocation-resident-avatar">
                                                {request.residentName
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>

                                            <div>
                                                <h2>
                                                    {
                                                        request.residentName
                                                    }
                                                </h2>

                                                <p>
                                                    {
                                                        request.residentId
                                                    }
                                                    <span>•</span>
                                                    {request.id}
                                                </p>
                                            </div>

                                        </div>

                                        <span
                                            className={`allocation-status allocation-status-${request.status.toLowerCase()}`}
                                        >
                                            {request.status}
                                        </span>

                                    </div>

                                    <div className="allocation-request-details">

                                        <div>
                                            <span>Email Address</span>
                                            <strong>
                                                {request.email}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Phone Number</span>
                                            <strong>
                                                {request.phoneNumber}
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
                                            <span>Hostel Code</span>
                                            <strong>
                                                {request.hostelCode}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Requested Date</span>
                                            <strong>
                                                {
                                                    request.requestedDate
                                                }
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Assigned Room</span>
                                            <strong>
                                                {request.roomNumber ||
                                                    "Not assigned"}
                                            </strong>
                                        </div>

                                    </div>

                                    {request.status === "PENDING" && (

                                        <div className="allocation-request-actions">

                                            <div className="allocation-room-select">

                                                <label
                                                    htmlFor={`room-${request.id}`}
                                                >
                                                    Select Room
                                                </label>

                                                <select
                                                    id={`room-${request.id}`}
                                                    value={
                                                        selectedRooms[
                                                            request.id
                                                        ] || ""
                                                    }
                                                    onChange={(event) =>
                                                        handleRoomSelection(
                                                            request.id,
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Choose available room
                                                    </option>

                                                    {availableRooms.map(
                                                        (room) => (
                                                            <option
                                                                key={
                                                                    room
                                                                }
                                                                value={
                                                                    room
                                                                }
                                                            >
                                                                Room{" "}
                                                                {room}
                                                            </option>
                                                        )
                                                    )}

                                                </select>

                                            </div>

                                            <div className="allocation-action-buttons">

                                                <button
                                                    type="button"
                                                    className="allocation-reject-button"
                                                    onClick={() =>
                                                        rejectRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>

                                                <button
                                                    type="button"
                                                    className="allocation-approve-button"
                                                    onClick={() =>
                                                        approveRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    Approve & Allocate
                                                </button>

                                            </div>

                                        </div>

                                    )}

                                    {request.status === "APPROVED" && (

                                        <div className="allocation-result allocation-approved-result">

                                            <span>✓</span>

                                            <p>
                                                Resident has been
                                                allocated to Room{" "}
                                                <strong>
                                                    {
                                                        request.roomNumber
                                                    }
                                                </strong>
                                                .
                                            </p>

                                        </div>

                                    )}

                                    {request.status === "REJECTED" && (

                                        <div className="allocation-result allocation-rejected-result">

                                            <span>!</span>

                                            <p>
                                                {
                                                    request.rejectionReason
                                                }
                                            </p>

                                        </div>

                                    )}

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default RoomAllocationRequests;