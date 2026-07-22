const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const getAuthToken = () => {
  return (
    localStorage.getItem("staymateToken") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("token")
  );
};

const request = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
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

    const contentType = response.headers.get("content-type");

    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const errorMessage =
        responseData?.message ||
        responseData?.error ||
        responseData ||
        "Something went wrong. Please try again.";

      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the StayMate server. Please check whether the backend is running."
      );
    }

    throw error;
  }
};

const roomAllocationService = {
  /**
   * Resident submits a room-allocation request.
   *
   * Example requestData:
   * {
   *   hostelCode: "STAY001",
   *   preferredRoomType: "DOUBLE",
   *   preferredFloor: "2",
   *   note: "Prefer a room near the study hall"
   * }
   *
   * Backend endpoint: POST /api/room-allocation-requests
   */
  createRequest: (requestData) => {
    return request("/room-allocation-requests", {
      method: "POST",
      body: JSON.stringify(requestData),
    });
  },

  /**
   * Get the latest room-allocation request of the logged-in resident.
   * Backend endpoint: GET /api/room-allocation-requests/me/latest
   */
  getLatestRequest: () => {
    return request("/room-allocation-requests/me/latest");
  },

  /**
   * Get all room-allocation requests made by the logged-in resident.
   * Backend endpoint: GET /api/room-allocation-requests/me
   */
  getMyRequests: () => {
    return request("/room-allocation-requests/me");
  },

  /**
   * Get a particular allocation request.
   * Backend endpoint: GET /api/room-allocation-requests/{requestId}
   */
  getRequestById: (requestId) => {
    if (!requestId) {
      throw new Error("Room-allocation request ID is required.");
    }

    return request(
      `/room-allocation-requests/${encodeURIComponent(requestId)}`
    );
  },

  /**
   * Resident cancels a pending room-allocation request.
   * Backend endpoint:
   * PATCH /api/room-allocation-requests/{requestId}/cancel
   */
  cancelRequest: (requestId) => {
    if (!requestId) {
      throw new Error("Room-allocation request ID is required.");
    }

    return request(
      `/room-allocation-requests/${encodeURIComponent(requestId)}/cancel`,
      {
        method: "PATCH",
      }
    );
  },

  /**
   * Admin gets all room-allocation requests belonging to their hostel.
   *
   * Optional status examples:
   * PENDING, APPROVED, REJECTED, CANCELLED
   *
   * Backend endpoint:
   * GET /api/room-allocation-requests/admin?status=PENDING
   */
  getAdminRequests: (status = "") => {
    const query = status
      ? `?status=${encodeURIComponent(status)}`
      : "";

    return request(`/room-allocation-requests/admin${query}`);
  },

  /**
   * Admin approves a room-allocation request.
   *
   * Example allocationData:
   * {
   *   roomId: 12,
   *   bedNumber: 2,
   *   adminNote: "Room allocation approved"
   * }
   *
   * Backend endpoint:
   * PATCH /api/room-allocation-requests/{requestId}/approve
   */
  approveRequest: (requestId, allocationData) => {
    if (!requestId) {
      throw new Error("Room-allocation request ID is required.");
    }

    if (!allocationData?.roomId) {
      throw new Error("Please select a room before approving the request.");
    }

    return request(
      `/room-allocation-requests/${encodeURIComponent(requestId)}/approve`,
      {
        method: "PATCH",
        body: JSON.stringify(allocationData),
      }
    );
  },

  /**
   * Admin rejects a room-allocation request.
   *
   * Example rejectionData:
   * {
   *   reason: "No rooms are currently available"
   * }
   *
   * Backend endpoint:
   * PATCH /api/room-allocation-requests/{requestId}/reject
   */
  rejectRequest: (requestId, rejectionData) => {
    if (!requestId) {
      throw new Error("Room-allocation request ID is required.");
    }

    if (!rejectionData?.reason?.trim()) {
      throw new Error("A rejection reason is required.");
    }

    return request(
      `/room-allocation-requests/${encodeURIComponent(requestId)}/reject`,
      {
        method: "PATCH",
        body: JSON.stringify(rejectionData),
      }
    );
  },
};

export default roomAllocationService;