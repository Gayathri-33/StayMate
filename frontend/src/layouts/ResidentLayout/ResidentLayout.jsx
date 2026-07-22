import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ResidentSidebar from "../../components/ResidentSidebar/ResidentSidebar.jsx";
import residentService from "../../services/residentService.js";

import "./ResidentLayout.css";

const pageTitles = {
  "/resident/dashboard": "Dashboard",
  "/resident/menu": "Daily Menu",
  "/resident/fees": "Fee Management",
  "/resident/room-details": "Room Details",
  "/resident/room-shift": "Room Shift Request",
  "/resident/complaints": "Complaints",
  "/resident/feedback": "Hostel Feedback",
  "/resident/profile": "My Profile",
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

function ResidentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [allocationStatus, setAllocationStatus] =
    useState(null);

  const [checkingAllocation, setCheckingAllocation] =
    useState(true);

  const [allocationError, setAllocationError] =
    useState("");

  const resident = getStoredResident();

  const residentName =
    resident?.fullName ||
    resident?.residentName ||
    resident?.name ||
    "Resident";

  const residentInitial = residentName
    .charAt(0)
    .toUpperCase();

  const currentPageTitle =
    pageTitles[location.pathname] ||
    "Resident Portal";

  /*
   * Check whether the logged-in resident has an
   * allocated room.
   */
  const checkAllocationStatus =
    useCallback(async () => {
      setCheckingAllocation(true);
      setAllocationError("");

      try {
        const statusData =
          await residentService.getAllocationStatus();

        const status = String(
          statusData?.allocationStatus ||
            statusData?.status ||
            (statusData?.roomAllocated
              ? "APPROVED"
              : "NONE")
        ).toUpperCase();

        setAllocationStatus(status);

        /*
         * Keep temporary local resident information
         * synchronized with the backend.
         */
        const storedResident = getStoredResident();

        if (storedResident) {
          const updatedResident = {
            ...storedResident,
            allocationStatus: status,
            roomAllocated:
              status === "APPROVED",
          };

          if (status === "APPROVED") {
            updatedResident.roomId =
              statusData.roomId ||
              storedResident.roomId ||
              null;

            updatedResident.roomNumber =
              statusData.roomNumber ||
              storedResident.roomNumber ||
              null;
          }

          localStorage.setItem(
            "resident",
            JSON.stringify(updatedResident)
          );

          localStorage.setItem(
            "allocationStatus",
            status
          );
        }
      } catch (error) {
        console.error(
          "Unable to check allocation status:",
          error
        );

        /*
         * If the login token is invalid or expired,
         * send the resident back to login.
         */
        if (
          error.status === 401 ||
          error.status === 403
        ) {
          localStorage.removeItem(
            "staymateToken"
          );
          localStorage.removeItem("authToken");
          localStorage.removeItem("token");
          localStorage.removeItem("resident");

          navigate("/login", {
            replace: true,
          });

          return;
        }

        setAllocationError(
          error.message ||
            "Unable to check your room-allocation status."
        );
      } finally {
        setCheckingAllocation(false);
      }
    }, [navigate]);

  /*
   * Check allocation when the resident layout opens.
   */
  useEffect(() => {
    checkAllocationStatus();
  }, [checkAllocationStatus]);

  /*
   * Close the mobile sidebar when the route changes.
   */
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("staymateToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("resident");
    localStorage.removeItem("allocationStatus");

    navigate("/login", {
      replace: true,
    });
  };

  const formatCurrentDate = () => {
    return new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /*
   * Display a loading page while Spring Boot checks
   * the resident's room allocation.
   */
  if (checkingAllocation) {
    return (
      <div className="resident-allocation-guard">
        <div className="resident-allocation-guard-card">
          <div className="resident-allocation-guard-logo">
            S
          </div>

          <div className="resident-allocation-guard-spinner" />

          <h2>Checking Room Allocation</h2>

          <p>
            Please wait while StayMate verifies your
            room-allocation status.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Do not display dashboard pages when the allocation
   * check could not be completed.
   */
  if (allocationError) {
    return (
      <div className="resident-allocation-guard">
        <div className="resident-allocation-guard-card resident-allocation-guard-error">
          <div className="resident-allocation-guard-error-icon">
            !
          </div>

          <h2>Unable to Verify Room Allocation</h2>

          <p>{allocationError}</p>

          <div className="resident-allocation-guard-actions">
            <button
              type="button"
              className="resident-guard-secondary-button"
              onClick={handleLogout}
            >
              Back to Login
            </button>

            <button
              type="button"
              className="resident-guard-primary-button"
              onClick={checkAllocationStatus}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Residents with pending or rejected requests should
   * only see the Allocation Status page.
   */
  if (
    allocationStatus === "PENDING" ||
    allocationStatus === "REJECTED"
  ) {
    return (
      <Navigate
        to="/resident/allocation-status"
        replace
      />
    );
  }

  /*
   * A resident with no allocation request should select
   * an available room first.
   *
   * CANCELLED is also treated like NONE so the resident
   * can submit a new request.
   */
  if (
    allocationStatus === "NONE" ||
    allocationStatus === "CANCELLED" ||
    allocationStatus !== "APPROVED"
  ) {
    return (
      <Navigate
        to="/resident/room-request"
        replace
      />
    );
  }

  /*
   * Only APPROVED residents reach this point.
   */
  return (
    <div className="resident-layout">
      <ResidentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="resident-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <div className="resident-layout-content">
        <header className="resident-topbar">
          <div className="resident-topbar-left">
            <button
              type="button"
              className="resident-menu-button"
              onClick={() =>
                setSidebarOpen((previous) => !previous)
              }
              aria-label="Open sidebar"
            >
              <span />
              <span />
              <span />
            </button>

            <div className="resident-page-title">
              <p>Resident Portal</p>

              <h1>{currentPageTitle}</h1>
            </div>
          </div>

          <div className="resident-topbar-actions">
            <div className="resident-topbar-date">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>

              <span>{formatCurrentDate()}</span>
            </div>

            <button
              type="button"
              className="resident-notification-button"
              aria-label="Notifications"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>

              <span />
            </button>

            <button
              type="button"
              className="resident-topbar-profile"
              onClick={() =>
                navigate("/resident/profile")
              }
            >
              <span>{residentInitial}</span>

              <div>
                <strong>{residentName}</strong>

                <small>
                  Room{" "}
                  {resident?.roomNumber ||
                    "Allocated"}
                </small>
              </div>
            </button>
          </div>
        </header>

        <main className="resident-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ResidentLayout;