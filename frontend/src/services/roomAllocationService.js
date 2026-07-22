const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/*
 * Gets the JWT token saved after login.
 * These multiple names are checked so the service works with
 * different token names used during development.
 */
const getAuthToken = () => {
  return (
    localStorage.getItem("staymateToken") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("token")
  );
};

/*
 * Common function used for all API requests.
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 204) {
      return null;
    }

    const responseText = await response.text();
    let responseData = null;

    if (responseText) {
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = responseText;
        }
      } else {
        responseData = responseText;
      }
    }

    if (!response.ok) {
      const errorMessage =
        responseData?.message ||
        responseData?.error ||
        responseData ||
        `Request failed with status ${response.status}.`;

      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the StayMate server. Please check whether the Spring Boot backend is running."
      );
    }

    throw error;
  }
};

/*
 * Converts frontend room types into values expected by Spring Boot.
 */
const normalizeRoomType = (roomType) => {
  if (!roomType || roomType === "ALL") {
    return "";
  }

  const value = roomType.toUpperCase().replaceAll("-", "_");

  if (value === "NON_AC" || value === "NONAC") {
    return "NON_AC";
  }

  if (value === "AC") {
    return "AC";
  }

  return value;
};

const roomAllocationService = {
  /*
   * Get all rooms that have at least one available bed.
   *
   * Example:
   * getAvailableRooms({
   *   roomType: "AC",
   *   capacity: 2
   * });
   *
   * Backend:
   * GET /api/rooms/available
   * GET /api/rooms/available?roomType=AC&capacity=2
   */
  getAvailableRooms: async (filters = {}) => {
    const queryParameters = new URLSearchParams();

    const roomType = normalizeRoomType(filters.roomType);

    if (roomType) {
      queryParameters.append("roomType", roomType);
    }

    if (
      filters.capacity &&
      filters.capacity !== "ALL"
    ) {
      queryParameters.append(
        "capacity",
        String(filters.capacity)
      );
    }

    if (filters.hostelId) {
      queryParameters.append(
        "hostelId",
        String(filters.hostelId)
      );
    }

    const queryString = queryParameters.toString();

    const endpoint = queryString
      ? `/rooms/available?${queryString}`
      : "/rooms/available";

    return apiRequest(endpoint);
  },

  /*
   * Get complete information about one selected room.
   *
   * Backend:
   * GET /api/rooms/{roomId}
   */
  getRoomById: async (roomId) => {
    if (!roomId) {
      throw new Error("Room ID is required.");
    }

    return apiRequest(
      `/rooms/${encodeURIComponent(roomId)}`
    );
  },

  /*
   * Resident submits a room-allocation request.
   *
   * Example requestData:
   * {
   *   roomId: 12
   * }
   *
   * The backend should identify the resident using the JWT token.
   *
   * Backend:
   * POST /api/room-allocation-requests
   */
  createRequest: async (requestData) => {
    if (!requestData?.roomId) {
      throw new Error(
        "Please select a room before making a request."
      );
    }

    return apiRequest("/room-allocation-requests", {
      method: "POST",
      body: JSON.stringify({
        roomId: requestData.roomId,
        note: requestData.note?.trim() || "",
      }),
    });
  },

  /*
   * Get the latest allocation request of the logged-in resident.
   *
   * Backend:
   * GET /api/room-allocation-requests/me/latest
   */
  getLatestRequest: async () => {
    return apiRequest(
      "/room-allocation-requests/me/latest"
    );
  },

  /*
   * Alias for getLatestRequest().
   * Either method name can be used in AllocationStatus.jsx.
   */
  getMyLatestRequest: async () => {
    return apiRequest(
      "/room-allocation-requests/me/latest"
    );
  },

  /*
   * Get all allocation requests submitted by the logged-in resident.
   *
   * Backend:
   * GET /api/room-allocation-requests/me
   */
  getMyRequests: async () => {
    return apiRequest("/room-allocation-requests/me");
  },

  /*
   * Get one room-allocation request by its ID.
   *
   * Backend:
   * GET /api/room-allocation-requests/{requestId}
   */
  getRequestById: async (requestId) => {
    if (!requestId) {
      throw new Error(
        "Room-allocation request ID is required."
      );
    }

    return apiRequest(
      `/room-allocation-requests/${encodeURIComponent(
        requestId
      )}`
    );
  },

  /*
   * Cancel a pending request.
   *
   * Backend:
   * PATCH /api/room-allocation-requests/{requestId}/cancel
   */
  cancelRequest: async (requestId) => {
    if (!requestId) {
      throw new Error(
        "Room-allocation request ID is required."
      );
    }

    return apiRequest(
      `/room-allocation-requests/${encodeURIComponent(
        requestId
      )}/cancel`,
      {
        method: "PATCH",
      }
    );
  },

  /*
   * Admin gets room requests for their hostel.
   *
   * Example:
   * getAdminRequests("PENDING")
   *
   * Backend:
   * GET /api/room-allocation-requests/admin
   * GET /api/room-allocation-requests/admin?status=PENDING
   */
  getAdminRequests: async (status = "") => {
    const queryParameters = new URLSearchParams();

    if (status && status !== "ALL") {
      queryParameters.append(
        "status",
        status.toUpperCase()
      );
    }

    const queryString = queryParameters.toString();

    const endpoint = queryString
      ? `/room-allocation-requests/admin?${queryString}`
      : "/room-allocation-requests/admin";

    return apiRequest(endpoint);
  },

  /*
   * Admin approves the resident's selected room.
   *
   * Example:
   * approveRequest(15, {
   *   adminNote: "Room allocation approved"
   * });
   *
   * Backend:
   * PATCH /api/room-allocation-requests/{requestId}/approve
   */
  approveRequest: async (
    requestId,
    approvalData = {}
  ) => {
    if (!requestId) {
      throw new Error(
        "Room-allocation request ID is required."
      );
    }

    return apiRequest(
      `/room-allocation-requests/${encodeURIComponent(
        requestId
      )}/approve`,
      {
        method: "PATCH",
        body: JSON.stringify({
          adminNote:
            approvalData.adminNote?.trim() || "",
        }),
      }
    );
  },

  /*
   * Admin rejects a room-allocation request.
   *
   * Example:
   * rejectRequest(15, {
   *   reason: "The selected room is no longer available"
   * });
   *
   * Backend:
   * PATCH /api/room-allocation-requests/{requestId}/reject
   */
  rejectRequest: async (
    requestId,
    rejectionData
  ) => {
    if (!requestId) {
      throw new Error(
        "Room-allocation request ID is required."
      );
    }

    if (!rejectionData?.reason?.trim()) {
      throw new Error(
        "Please enter a reason for rejecting the request."
      );
    }

    return apiRequest(
      `/room-allocation-requests/${encodeURIComponent(
        requestId
      )}/reject`,
      {
        method: "PATCH",
        body: JSON.stringify({
          reason: rejectionData.reason.trim(),
        }),
      }
    );
  },
};

export default roomAllocationService;