import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import roomAllocationService from "../../../services/roomAllocationService.js";

import "./AllocationStatus.css";

const POLLING_INTERVAL = 10000;

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

const normalizeRequest = (
  response,
  fallbackRoom = null
) => {
  if (!response) {
    return null;
  }

  const request = response.data || response;

  const room =
    request.room ||
    request.requestedRoom ||
    fallbackRoom ||
    {};

  const status = String(
    request.status ||
      request.requestStatus ||
      request.allocationStatus ||
      "PENDING"
  ).toUpperCase();

  return {
    ...request,

    id:
      request.id ||
      request.requestId ||
      request.allocationRequestId ||
      null,

    roomId:
      request.roomId ||
      request.requestedRoomId ||
      room.id ||
      room.roomId ||
      null,

    roomNumber:
      request.roomNumber ||
      request.requestedRoomNumber ||
      room.roomNumber ||
      room.number ||
      "Not available",

    roomType: normalizeRoomType(
      request.roomType ||
        request.requestedRoomType ||
        room.roomType ||
        room.type
    ),

    capacity:
      request.capacity ||
      request.roomCapacity ||
      room.capacity ||
      room.roomCapacity ||
      null,

    requestDate:
      request.requestDate ||
      request.createdAt ||
      request.submittedAt ||
      new Date().toISOString(),

    rejectionReason:
      request.rejectionReason ||
      request.rejectReason ||
      request.reason ||
      request.adminReason ||
      "",

    adminNote:
      request.adminNote ||
      request.approvalNote ||
      "",

    status,
  };
};

const getStoredResident = () => {
  try {
    const storedResident =
      localStorage.getItem("resident");

    return storedResident
      ? JSON.parse(storedResident)
      : null;
  } catch (error) {
    console.error(
      "Unable to read resident information:",
      error
    );

    return null;
  }
};

