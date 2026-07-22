import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import roomAllocationService from "../../../services/roomAllocationService.js";

import "./RoomAllocationRequest.css";

function RoomAllocationRequest() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  const [roomType, setRoomType] = useState("ALL");
  const [capacity, setCapacity] = useState("ALL");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
   * Converts different backend room response formats
   * into one common frontend format.
   */
  const normalizeRoom = (room) => {
    const roomCapacity = Number(
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
        room.availableCount ??
        Math.max(roomCapacity - occupiedBeds, 0)
    );

    const normalizedRoomType = String(
      room.roomType ?? room.type ?? "NON_AC"
    )
      .toUpperCase()
      .replaceAll("-", "_");

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

      roomType:
        normalizedRoomType === "NONAC"
          ? "NON_AC"
          : normalizedRoomType,

      capacity: roomCapacity,
      availableBeds,
      occupiedBeds,
    };
  };

  /*
   * Load rooms from the Spring Boot backend.
   */
  const loadAvailableRooms = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response =
        await roomAllocationService.getAvailableRooms({
          roomType,
          capacity,
        });

      /*
       * Supports these backend response formats:
       *
       * [room1, room2]
       *
       * { rooms: [...] }
       *
       * { content: [...] }
       *
       * { data: [...] }
       */
      let roomData = [];

      if (Array.isArray(response)) {
        roomData = response;
      } else if (Array.isArray(response?.rooms)) {
        roomData = response.rooms;
      } else if (Array.isArray(response?.content)) {
        roomData = response.content;
      } else if (Array.isArray(response?.data)) {
        roomData = response.data;
      }

      const normalizedRooms = roomData
        .map(normalizeRoom)
        .filter((room) => room.availableBeds > 0);

      setRooms(normalizedRooms);
    } catch (requestError) {
      console.error(
        "Unable to load available rooms:",
        requestError
      );

      setRooms([]);

      setError(
        requestError.message ||
          "Unable to load available rooms. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [roomType, capacity]);

  /*
   * Reload the table whenever a filter changes.
   */
  useEffect(() => {
    loadAvailableRooms();
  }, [loadAvailableRooms]);

  /*
   * Client-side filtering is also included.
   * This keeps the filters working even if the backend
   * returns all available rooms without filtering them.
   */
  const filteredRooms = useMemo(() => {
    return rooms
      .filter((room) => {
        const matchesRoomType =
          roomType === "ALL" ||
          room.roomType === roomType;

        const matchesCapacity =
          capacity === "ALL" ||
          Number(room.capacity) === Number(capacity);

        return (
          matchesRoomType &&
          matchesCapacity &&
          room.availableBeds > 0
        );
      })
      .sort((firstRoom, secondRoom) =>
        String(firstRoom.roomNumber).localeCompare(
          String(secondRoom.roomNumber),
          undefined,
          {
            numeric: true,
          }
        )
      );
  }, [rooms, roomType, capacity]);

  const handleRoomSelection = (room) => {
    if (!room.id) {
      setError(
        "This room does not have a valid room ID."
      );

      return;
    }

    navigate(
      `/resident/request-room/${encodeURIComponent(
        room.id
      )}`,
      {
        state: {
          selectedRoom: room,
        },
      }
    );
  };

  const handleRowKeyDown = (event, room) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleRoomSelection(room);
    }
  };

  const clearFilters = () => {
    setRoomType("ALL");
    setCapacity("ALL");
  };

  const formatRoomType = (type) => {
    if (type === "NON_AC") {
      return "Non-AC";
    }

    return "AC";
  };

  return (
    <div className="available-rooms-page">
      <header className="available-rooms-header">
        <div>
          <p className="available-rooms-eyebrow">
            Room Allocation
          </p>

          <h1>Select an Available Room</h1>

          <p className="available-rooms-description">
            Browse the available rooms and select the room
            you would like to request. Your request will be
            sent to the hostel administrator for approval.
          </p>
        </div>

        <div className="available-rooms-summary">
          <span>Rooms available</span>

          <strong>
            {loading ? "—" : filteredRooms.length}
          </strong>
        </div>
      </header>

      <section
        className="available-rooms-filters"
        aria-label="Room filters"
      >
        <div className="available-rooms-filter-heading">
          <div>
            <h2>Find a Room</h2>

            <p>
              Use the filters to find a suitable room.
            </p>
          </div>

          {(roomType !== "ALL" ||
            capacity !== "ALL") && (
            <button
              type="button"
              className="available-rooms-clear-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="available-rooms-filter-controls">
          <div className="available-rooms-filter-field">
            <label htmlFor="roomType">
              Room Type
            </label>

            <select
              id="roomType"
              value={roomType}
              onChange={(event) =>
                setRoomType(event.target.value)
              }
            >
              <option value="ALL">
                All Room Types
              </option>

              <option value="AC">AC</option>

              <option value="NON_AC">
                Non-AC
              </option>
            </select>
          </div>

          <div className="available-rooms-filter-field">
            <label htmlFor="roomCapacity">
              Room Capacity
            </label>

            <select
              id="roomCapacity"
              value={capacity}
              onChange={(event) =>
                setCapacity(event.target.value)
              }
            >
              <option value="ALL">
                All Capacities
              </option>

              <option value="1">1 Person</option>

              <option value="2">2 Persons</option>

              <option value="3">3 Persons</option>

              <option value="4">4 Persons</option>
            </select>
          </div>
        </div>
      </section>

      {error && (
        <div
          className="available-rooms-error"
          role="alert"
        >
          <div className="available-rooms-error-icon">
            !
          </div>

          <div>
            <strong>
              Unable to display available rooms
            </strong>

            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={loadAvailableRooms}
          >
            Try Again
          </button>
        </div>
      )}

      <section className="available-rooms-table-card">
        <div className="available-rooms-table-heading">
          <div>
            <h2>Available Rooms</h2>

            <p>
              Select any row to continue with the room
              request.
            </p>
          </div>

          {!loading && !error && (
            <span className="available-rooms-result-count">
              {filteredRooms.length}{" "}
              {filteredRooms.length === 1
                ? "room"
                : "rooms"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="available-rooms-loading">
            <div className="available-rooms-spinner" />

            <h3>Loading available rooms</h3>

            <p>
              Please wait while we find available rooms
              for you.
            </p>
          </div>
        ) : !error &&
          filteredRooms.length === 0 ? (
          <div className="available-rooms-empty">
            <div className="available-rooms-empty-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M2 19h20M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 13h8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </div>

            <h3>No available rooms found</h3>

            <p>
              There are no rooms matching the selected
              filters. Try selecting different filters.
            </p>

            {(roomType !== "ALL" ||
              capacity !== "ALL") && (
                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
          </div>
        ) : !error ? (
          <div className="available-rooms-table-wrapper">
            <table className="available-rooms-table">
              <thead>
                <tr>
                  <th>Room Number</th>
                  <th>Room Type</th>
                  <th>Room Capacity</th>
                  <th>Available Beds</th>
                  <th>Occupied Beds</th>
                </tr>
              </thead>

              <tbody>
                {filteredRooms.map((room) => (
                  <tr
                    key={room.id}
                    className="available-rooms-row"
                    onClick={() =>
                      handleRoomSelection(room)
                    }
                    onKeyDown={(event) =>
                      handleRowKeyDown(event, room)
                    }
                    tabIndex="0"
                    role="button"
                    aria-label={`Select room ${room.roomNumber}`}
                  >
                    <td>
                      <div className="available-room-number">
                        <span>
                          {room.roomNumber}
                        </span>

                        <small>
                          Select room
                        </small>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`available-room-type available-room-type-${room.roomType
                          .toLowerCase()
                          .replaceAll("_", "-")}`}
                      >
                        {formatRoomType(
                          room.roomType
                        )}
                      </span>
                    </td>

                    <td>
                      <span className="available-room-capacity">
                        {room.capacity}
                        {room.capacity === 1
                          ? " Person"
                          : " Persons"}
                      </span>
                    </td>

                    <td>
                      <span className="available-room-beds">
                        <strong>
                          {room.availableBeds}
                        </strong>

                        <small>Available</small>
                      </span>
                    </td>

                    <td>
                      <div className="occupied-bed-cell">
                        <span>
                          {room.occupiedBeds}
                        </span>

                        <div
                          className="occupied-bed-progress"
                          aria-label={`${room.occupiedBeds} out of ${room.capacity} beds occupied`}
                        >
                          <span
                            style={{
                              width: `${
                                room.capacity > 0
                                  ? Math.min(
                                      (room.occupiedBeds /
                                        room.capacity) *
                                        100,
                                      100
                                    )
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <div className="available-rooms-note">
        <div className="available-rooms-note-icon">
          i
        </div>

        <p>
          Selecting a room does not immediately allocate
          it. Your request must first be approved by the
          hostel administrator.
        </p>
      </div>
    </div>
  );
}

export default RoomAllocationRequest;