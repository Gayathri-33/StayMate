import { useEffect, useState } from "react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import residentService from "../../../services/residentService.js";
import roomAllocationService from "../../../services/roomAllocationService.js";

import "./RoomRequest.css";

const USE_MOCK_DATA =
  import.meta.env.VITE_USE_MOCK_DATA === "true";

const getStoredResident = () => {
  try {
    const storedResident =
      localStorage.getItem("resident");

    if (storedResident) {
      return JSON.parse(storedResident);
    }
  } catch (error) {
    console.error(
      "Unable to read resident:",
      error
    );
  }

  return {
    id: 1,
    fullName: "Demo Resident",
    email: "resident@staymate.com",
    allocationStatus: "NONE",
    roomAllocated: false,
  };
};

const normalizeRoom = (roomData) => {
  if (!roomData) {
    return null;
  }

  const room = roomData.data || roomData;

  const capacity = Number(
    room.capacity ??
      room.roomCapacity ??
      room.totalCapacity ??
      0
  );

  const occupiedBeds = Number(
    room.occupiedBeds ??
      room.currentOccupancy ??
      room.occupiedCount ??
      0
  );

  const availableBeds = Number(
    room.availableBeds ??
      room.availableCapacity ??
      Math.max(capacity - occupiedBeds, 0)
  );

  let roomType = String(
    room.roomType ?? room.type ?? "NON_AC"
  )
    .toUpperCase()
    .replaceAll("-", "_");

  if (roomType === "NONAC") {
    roomType = "NON_AC";
  }

  return {
    ...room,

    id:
      room.id ??
      room.roomId ??
      room.roomNumber,

    roomNumber:
      room.roomNumber ??
      room.number ??
      "Not available",

    roomType,
    capacity,
    availableBeds,
    occupiedBeds,
  };
};

const createMockRoom = (roomId) => {
  const numericRoomId =
    Number(roomId) || 1;

  const capacity =
    (numericRoomId % 4) + 1;

  const occupiedBeds =
    Math.max(capacity - 1, 0);

  return {
    id: roomId,
    roomNumber: String(200 + numericRoomId),
    roomType:
      numericRoomId % 2 === 0
        ? "AC"
        : "NON_AC",
    capacity,
    occupiedBeds,
    availableBeds:
      capacity - occupiedBeds,
  };
};

function RoomRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const selectedRoom =
    location.state?.selectedRoom;

  const [resident, setResident] =
    useState(null);

  const [room, setRoom] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    let pageActive = true;

    const loadPageData = async () => {
      setLoading(true);
      setError("");

      try {
        let residentData;
        let roomData;

        if (USE_MOCK_DATA) {
          residentData = getStoredResident();

          roomData =
            selectedRoom ||
            createMockRoom(roomId);
        } else {
          const [
            residentResponse,
            roomResponse,
          ] = await Promise.all([
            residentService.getCurrentResident(),

            selectedRoom
              ? Promise.resolve(selectedRoom)
              : roomAllocationService.getRoomById(
                  roomId
                ),
          ]);

          residentData =
            residentResponse?.data ||
            residentResponse;

          roomData =
            roomResponse?.data ||
            roomResponse;
        }

        if (!pageActive) {
          return;
        }

        const normalizedRoom =
          normalizeRoom(roomData);

        if (!normalizedRoom) {
          throw new Error(
            "Selected room information was not found."
          );
        }

        setResident(residentData);
        setRoom(normalizedRoom);
      } catch (loadError) {
        console.error(
          "Unable to load room request:",
          loadError
        );

        if (pageActive) {
          setError(
            loadError.message ||
              "Unable to load the selected room."
          );
        }
      } finally {
        if (pageActive) {
          setLoading(false);
        }
      }
    };

    loadPageData();

    return () => {
      pageActive = false;
    };
  }, [roomId, selectedRoom]);

  const residentName =
    resident?.fullName ||
    resident?.residentName ||
    resident?.name ||
    "Resident";

  const formatRoomType = (roomType) => {
    return roomType === "NON_AC"
      ? "Non-AC"
      : "AC";
  };

  const saveMockRequest = () => {
    const newRequest = {
      id: Date.now(),
      requestId: Date.now(),

      residentId: resident?.id || 1,
      residentName,

      residentEmail:
        resident?.email || "",

      roomId: room.id,
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      capacity: room.capacity,
      availableBeds:
        room.availableBeds,

      requestDate:
        new Date().toISOString(),

      status: "PENDING",
      rejectionReason: "",
    };

    try {
      const existingRequests =
        JSON.parse(
          localStorage.getItem(
            "roomAllocationRequests"
          )
        ) || [];

      localStorage.setItem(
        "roomAllocationRequests",
        JSON.stringify([
          newRequest,
          ...existingRequests,
        ])
      );

      const storedResident =
        getStoredResident();

      const updatedResident = {
        ...storedResident,
        allocationStatus: "PENDING",
        roomAllocated: false,
        roomAllocationRequestId:
          newRequest.id,
        requestedRoomId: room.id,
        requestedRoomNumber:
          room.roomNumber,
      };

      localStorage.setItem(
        "resident",
        JSON.stringify(updatedResident)
      );

      localStorage.setItem(
        "allocationStatus",
        "PENDING"
      );
    } catch (storageError) {
      console.error(
        "Unable to save mock request:",
        storageError
      );
    }

    return newRequest;
  };

  const handleMakeRequest = async () => {
    if (!room?.id) {
      setError(
        "The selected room does not have a valid ID."
      );

      return;
    }

    if (room.availableBeds <= 0) {
      setError(
        "This room no longer has an available bed. Please select another room."
      );

      return;
    }

    setSubmitting(true);
    setError("");

    try {
      let requestData;

      if (USE_MOCK_DATA) {
        requestData = saveMockRequest();
      } else {
        const response =
          await roomAllocationService.createRequest({
            roomId: room.id,
          });

        requestData =
          response?.data || response;
      }

      navigate(
        "/resident/allocation-status",
        {
          replace: true,

          state: {
            newRequest: requestData,
            selectedRoom: room,

            successMessage:
              "Your room request was submitted successfully.",
          },
        }
      );
    } catch (requestError) {
      console.error(
        "Unable to submit request:",
        requestError
      );

      setError(
        requestError.message ||
          "Unable to submit the room request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="room-confirm-page">
        <div className="room-confirm-loading">
          <div className="room-confirm-spinner" />

          <h2>Loading Room Information</h2>

          <p>
            Please wait while we prepare your
            request.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="room-confirm-page">
      <header className="room-confirm-topbar">
        <button
          type="button"
          className="room-confirm-brand"
          onClick={() => navigate("/")}
        >
          <span>S</span>
          StayMate
        </button>

        <button
          type="button"
          className="room-confirm-back"
          onClick={() =>
            navigate(
              "/resident/room-request"
            )
          }
        >
          ← Available Rooms
        </button>
      </header>

      <main className="room-confirm-container">
        <section className="room-confirm-heading">
          <p>Room Allocation</p>

          <h1>Confirm Your Room Request</h1>

          <span>
            Review the selected room before sending
            your request to the hostel administrator.
          </span>
        </section>

        <div className="room-confirm-steps">
          <div className="room-confirm-step completed">
            <span>1</span>

            <div>
              <strong>Select Room</strong>
              <small>Completed</small>
            </div>
          </div>

          <div className="room-confirm-line active" />

          <div className="room-confirm-step active">
            <span>2</span>

            <div>
              <strong>Make Request</strong>
              <small>Current step</small>
            </div>
          </div>

          <div className="room-confirm-line" />

          <div className="room-confirm-step">
            <span>3</span>

            <div>
              <strong>Admin Approval</strong>
              <small>Waiting</small>
            </div>
          </div>
        </div>

        {error && (
          <div
            className="room-confirm-error"
            role="alert"
          >
            <span>!</span>
            <p>{error}</p>
          </div>
        )}

        {room ? (
          <section className="room-confirm-card">
            <div className="room-confirm-card-header">
              <div className="room-confirm-icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 20V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11M2 20h20M8 13h8M12 13v7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>

              <div>
                <p>Selected Room</p>

                <h2>
                  Room {room.roomNumber}
                </h2>
              </div>

              <span
                className={`room-confirm-type ${
                  room.roomType === "AC"
                    ? "ac"
                    : "non-ac"
                }`}
              >
                {formatRoomType(
                  room.roomType
                )}
              </span>
            </div>

            <div className="room-confirm-details">
              <div>
                <span>Resident Name</span>

                <strong>{residentName}</strong>
              </div>

              <div>
                <span>
                  Selected Room Number
                </span>

                <strong>
                  {room.roomNumber}
                </strong>
              </div>

              <div>
                <span>Room Type</span>

                <strong>
                  {formatRoomType(
                    room.roomType
                  )}
                </strong>
              </div>

              <div>
                <span>Room Capacity</span>

                <strong>
                  {room.capacity}{" "}
                  {room.capacity === 1
                    ? "Person"
                    : "Persons"}
                </strong>
              </div>

              <div>
                <span>Available Beds</span>

                <strong className="room-confirm-available">
                  {room.availableBeds}
                </strong>
              </div>

              <div>
                <span>Occupied Beds</span>

                <strong>
                  {room.occupiedBeds}
                </strong>
              </div>
            </div>

            <div className="room-confirm-notice">
              <span>i</span>

              <p>
                This room will be allocated only after
                the hostel administrator approves your
                request.
              </p>
            </div>

            <div className="room-confirm-actions">
              <button
                type="button"
                className="room-confirm-change"
                onClick={() =>
                  navigate(
                    "/resident/room-request"
                  )
                }
                disabled={submitting}
              >
                Change Room
              </button>

              <button
                type="button"
                className="room-confirm-submit"
                onClick={handleMakeRequest}
                disabled={
                  submitting ||
                  room.availableBeds <= 0
                }
              >
                {submitting && (
                  <span className="room-confirm-button-spinner" />
                )}

                {submitting
                  ? "Submitting..."
                  : "Make Request"}
              </button>
            </div>
          </section>
        ) : (
          <section className="room-confirm-not-found">
            <h2>Room Not Found</h2>

            <p>
              Please return and select another room.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/resident/room-request"
                )
              }
            >
              View Available Rooms
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default RoomRequest;