function AllocationStatus() {
  const navigate = useNavigate();
  const location = useLocation();

  const fallbackRoomRef = useRef(
    location.state?.selectedRoom || null
  );

  const initialRequest =
    location.state?.newRequest
      ? normalizeRequest(
          location.state.newRequest,
          fallbackRoomRef.current
        )
      : null;

  const [request, setRequest] =
    useState(initialRequest);

  const [loading, setLoading] = useState(
    !initialRequest
  );

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] =
    useState(
      initialRequest ? new Date() : null
    );

  /*
   * Get the latest allocation status from Spring Boot.
   */
  const refreshRequest = useCallback(
    async (silent = false) => {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const response =
          await roomAllocationService.getLatestRequest();

        setRequest((previousRequest) =>
          normalizeRequest(
            response,
            previousRequest ||
              fallbackRoomRef.current
          )
        );

        setLastUpdated(new Date());
        setError("");
      } catch (requestError) {
        console.error(
          "Unable to refresh allocation status:",
          requestError
        );

        setError(
          requestError.message ||
            "Unable to check your room-allocation status."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  /*
   * Check the backend when the page opens.
   */
  useEffect(() => {
    refreshRequest(Boolean(initialRequest));
  }, [refreshRequest]);

  /*
   * Poll the backend every 10 seconds while the
   * request is pending.
   */
  useEffect(() => {
    if (request?.status !== "PENDING") {
      return undefined;
    }

    const pollingTimer = window.setInterval(
      () => {
        refreshRequest(true);
      },
      POLLING_INTERVAL
    );

    return () => {
      window.clearInterval(pollingTimer);
    };
  }, [request?.status, refreshRequest]);

  /*
   * Keep temporary frontend resident information
   * synchronized with the latest backend status.
   */
  useEffect(() => {
    if (!request?.status) {
      return;
    }

    const storedResident = getStoredResident();

    if (!storedResident) {
      return;
    }

    const updatedResident = {
      ...storedResident,
      allocationStatus: request.status,
      roomAllocationRequestId: request.id,
    };

    if (request.status === "APPROVED") {
      updatedResident.roomAllocated = true;
      updatedResident.roomId = request.roomId;
      updatedResident.roomNumber =
        request.roomNumber;
    } else {
      updatedResident.roomAllocated = false;
    }

    localStorage.setItem(
      "resident",
      JSON.stringify(updatedResident)
    );

    localStorage.setItem(
      "allocationStatus",
      request.status
    );
  }, [request]);

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
      return "Not checked yet";
    }

    return lastUpdated.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  };

  const getStatusContent = () => {
    switch (request?.status) {
      case "APPROVED":
        return {
          title: "Room Request Approved",
          description:
            "Your request has been approved. The selected room is now allocated to you.",
        };

      case "REJECTED":
        return {
          title: "Room Request Rejected",
          description:
            "Your room request was not approved. You can review the reason and request another room.",
        };

      default:
        return {
          title: "Request Under Review",
          description:
            "Your request has been sent to the hostel administrator and is waiting for approval.",
        };
    }
  };

  const statusContent = getStatusContent();

  const handleMainAction = () => {
    if (request?.status === "APPROVED") {
      navigate("/resident/dashboard", {
        replace: true,
      });

      return;
    }

    if (request?.status === "REJECTED") {
      navigate("/resident/room-request", {
        replace: true,
      });
    }
  };

  if (loading && !request) {
    return (
      <div className="allocation-status-page">
        <header className="allocation-status-topbar">
          <button
            type="button"
            className="allocation-status-brand"
            onClick={() => navigate("/")}
          >
            <span>S</span>
            StayMate
          </button>
        </header>

        <main className="allocation-status-container">
          <div className="allocation-status-loading">
            <div className="allocation-status-spinner" />

            <h2>Checking your request</h2>

            <p>
              Please wait while we get the latest
              allocation status.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="allocation-status-page">
        <header className="allocation-status-topbar">
          <button
            type="button"
            className="allocation-status-brand"
            onClick={() => navigate("/")}
          >
            <span>S</span>
            StayMate
          </button>
        </header>

        <main className="allocation-status-container">
          <section className="allocation-status-empty">
            <div className="allocation-status-empty-icon">
              ?
            </div>

            <h1>No Room Request Found</h1>

            <p>
              You have not submitted a room-allocation
              request yet.
            </p>

            {error && (
              <div className="allocation-status-inline-error">
                {error}
              </div>
            )}

            <div className="allocation-status-empty-actions">
              <button
                type="button"
                className="allocation-status-secondary-button"
                onClick={() =>
                  refreshRequest(false)
                }
              >
                Try Again
              </button>

              <button
                type="button"
                className="allocation-status-primary-button"
                onClick={() =>
                  navigate(
                    "/resident/room-request"
                  )
                }
              >
                View Available Rooms
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`allocation-status-page allocation-status-${request.status.toLowerCase()}`}
    >
      <header className="allocation-status-topbar">
        <button
          type="button"
          className="allocation-status-brand"
          onClick={() => navigate("/")}
        >
          <span>S</span>
          StayMate
        </button>

        <span className="allocation-status-secure">
          Room Allocation
        </span>
      </header>

      <main className="allocation-status-container">
        <section className="allocation-status-heading">
          <p>Allocation Status</p>

          <h1>Track Your Room Request</h1>

          <span>
            The status will update automatically after
            the hostel administrator reviews your
            request.
          </span>
        </section>

        {location.state?.successMessage && (
          <div className="allocation-status-success">
            <span>✓</span>

            <p>
              {location.state.successMessage}
            </p>
          </div>
        )}

        {error && (
          <div
            className="allocation-status-error"
            role="alert"
          >
            <span>!</span>

            <div>
              <strong>
                Status refresh failed
              </strong>

              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={() =>
                refreshRequest(true)
              }
            >
              Retry
            </button>
          </div>
        )}

        <section className="allocation-status-card">
          <div className="allocation-status-result">
            <div className="allocation-status-icon">
              {request.status === "APPROVED" && (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12.5l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.3"
                  />
                </svg>
              )}

              {request.status === "REJECTED" && (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M7 7l10 10M17 7L7 17"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.3"
                  />
                </svg>
              )}

              {request.status === "PENDING" && (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 7v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.9"
                  />
                </svg>
              )}
            </div>

            <span className="allocation-status-badge">
              {request.status}
            </span>

            <h2>{statusContent.title}</h2>

            <p>{statusContent.description}</p>
          </div>

          <div className="allocation-status-details">
            <div className="allocation-status-detail">
              <span>Requested Room Number</span>

              <strong>
                Room {request.roomNumber}
              </strong>
            </div>

            <div className="allocation-status-detail">
              <span>Room Type</span>

              <strong>
                {request.roomType}
              </strong>
            </div>

            {request.capacity && (
              <div className="allocation-status-detail">
                <span>Room Capacity</span>

                <strong>
                  {request.capacity}{" "}
                  {Number(request.capacity) === 1
                    ? "Person"
                    : "Persons"}
                </strong>
              </div>
            )}

            <div className="allocation-status-detail">
              <span>Request Date</span>

              <strong>
                {formatRequestDate(
                  request.requestDate
                )}
              </strong>
            </div>

            <div className="allocation-status-detail">
              <span>Request Status</span>

              <strong
                className={`allocation-status-text-${request.status.toLowerCase()}`}
              >
                {request.status}
              </strong>
            </div>

            {request.id && (
              <div className="allocation-status-detail">
                <span>Request ID</span>

                <strong>#{request.id}</strong>
              </div>
            )}
          </div>

          {request.status === "REJECTED" && (
            <div className="allocation-status-rejection">
              <div>!</div>

              <section>
                <span>Admin Rejection Reason</span>

                <p>
                  {request.rejectionReason ||
                    "No rejection reason was provided by the administrator."}
                </p>
              </section>
            </div>
          )}

          {request.status === "APPROVED" &&
            request.adminNote && (
              <div className="allocation-status-admin-note">
                <div>✓</div>

                <section>
                  <span>Administrator Note</span>

                  <p>{request.adminNote}</p>
                </section>
              </div>
            )}

          {request.status === "PENDING" && (
            <div className="allocation-status-waiting">
              <div className="allocation-status-waiting-dot" />

              <div>
                <strong>
                  Waiting for administrator approval
                </strong>

                <p>
                  This page checks for updates every 10
                  seconds.
                </p>
              </div>
            </div>
          )}

          <div className="allocation-status-actions">
            <div className="allocation-status-update-time">
              <span
                className={
                  refreshing ? "checking" : ""
                }
              />

              <p>
                {refreshing
                  ? "Checking for updates..."
                  : `Last checked at ${formatLastUpdated()}`}
              </p>
            </div>

            {request.status === "PENDING" ? (
              <button
                type="button"
                className="allocation-status-primary-button"
                onClick={() =>
                  refreshRequest(true)
                }
                disabled={refreshing}
              >
                {refreshing
                  ? "Refreshing..."
                  : "Refresh Status"}
              </button>
            ) : (
              <button
                type="button"
                className="allocation-status-primary-button"
                onClick={handleMainAction}
              >
                {request.status === "APPROVED"
                  ? "Go to Dashboard"
                  : "Request Another Room"}
              </button>
            )}
          </div>
        </section>

        <div className="allocation-status-help">
          <div>i</div>

          <p>
            If the request remains pending for a long
            time, contact your hostel administrator for
            assistance.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AllocationStatus;