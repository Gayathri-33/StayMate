import { useNavigate } from "react-router-dom";
import "./ResidentRoomDetails.css";

function getSavedData(key) {

    try {

        return (
            JSON.parse(
                localStorage.getItem(key)
            ) || {}
        );

    } catch {
        return {};
    }
}

function ResidentRoomDetails() {

    const navigate = useNavigate();

    const resident =
        getSavedData("resident");

    const hostel =
        getSavedData("staymateHostel");

    /*
        These fallback values are only for UI testing.
        Later, replace them with Spring Boot API data.
    */

    const residentName =
        resident.fullName ||
        resident.name ||
        localStorage.getItem("residentName") ||
        "Resident";

    const roomNumber =
        resident.roomNumber ||
        localStorage.getItem("roomNumber") ||
        "204";

    const hostelName =
        resident.hostelName ||
        hostel.hostelName ||
        localStorage.getItem("hostelName") ||
        "Sri Sai Boys Hostel";

    const roomDetails = {
        roomNumber,
        roomType:
            resident.roomType ||
            resident.preferredRoomType ||
            "Two Sharing",
        floor:
            resident.floor || "Second Floor",
        capacity:
            resident.roomCapacity || 2,
        occupiedBeds:
            resident.occupiedBeds || 2,
        monthlyFee:
            resident.monthlyFee || 6500,
        allocationDate:
            resident.allocationDate ||
            "21 July 2026",
        block:
            resident.block || "Block A",
        bathroomType:
            resident.bathroomType ||
            "Attached Bathroom"
    };

    const roommates =
        Array.isArray(resident.roommates) &&
        resident.roommates.length > 0
            ? resident.roommates
            : [
                {
                    id: "RES-203",
                    name: "Kiran Sai",
                    course: "B.Tech CSE",
                    phoneNumber: "9876543210",
                    bedNumber: "Bed 2"
                }
            ];

    const amenities = [
        {
            name: "Individual Bed",
            icon: "bed"
        },
        {
            name: "Study Table",
            icon: "table"
        },
        {
            name: "Storage Cupboard",
            icon: "storage"
        },
        {
            name: "Ceiling Fan",
            icon: "fan"
        },
        {
            name: "Wi-Fi Access",
            icon: "wifi"
        },
        {
            name: roomDetails.bathroomType,
            icon: "bathroom"
        }
    ];

    const roomRules = [
        "Keep the room and common areas clean.",
        "Do not damage hostel furniture or equipment.",
        "Avoid loud music and disturbance after 10:00 PM.",
        "Visitors are not allowed inside Resident rooms.",
        "Switch off lights and fans when leaving the room."
    ];

    const occupancyPercentage =
        Math.min(
            (
                roomDetails.occupiedBeds /
                roomDetails.capacity
            ) * 100,
            100
        );

    return (
        <div className="resident-room-page">

            <section className="resident-room-banner">

                <div className="resident-room-banner-content">

                    <span className="resident-room-banner-label">
                        Your allocated room
                    </span>

                    <h2>
                        Room {roomDetails.roomNumber}
                    </h2>

                    <p>
                        {hostelName} • {roomDetails.block} •{" "}
                        {roomDetails.floor}
                    </p>

                    <div className="resident-room-banner-tags">

                        <span>
                            {roomDetails.roomType}
                        </span>

                        <span>
                            Allocated on{" "}
                            {roomDetails.allocationDate}
                        </span>

                    </div>

                </div>

                <div className="resident-room-number-card">

                    <span>Room</span>
                    <strong>{roomDetails.roomNumber}</strong>
                    <small>{roomDetails.block}</small>

                </div>

            </section>

            <section className="resident-room-summary-grid">

                <article className="resident-room-summary-card">

                    <span className="resident-room-summary-icon">
                        <RoomIcon name="type" />
                    </span>

                    <div>
                        <p>Room Type</p>
                        <h3>{roomDetails.roomType}</h3>
                    </div>

                </article>

                <article className="resident-room-summary-card">

                    <span className="resident-room-summary-icon">
                        <RoomIcon name="capacity" />
                    </span>

                    <div>
                        <p>Room Capacity</p>
                        <h3>
                            {roomDetails.capacity} Residents
                        </h3>
                    </div>

                </article>

                <article className="resident-room-summary-card">

                    <span className="resident-room-summary-icon">
                        <RoomIcon name="floor" />
                    </span>

                    <div>
                        <p>Floor & Block</p>
                        <h3>
                            {roomDetails.floor},{" "}
                            {roomDetails.block}
                        </h3>
                    </div>

                </article>

                <article className="resident-room-summary-card">

                    <span className="resident-room-summary-icon">
                        <RoomIcon name="fees" />
                    </span>

                    <div>
                        <p>Monthly Fee</p>
                        <h3>
                            ₹
                            {Number(
                                roomDetails.monthlyFee
                            ).toLocaleString("en-IN")}
                        </h3>
                    </div>

                </article>

            </section>

            <section className="resident-room-content-grid">

                <div className="resident-room-left-column">

                    <article className="resident-room-section-card">

                        <div className="resident-room-section-heading">

                            <div>
                                <h2>Room Occupancy</h2>

                                <p>
                                    Current bed allocation in your room
                                </p>
                            </div>

                            <span className="resident-room-occupied-label">
                                {roomDetails.occupiedBeds}/
                                {roomDetails.capacity} Occupied
                            </span>

                        </div>

                        <div className="resident-room-occupancy">

                            <div className="resident-room-occupancy-top">

                                <span>Bed occupancy</span>

                                <strong>
                                    {Math.round(
                                        occupancyPercentage
                                    )}
                                    %
                                </strong>

                            </div>

                            <div className="resident-room-progress-track">

                                <div
                                    className="resident-room-progress-value"
                                    style={{
                                        width: `${occupancyPercentage}%`
                                    }}
                                ></div>

                            </div>

                            <div className="resident-room-bed-list">

                                {Array.from({
                                    length:
                                        roomDetails.capacity
                                }).map((_, index) => {

                                    const bedNumber =
                                        index + 1;

                                    const isOccupied =
                                        bedNumber <=
                                        roomDetails.occupiedBeds;

                                    return (
                                        <div
                                            className={`resident-room-bed ${
                                                isOccupied
                                                    ? "resident-bed-occupied"
                                                    : "resident-bed-available"
                                            }`}
                                            key={bedNumber}
                                        >

                                            <span>
                                                <RoomIcon name="bed" />
                                            </span>

                                            <div>
                                                <strong>
                                                    Bed {bedNumber}
                                                </strong>

                                                <small>
                                                    {bedNumber === 1
                                                        ? residentName
                                                        : isOccupied
                                                        ? roommates[
                                                              bedNumber -
                                                                  2
                                                          ]?.name ||
                                                          "Occupied"
                                                        : "Available"}
                                                </small>
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </article>

                    <article className="resident-room-section-card">

                        <div className="resident-room-section-heading">

                            <div>
                                <h2>Roommates</h2>

                                <p>
                                    Residents currently sharing your room
                                </p>
                            </div>

                            <span className="resident-roommate-count">
                                {roommates.length}
                            </span>

                        </div>

                        {roommates.length === 0 ? (

                            <div className="resident-no-roommates">
                                No roommates have been assigned yet.
                            </div>

                        ) : (

                            <div className="resident-roommates-list">

                                {roommates.map((roommate) => (

                                    <div
                                        className="resident-roommate-card"
                                        key={roommate.id}
                                    >

                                        <span className="resident-roommate-avatar">
                                            {roommate.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>

                                        <div className="resident-roommate-info">

                                            <h3>{roommate.name}</h3>

                                            <p>
                                                {roommate.id} •{" "}
                                                {roommate.course}
                                            </p>

                                        </div>

                                        <div className="resident-roommate-contact">

                                            <span>
                                                {roommate.bedNumber}
                                            </span>

                                            <a
                                                href={`tel:${roommate.phoneNumber}`}
                                            >
                                                {roommate.phoneNumber}
                                            </a>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </article>

                </div>

                <div className="resident-room-right-column">

                    <article className="resident-room-section-card">

                        <div className="resident-room-section-heading">

                            <div>
                                <h2>Room Amenities</h2>

                                <p>
                                    Facilities available in your room
                                </p>
                            </div>

                        </div>

                        <div className="resident-room-amenities-grid">

                            {amenities.map((amenity) => (

                                <div
                                    className="resident-room-amenity"
                                    key={amenity.name}
                                >

                                    <span>
                                        <RoomIcon
                                            name={amenity.icon}
                                        />
                                    </span>

                                    <p>{amenity.name}</p>

                                    <i>✓</i>

                                </div>

                            ))}

                        </div>

                    </article>

                    <article className="resident-room-section-card">

                        <div className="resident-room-section-heading">

                            <div>
                                <h2>Room Rules</h2>

                                <p>
                                    Guidelines for a comfortable stay
                                </p>
                            </div>

                        </div>

                        <ul className="resident-room-rules">

                            {roomRules.map((rule, index) => (

                                <li key={rule}>

                                    <span>{index + 1}</span>

                                    <p>{rule}</p>

                                </li>

                            ))}

                        </ul>

                    </article>

                    <article className="resident-room-help-card">

                        <span className="resident-room-help-icon">
                            <RoomIcon name="help" />
                        </span>

                        <div>
                            <h2>Need help with your room?</h2>

                            <p>
                                Raise a complaint for maintenance
                                issues or request a room shift.
                            </p>

                            <div className="resident-room-help-actions">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/resident/complaints"
                                        )
                                    }
                                >
                                    Raise Complaint
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/resident/room-shift"
                                        )
                                    }
                                >
                                    Request Shift
                                </button>

                            </div>

                        </div>

                    </article>

                </div>

            </section>

        </div>
    );
}

function RoomIcon({ name }) {

    const icons = {

        type: (
            <>
                <path d="M4 21V5H18V21M2 21H21" />
                <path d="M8 9H14M8 13H14M8 17H12" />
            </>
        ),

        capacity: (
            <>
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="9" r="2" />
                <path d="M3 20C3 16.5 5.7 14 9 14C12.3 14 15 16.5 15 20" />
                <path d="M15 15C18 14.5 21 16.5 21 20" />
            </>
        ),

        floor: (
            <>
                <path d="M4 20H20" />
                <path d="M6 20V4H18V20" />
                <path d="M9 8H11M14 8H16M9 12H11M14 12H16M9 16H11M14 16H16" />
            </>
        ),

        fees: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 9H21M7 15H11" />
            </>
        ),

        bed: (
            <>
                <path d="M3 18V8M21 18V12C21 10.9 20.1 10 19 10H10V16" />
                <path d="M3 16H21M6 10C7.1 10 8 9.1 8 8C8 6.9 7.1 6 6 6C4.9 6 4 6.9 4 8C4 9.1 4.9 10 6 10Z" />
            </>
        ),

        table: (
            <>
                <path d="M4 10H20M6 10V20M18 10V20" />
                <path d="M7 5H17V10H7V5Z" />
            </>
        ),

        storage: (
            <>
                <rect x="5" y="3" width="14" height="18" rx="1" />
                <path d="M12 3V21M9 11H10M14 11H15" />
            </>
        ),

        fan: (
            <>
                <circle cx="12" cy="12" r="2" />
                <path d="M12 10C10 7 10 4 12 3C14 4 14 7 12 10Z" />
                <path d="M14 12C17 10 20 10 21 12C20 14 17 14 14 12Z" />
                <path d="M12 14C14 17 14 20 12 21C10 20 10 17 12 14Z" />
            </>
        ),

        wifi: (
            <>
                <path d="M4 9C8.5 5.5 15.5 5.5 20 9" />
                <path d="M7 13C10 10.5 14 10.5 17 13" />
                <path d="M10 17C11.3 16 12.7 16 14 17" />
                <circle cx="12" cy="20" r="0.7" />
            </>
        ),

        bathroom: (
            <>
                <path d="M5 11H21V14C21 17.3 18.3 20 15 20H11C7.7 20 5 17.3 5 14V11Z" />
                <path d="M8 11V6C8 4.3 9.3 3 11 3C12.2 3 13.2 3.7 13.7 4.7" />
                <path d="M8 20L7 22M18 20L19 22" />
            </>
        ),

        help: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9C9.7 7.5 10.7 6.7 12.2 6.7C13.8 6.7 15 7.7 15 9.2C15 11.5 12 11.5 12 14" />
                <circle cx="12" cy="17.5" r="0.6" />
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

export default ResidentRoomDetails;