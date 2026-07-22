import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import roomAllocationService from "../../../services/roomAllocationService.js";

import "./RoomAllocationRequests.css";

const normalizeRoomType = (roomType) => {
  if (!roomType) {
    return "Not available";
  }

  const normalizedType = String(roomType)
    .toUpperCase()
    .replaceAll("-", "_");

  if (
    normalizedType === "NON_AC" ||
    normalizedType === "NONAC"
  ) {
    return "Non-AC";
  }

  if (normalizedType === "AC") {
    return "AC";
  }

  return roomType;
};

const normalizeRequest = (requestData) => {
  const resident = requestData.resident || {};

  const room =
    requestData.room ||
    requestData.requestedRoom ||
    {};

  const capacity = Number(
    requestData.capacity ??
      requestData.roomCapacity ??
      room.capacity ??
      room.roomCapacity ??
      0
  );

  const availableBeds = Number(
    requestData.availableBeds ??
      room.availableBeds ??
      room.availableCapacity ??
      0
  );

  return {
    ...requestData,

    id:
      requestData.id ||
      requestData.requestId ||
      requestData.allocationRequestId,

    residentId:
      requestData.residentId ||
      resident.id ||
      resident.residentId,

    residentName:
      requestData.residentName ||
      requestData.fullName ||
      resident.fullName ||
      resident.residentName ||
      resident.name ||
      "Resident",

    residentEmail:
      requestData.residentEmail ||
      requestData.email ||
      resident.email ||
      "",

    roomId:
      requestData.roomId ||
      requestData.requestedRoomId ||
      room.id ||
      room.roomId,

    roomNumber:
      requestData.roomNumber ||
      requestData.requestedRoomNumber ||
      room.roomNumber ||
      room.number ||
      "Not available",

    roomType: normalizeRoomType(
      requestData.roomType ||
        requestData.requestedRoomType ||
        room.roomType ||
        room.type
    ),

    capacity,
    availableBeds,

    requestDate:
      requestData.requestDate ||
      requestData.createdAt ||
      requestData.submittedAt ||
      null,

    status: String(
      requestData.status ||
        requestData.requestStatus ||
        requestData.allocationStatus ||
        "PENDING"
    ).toUpperCase(),

    rejectionReason:
      requestData.rejectionReason ||
      requestData.rejectReason ||
      requestData.reason ||
      "",
  };
};

const getStoredAdmin = () => {
  try {
    const storedAdmin =
      localStorage.getItem("admin");

    return storedAdmin
      ? JSON.parse(storedAdmin)
      : null;
  } catch (error) {
    console.error(
      "Unable to read admin information:",
      error
    );

    return null;
  }
};

