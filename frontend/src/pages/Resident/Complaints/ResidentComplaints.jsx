import { useState } from "react";
import "./ResidentComplaints.css";

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

function getAllComplaints() {

    try {

        const savedComplaints =
            localStorage.getItem(
                "hostelComplaints"
            );

        return savedComplaints
            ? JSON.parse(savedComplaints)
            : [];

    } catch {
        return [];
    }
}

function ResidentComplaints() {

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

    const roomNumber =
        resident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "204";

    const [formData, setFormData] = useState({
        category: "",
        subject: "",
        description: "",
        priority: "MEDIUM"
    });

    const [complaints, setComplaints] =
        useState(() => {

            return getAllComplaints()
                .filter(
                    (complaint) =>
                        complaint.residentId ===
                        residentId
                )
                .reverse();
        });

    const [selectedFilter, setSelectedFilter] =
        useState("ALL");

    const [searchText, setSearchText] =
        useState("");

    const [message, setMessage] =
        useState("");

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

    const saveComplaints = (
        updatedResidentComplaints
    ) => {

        const allComplaints =
            getAllComplaints();

        const otherResidentComplaints =
            allComplaints.filter(
                (complaint) =>
                    complaint.residentId !==
                    residentId
            );

        const updatedAllComplaints = [
            ...otherResidentComplaints,
            ...updatedResidentComplaints
        ];

        localStorage.setItem(
            "hostelComplaints",
            JSON.stringify(updatedAllComplaints)
        );

        setComplaints(
            [...updatedResidentComplaints]
                .reverse()
        );
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (
            !formData.category ||
            !formData.subject.trim() ||
            !formData.description.trim()
        ) {
            setMessageType("error");
            setMessage(
                "Please complete all the required complaint fields."
            );
            return;
        }

        if (formData.subject.trim().length < 5) {
            setMessageType("error");
            setMessage(
                "Complaint subject must contain at least 5 characters."
            );
            return;
        }

        if (
            formData.description.trim().length <
            15
        ) {
            setMessageType("error");
            setMessage(
                "Please provide a clear complaint description."
            );
            return;
        }

        setSubmitting(true);

        const newComplaint = {
            id:
                `CMP-${Date.now()
                    .toString()
                    .slice(-6)}`,
            residentId,
            residentName,
            roomNumber,
            category:
                formData.category,
            subject:
                formData.subject.trim(),
            description:
                formData.description.trim(),
            priority:
                formData.priority,
            status: "PENDING",
            submittedDate:
                new Intl.DateTimeFormat(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                ).format(new Date()),
            adminResponse: "",
            resolvedDate: ""
        };

        const currentResidentComplaints =
            [...complaints].reverse();

        const updatedComplaints = [
            ...currentResidentComplaints,
            newComplaint
        ];

        saveComplaints(updatedComplaints);

        setFormData({
            category: "",
            subject: "",
            description: "",
            priority: "MEDIUM"
        });

        setMessageType("success");
        setMessage(
            "Complaint submitted successfully."
        );

        setSubmitting(false);
    };

    const cancelComplaint = (complaintId) => {

        const confirmation =
            window.confirm(
                "Do you want to cancel this complaint?"
            );

        if (!confirmation) {
            return;
        }

        const currentOrderComplaints =
            [...complaints].reverse();

        const updatedComplaints =
            currentOrderComplaints.map(
                (complaint) => {

                    if (
                        complaint.id === complaintId
                    ) {
                        return {
                            ...complaint,
                            status: "CANCELLED"
                        };
                    }

                    return complaint;
                }
            );

        saveComplaints(updatedComplaints);

        setMessageType("success");
        setMessage(
            "Complaint cancelled successfully."
        );
    };

    const getCategoryLabel = (category) => {

        const categoryLabels = {
            CLEANLINESS: "Cleanliness",
            ELECTRICITY: "Electricity",
            WATER: "Water Supply",
            FOOD: "Food & Dining",
            INTERNET: "Internet & Wi-Fi",
            ROOM_MAINTENANCE: "Room Maintenance",
            SECURITY: "Security",
            OTHER: "Other"
        };

        return categoryLabels[category] ||
            category;
    };

    const pendingCount =
        complaints.filter(
            (complaint) =>
                complaint.status === "PENDING"
        ).length;

    const inProgressCount =
        complaints.filter(
            (complaint) =>
                complaint.status ===
                "IN_PROGRESS"
        ).length;

    const resolvedCount =
        complaints.filter(
            (complaint) =>
                complaint.status === "RESOLVED"
        ).length;

    const filteredComplaints =
        complaints.filter((complaint) => {

            const matchesFilter =
                selectedFilter === "ALL" ||
                complaint.status ===
                    selectedFilter;

            const searchValue =
                searchText.trim().toLowerCase();

            const matchesSearch =
                !searchValue ||
                complaint.subject
                    .toLowerCase()
                    .includes(searchValue) ||
                complaint.id
                    .toLowerCase()
                    .includes(searchValue) ||
                getCategoryLabel(
                    complaint.category
                )
                    .toLowerCase()
                    .includes(searchValue);

            return (
                matchesFilter &&
                matchesSearch
            );
        });

    return (
        <div className="resident-complaints-page">

            <section className="resident-complaints-banner">

                <div>

                    <span className="complaints-banner-label">
                        Resident Support
                    </span>

                    <h2>Complaints & Maintenance</h2>

                    <p>
                        Report hostel problems and track their
                        resolution status. Provide clear details
                        so the administrator can assist you quickly.
                    </p>

                </div>

                <div className="complaints-banner-room">

                    <span>Your Room</span>
                    <strong>{roomNumber}</strong>
                    <small>{residentName}</small>

                </div>

            </section>

            <section className="complaints-summary-grid">

                <article>

                    <span className="complaints-summary-icon total">
                        <ComplaintIcon name="all" />
                    </span>

                    <div>
                        <p>Total Complaints</p>
                        <h3>{complaints.length}</h3>
                    </div>

                </article>

                <article>

                    <span className="complaints-summary-icon pending">
                        <ComplaintIcon name="pending" />
                    </span>

                    <div>
                        <p>Pending</p>
                        <h3>{pendingCount}</h3>
                    </div>

                </article>

                <article>

                    <span className="complaints-summary-icon progress">
                        <ComplaintIcon name="progress" />
                    </span>

                    <div>
                        <p>In Progress</p>
                        <h3>{inProgressCount}</h3>
                    </div>

                </article>

                <article>

                    <span className="complaints-summary-icon resolved">
                        <ComplaintIcon name="resolved" />
                    </span>

                    <div>
                        <p>Resolved</p>
                        <h3>{resolvedCount}</h3>
                    </div>

                </article>

            </section>

            {message && (

                <p
                    className={`complaints-message ${
                        messageType === "success"
                            ? "complaints-success"
                            : "complaints-error"
                    }`}
                >
                    {message}
                </p>

            )}

            <section className="complaints-content-grid">

                <div className="complaint-form-card">

                    <div className="complaints-section-heading">

                        <div>
                            <h2>Raise a New Complaint</h2>

                            <p>
                                Enter the issue details for
                                administrator review.
                            </p>
                        </div>

                        <span>New Complaint</span>

                    </div>

                    <form
                        className="resident-complaint-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="complaint-form-grid">

                            <div className="complaint-input">

                                <label htmlFor="roomNumber">
                                    Room Number
                                </label>

                                <input
                                    type="text"
                                    id="roomNumber"
                                    value={`Room ${roomNumber}`}
                                    readOnly
                                />

                            </div>

                            <div className="complaint-input">

                                <label htmlFor="category">
                                    Complaint Category
                                    <span>*</span>
                                </label>

                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="CLEANLINESS">
                                        Cleanliness
                                    </option>

                                    <option value="ELECTRICITY">
                                        Electricity
                                    </option>

                                    <option value="WATER">
                                        Water Supply
                                    </option>

                                    <option value="FOOD">
                                        Food & Dining
                                    </option>

                                    <option value="INTERNET">
                                        Internet & Wi-Fi
                                    </option>

                                    <option value="ROOM_MAINTENANCE">
                                        Room Maintenance
                                    </option>

                                    <option value="SECURITY">
                                        Security
                                    </option>

                                    <option value="OTHER">
                                        Other
                                    </option>

                                </select>

                            </div>

                            <div className="complaint-input">

                                <label htmlFor="priority">
                                    Priority
                                </label>

                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="LOW">
                                        Low
                                    </option>

                                    <option value="MEDIUM">
                                        Medium
                                    </option>

                                    <option value="HIGH">
                                        High
                                    </option>

                                    <option value="URGENT">
                                        Urgent
                                    </option>

                                </select>

                            </div>

                            <div className="complaint-input complaint-full-width">

                                <label htmlFor="subject">
                                    Complaint Subject
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Example: Ceiling fan is not working"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    maxLength="100"
                                    required
                                />

                            </div>

                            <div className="complaint-input complaint-full-width">

                                <label htmlFor="description">
                                    Describe the Issue
                                    <span>*</span>
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Explain the issue clearly, including when it started and where it is occurring"
                                    value={
                                        formData.description
                                    }
                                    onChange={handleChange}
                                    rows="6"
                                    maxLength="600"
                                    required
                                ></textarea>

                                <p className="complaint-character-count">
                                    {
                                        formData
                                            .description.length
                                    }
                                    /600
                                </p>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="complaint-submit-button"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Complaint"}
                        </button>

                    </form>

                </div>

                <aside className="complaint-help-card">

                    <span className="complaint-help-icon">
                        <ComplaintIcon name="information" />
                    </span>

                    <h2>Before submitting</h2>

                    <ul>
                        <li>
                            Select the correct complaint category.
                        </li>

                        <li>
                            Provide a clear description of the issue.
                        </li>

                        <li>
                            Use Urgent priority only for serious issues.
                        </li>

                        <li>
                            Avoid submitting duplicate complaints.
                        </li>

                        <li>
                            Track the admin response from this page.
                        </li>
                    </ul>

                    <div className="complaint-emergency-note">

                        <strong>Emergency?</strong>

                        <p>
                            Contact the hostel administrator directly
                            for safety or medical emergencies.
                        </p>

                    </div>

                </aside>

            </section>

            <section className="complaints-history-card">

                <div className="complaints-section-heading">

                    <div>
                        <h2>Complaint History</h2>

                        <p>
                            Track submitted complaints and responses.
                        </p>
                    </div>

                    <span>
                        {complaints.length} Complaints
                    </span>

                </div>

                <div className="complaints-toolbar">

                    <div className="complaints-search">

                        <ComplaintIcon name="search" />

                        <input
                            type="search"
                            placeholder="Search complaint or ID"
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <div className="complaints-filter-tabs">

                        {[
                            {
                                name: "ALL",
                                label: "All",
                                count: complaints.length
                            },
                            {
                                name: "PENDING",
                                label: "Pending",
                                count: pendingCount
                            },
                            {
                                name: "IN_PROGRESS",
                                label: "In Progress",
                                count: inProgressCount
                            },
                            {
                                name: "RESOLVED",
                                label: "Resolved",
                                count: resolvedCount
                            }
                        ].map((filter) => (

                            <button
                                type="button"
                                key={filter.name}
                                className={
                                    selectedFilter ===
                                    filter.name
                                        ? "complaint-filter-active"
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

                {filteredComplaints.length === 0 ? (

                    <div className="complaints-empty-state">

                        <span>
                            <ComplaintIcon name="complaint" />
                        </span>

                        <h3>No complaints found</h3>

                        <p>
                            Your submitted complaints will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="resident-complaints-list">

                        {filteredComplaints.map(
                            (complaint) => (

                                <article
                                    className="resident-complaint-card"
                                    key={complaint.id}
                                >

                                    <div className="complaint-card-top">

                                        <div className="complaint-card-title">

                                            <span>
                                                <ComplaintIcon name="complaint" />
                                            </span>

                                            <div>
                                                <h3>
                                                    {complaint.subject}
                                                </h3>

                                                <p>
                                                    {complaint.id}
                                                    <i>•</i>
                                                    {
                                                        complaint.submittedDate
                                                    }
                                                </p>
                                            </div>

                                        </div>

                                        <span
                                            className={`complaint-status complaint-status-${complaint.status.toLowerCase()}`}
                                        >
                                            {complaint.status.replace(
                                                "_",
                                                " "
                                            )}
                                        </span>

                                    </div>

                                    <div className="complaint-card-details">

                                        <div>
                                            <span>Category</span>

                                            <strong>
                                                {getCategoryLabel(
                                                    complaint.category
                                                )}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Room</span>

                                            <strong>
                                                Room{" "}
                                                {complaint.roomNumber}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Priority</span>

                                            <strong
                                                className={`complaint-priority priority-${complaint.priority.toLowerCase()}`}
                                            >
                                                {complaint.priority}
                                            </strong>
                                        </div>

                                    </div>

                                    <p className="complaint-description">
                                        {complaint.description}
                                    </p>

                                    {complaint.adminResponse && (

                                        <div className="complaint-admin-response">

                                            <span>
                                                Admin Response
                                            </span>

                                            <p>
                                                {
                                                    complaint.adminResponse
                                                }
                                            </p>

                                        </div>

                                    )}

                                    {complaint.status === "PENDING" && (

                                        <button
                                            type="button"
                                            className="complaint-cancel-button"
                                            onClick={() =>
                                                cancelComplaint(
                                                    complaint.id
                                                )
                                            }
                                        >
                                            Cancel Complaint
                                        </button>

                                    )}

                                </article>

                            )
                        )}

                    </div>

                )}

            </section>

        </div>
    );
}

function ComplaintIcon({ name }) {

    const icons = {

        all: (
            <>
                <path d="M5 4H19V20H5V4Z" />
                <path d="M8 8H16M8 12H16M8 16H13" />
            </>
        ),

        pending: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7V12L15 14" />
            </>
        ),

        progress: (
            <>
                <path d="M20 7V3L18 5C16.4 3.7 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16 21 19.3 18.4 20.5 15" />
            </>
        ),

        resolved: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12L11 15L16 9" />
            </>
        ),

        information: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11V16M12 8H12.01" />
            </>
        ),

        search: (
            <>
                <circle cx="11" cy="11" r="6" />
                <path d="M16 16L21 21" />
            </>
        ),

        complaint: (
            <>
                <path d="M5 4H19V16H10L6 20V16H5V4Z" />
                <path d="M12 8V11M12 14H12.01" />
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

export default ResidentComplaints;