function RoomAllocationRequests() {
  const navigate = useNavigate();

  const admin = getStoredAdmin();

  const [requests, setRequests] = useState([]);

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [processingRequestId, setProcessingRequestId] =
    useState(null);

  const [rejectingRequest, setRejectingRequest] =
    useState(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const [error, setError] = useState("");

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const loadRequests = useCallback(
    async (silent = false) => {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const response =
          await roomAllocationService.getAdminRequests(
            statusFilter
          );

        let requestData = [];

        if (Array.isArray(response)) {
          requestData = response;
        } else if (
          Array.isArray(response?.requests)
        ) {
          requestData = response.requests;
        } else if (
          Array.isArray(response?.content)
        ) {
          requestData = response.content;
        } else if (
          Array.isArray(response?.data)
        ) {
          requestData = response.data;
        }

        const normalizedRequests = requestData
          .map(normalizeRequest)
          .sort(
            (firstRequest, secondRequest) =>
              new Date(
                secondRequest.requestDate || 0
              ) -
              new Date(
                firstRequest.requestDate || 0
              )
          );

        setRequests(normalizedRequests);
        setLastUpdated(new Date());
      } catch (requestError) {
        console.error(
          "Unable to load room requests:",
          requestError
        );

        setRequests([]);

        setError(
          requestError.message ||
            "Unable to load room-allocation requests."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [statusFilter]
  );

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const filteredRequests = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "ALL" ||
        request.status === statusFilter;

      const matchesSearch =
        !normalizedSearch ||
        request.residentName
          .toLowerCase()
          .includes(normalizedSearch) ||
        request.residentEmail
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(request.roomNumber)
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(request.id)
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [requests, searchTerm, statusFilter]);

  const requestCounts = useMemo(() => {
    return requests.reduce(
      (counts, request) => {
        counts.total += 1;

        if (request.status === "PENDING") {
          counts.pending += 1;
        }

        if (request.status === "APPROVED") {
          counts.approved += 1;
        }

        if (request.status === "REJECTED") {
          counts.rejected += 1;
        }

        return counts;
      },
      {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      }
    );
  }, [requests]);

  const handleApprove = async (request) => {
    if (request.availableBeds <= 0) {
      setMessage({
        type: "error",
        text: `Room ${request.roomNumber} no longer has an available bed.`,
      });

      return;
    }

    const shouldApprove = window.confirm(
      `Approve ${request.residentName}'s request for Room ${request.roomNumber}?`
    );

    if (!shouldApprove) {
      return;
    }

    setProcessingRequestId(request.id);

    setMessage({
      type: "",
      text: "",
    });

    try {
      await roomAllocationService.approveRequest(
        request.id
      );

      setMessage({
        type: "success",
        text: `${request.residentName} has been allocated Room ${request.roomNumber}.`,
      });

      await loadRequests(true);
    } catch (approvalError) {
      console.error(
        "Unable to approve request:",
        approvalError
      );

      setMessage({
        type: "error",
        text:
          approvalError.message ||
          "Unable to approve this request.",
      });
    } finally {
      setProcessingRequestId(null);
    }
  };

  const openRejectDialog = (request) => {
    setRejectingRequest(request);
    setRejectionReason("");

    setMessage({
      type: "",
      text: "",
    });
  };

  const closeRejectDialog = () => {
    if (processingRequestId) {
      return;
    }

    setRejectingRequest(null);
    setRejectionReason("");
  };

  const handleReject = async (event) => {
    event.preventDefault();

    if (!rejectionReason.trim()) {
      setMessage({
        type: "error",
        text: "Please enter a reason for rejection.",
      });

      return;
    }

    setProcessingRequestId(
      rejectingRequest.id
    );

    setMessage({
      type: "",
      text: "",
    });

    try {
      await roomAllocationService.rejectRequest(
        rejectingRequest.id,
        {
          reason: rejectionReason,
        }
      );

      setMessage({
        type: "success",
        text: `${rejectingRequest.residentName}'s room request has been rejected.`,
      });

      setRejectingRequest(null);
      setRejectionReason("");

      await loadRequests(true);
    } catch (rejectionError) {
      console.error(
        "Unable to reject request:",
        rejectionError
      );

      setMessage({
        type: "error",
        text:
          rejectionError.message ||
          "Unable to reject this request.",
      });
    } finally {
      setProcessingRequestId(null);
    }
  };

  const formatRequestDate = (dateValue) => {
    if (!dateValue) {
      return "Not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) {
      return "";
    }

    return lastUpdated.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="admin-allocation-page">
      <header className="admin-allocation-topbar">
        <button
          type="button"
          className="admin-allocation-brand"
          onClick={() => navigate("/")}
        >
          <span>S</span>
          StayMate
        </button>

        <div className="admin-allocation-topbar-actions">
          <div className="admin-allocation-admin-info">
            <span>
              {admin?.hostelName ||
                "Hostel Administration"}
            </span>

            <strong>
              {admin?.ownerName ||
                admin?.name ||
                "Administrator"}
            </strong>
          </div>

          <button
            type="button"
            className="admin-allocation-dashboard-button"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="admin-allocation-container">
        <section className="admin-allocation-heading">
          <div>
            <p>Room Management</p>

            <h1>Room Allocation Requests</h1>

            <span>
              Review resident room requests and approve
              or reject the selected rooms.
            </span>
          </div>

          <button
            type="button"
            className="admin-allocation-refresh-button"
            onClick={() => loadRequests(true)}
            disabled={refreshing}
          >
            <svg
              className={
                refreshing ? "rotating" : ""
              }
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M20 6v5h-5M4 18v-5h5M18.5 9A7 7 0 0 0 6.7 6.7L4 11M5.5 15A7 7 0 0 0 17.3 17.3L20 13"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </section>

        <section className="admin-allocation-summary-grid">
          <article className="admin-allocation-summary-card">
            <span>Total Requests</span>
            <strong>{requestCounts.total}</strong>
          </article>

          <article className="admin-allocation-summary-card pending">
            <span>Pending</span>
            <strong>{requestCounts.pending}</strong>
          </article>

          <article className="admin-allocation-summary-card approved">
            <span>Approved</span>
            <strong>{requestCounts.approved}</strong>
          </article>

          <article className="admin-allocation-summary-card rejected">
            <span>Rejected</span>
            <strong>{requestCounts.rejected}</strong>
          </article>
        </section>

        {message.text && (
          <div
            className={`admin-allocation-message admin-allocation-message-${message.type}`}
            role="alert"
          >
            <span>
              {message.type === "success"
                ? "✓"
                : "!"}
            </span>

            <p>{message.text}</p>
          </div>
        )}

        {error && (
          <div
            className="admin-allocation-error"
            role="alert"
          >
            <div>!</div>

            <section>
              <strong>
                Unable to load requests
              </strong>

              <p>{error}</p>
            </section>

            <button
              type="button"
              onClick={() => loadRequests()}
            >
              Try Again
            </button>
          </div>
        )}

        <section className="admin-allocation-table-card">
          <div className="admin-allocation-table-controls">
            <div className="admin-allocation-search">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="m16 16 4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </svg>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search resident or room..."
              />
            </div>

            <div className="admin-allocation-filter">
              <label htmlFor="requestStatus">
                Status
              </label>

              <select
                id="requestStatus"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >
                <option value="ALL">
                  All Requests
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="APPROVED">
                  Approved
                </option>

                <option value="REJECTED">
                  Rejected
                </option>
              </select>
            </div>
          </div>

          <div className="admin-allocation-table-title">
            <div>
              <h2>Resident Requests</h2>

              <p>
                The resident’s selected room will be
                allocated when you approve.
              </p>
            </div>

            <span>
              {filteredRequests.length}{" "}
              {filteredRequests.length === 1
                ? "request"
                : "requests"}
            </span>
          </div>

          {loading ? (
            <div className="admin-allocation-loading">
              <div className="admin-allocation-spinner" />

              <h3>Loading room requests</h3>

              <p>
                Please wait while we get the latest
                requests.
              </p>
            </div>
          ) : !error &&
            filteredRequests.length === 0 ? (
            <div className="admin-allocation-empty">
              <div>✓</div>

              <h3>No requests found</h3>

              <p>
                There are no room-allocation requests
                matching the selected filters.
              </p>
            </div>
          ) : !error ? (
            <div className="admin-allocation-table-wrapper">
              <table className="admin-allocation-table">
                <thead>
                  <tr>
                    <th>Resident Name</th>
                    <th>Requested Room</th>
                    <th>Room Type</th>
                    <th>Capacity</th>
                    <th>Available Beds</th>
                    <th>Request Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map(
                    (request) => {
                      const processing =
                        processingRequestId ===
                        request.id;

                      const roomUnavailable =
                        request.availableBeds <= 0;

                      return (
                        <tr key={request.id}>
                          <td>
                            <div className="admin-allocation-resident">
                              <span>
                                {request.residentName
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>

                              <div>
                                <strong>
                                  {
                                    request.residentName
                                  }
                                </strong>

                                {request.residentEmail && (
                                  <small>
                                    {
                                      request.residentEmail
                                    }
                                  </small>
                                )}
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="admin-allocation-room">
                              <strong>
                                Room{" "}
                                {request.roomNumber}
                              </strong>

                              <small>
                                ID:{" "}
                                {request.roomId ||
                                  "N/A"}
                              </small>
                            </div>
                          </td>

                          <td>
                            <span
                              className={`admin-allocation-room-type admin-allocation-room-type-${request.roomType
                                .toLowerCase()
                                .replaceAll(
                                  " ",
                                  "-"
                                )}`}
                            >
                              {request.roomType}
                            </span>
                          </td>

                          <td>
                            {request.capacity || "—"}
                          </td>

                          <td>
                            <span
                              className={`admin-allocation-beds ${
                                roomUnavailable
                                  ? "unavailable"
                                  : ""
                              }`}
                            >
                              {
                                request.availableBeds
                              }
                            </span>
                          </td>

                          <td>
                            <span className="admin-allocation-date">
                              {formatRequestDate(
                                request.requestDate
                              )}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`admin-allocation-status admin-allocation-status-${request.status.toLowerCase()}`}
                            >
                              {request.status}
                            </span>
                          </td>

                          <td>
                            {request.status ===
                            "PENDING" ? (
                              <div className="admin-allocation-row-actions">
                                <button
                                  type="button"
                                  className="admin-allocation-approve-button"
                                  onClick={() =>
                                    handleApprove(
                                      request
                                    )
                                  }
                                  disabled={
                                    processing ||
                                    roomUnavailable
                                  }
                                  title={
                                    roomUnavailable
                                      ? "No beds available"
                                      : "Approve request"
                                  }
                                >
                                  {processing
                                    ? "Processing..."
                                    : "Approve"}
                                </button>

                                <button
                                  type="button"
                                  className="admin-allocation-reject-button"
                                  onClick={() =>
                                    openRejectDialog(
                                      request
                                    )
                                  }
                                  disabled={
                                    processing
                                  }
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="admin-allocation-completed">
                                Reviewed
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : null}

          {lastUpdated && (
            <div className="admin-allocation-last-update">
              Last updated at {formatLastUpdated()}
            </div>
          )}
        </section>
      </main>

      {rejectingRequest && (
        <div
          className="admin-allocation-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeRejectDialog();
            }
          }}
        >
          <form
            className="admin-allocation-modal"
            onSubmit={handleReject}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rejectRequestTitle"
          >
            <div className="admin-allocation-modal-header">
              <div>
                <p>Reject Room Request</p>

                <h2 id="rejectRequestTitle">
                  Room{" "}
                  {rejectingRequest.roomNumber}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeRejectDialog}
                disabled={Boolean(
                  processingRequestId
                )}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="admin-allocation-modal-resident">
              <span>Resident</span>

              <strong>
                {rejectingRequest.residentName}
              </strong>
            </div>

            <div className="admin-allocation-reason-field">
              <label htmlFor="rejectionReason">
                Rejection Reason <span>*</span>
              </label>

              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(event) =>
                  setRejectionReason(
                    event.target.value
                  )
                }
                placeholder="Explain why this request cannot be approved..."
                rows="5"
                maxLength="300"
                autoFocus
              />

              <small>
                {rejectionReason.length}/300
              </small>
            </div>

            <div className="admin-allocation-modal-actions">
              <button
                type="button"
                className="admin-allocation-modal-cancel"
                onClick={closeRejectDialog}
                disabled={Boolean(
                  processingRequestId
                )}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-allocation-modal-reject"
                disabled={Boolean(
                  processingRequestId
                )}
              >
                {processingRequestId
                  ? "Rejecting..."
                  : "Reject Request"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RoomAllocationRequests;