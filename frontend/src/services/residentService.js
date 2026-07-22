const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/*
 * Get the token saved after login.
 */
const getAuthToken = () => {
  return (
    localStorage.getItem("staymateToken") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("token")
  );
};

/*
 * Common function used for resident API requests.
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

      const requestError = new Error(errorMessage);

      requestError.status = response.status;
      requestError.data = responseData;

      throw requestError;
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
 * Converts different backend status formats into one common format.
 */
const normalizeAllocationStatus = (statusData) => {
  if (!statusData) {
    return {
      roomAllocated: false,
      allocationStatus: "NONE",
      roomId: null,
      roomNumber: null,
      requestId: null,
    };
  }

  const status = (
    statusData.allocationStatus ||
    statusData.requestStatus ||
    statusData.status ||
    (statusData.roomAllocated ? "APPROVED" : "NONE")
  ).toUpperCase();

  const allocated =
    statusData.roomAllocated === true ||
    status === "APPROVED";

  return {
    ...statusData,

    roomAllocated: allocated,
    allocationStatus: status,

    roomId:
      statusData.allocatedRoomId ||
      statusData.room?.id ||
      (allocated ? statusData.roomId : null) ||
      null,

    roomNumber:
      statusData.allocatedRoomNumber ||
      statusData.room?.roomNumber ||
      (allocated ? statusData.roomNumber : null) ||
      null,

    requestId:
      statusData.requestId ||
      statusData.allocationRequestId ||
      null,
  };
};

const residentService = {
  /*
   * Get the profile of the logged-in resident.
   *
   * Backend:
   * GET /api/residents/me
   */
  getCurrentResident: async () => {
    return apiRequest("/residents/me");
  },

  /*
   * Get a resident by ID.
   *
   * Backend:
   * GET /api/residents/{residentId}
   */
  getResidentById: async (residentId) => {
    if (!residentId) {
      throw new Error("Resident ID is required.");
    }

    return apiRequest(
      `/residents/${encodeURIComponent(residentId)}`
    );
  },

  /*
   * Check whether the logged-in resident has an allocated room.
   *
   * Expected backend response:
   *
   * {
   *   "roomAllocated": false,
   *   "allocationStatus": "PENDING",
   *   "roomId": null,
   *   "roomNumber": null,
   *   "requestId": 15
   * }
   *
   * Backend:
   * GET /api/residents/me/allocation-status
   */
  getAllocationStatus: async () => {
    try {
      const statusData = await apiRequest(
        "/residents/me/allocation-status"
      );

      return normalizeAllocationStatus(statusData);
    } catch (error) {
      /*
       * A 404 can mean the new resident has not made
       * any room request yet.
       */
      if (error.status === 404) {
        return {
          roomAllocated: false,
          allocationStatus: "NONE",
          roomId: null,
          roomNumber: null,
          requestId: null,
        };
      }

      throw error;
    }
  },

  /*
   * Update the logged-in resident's profile.
   *
   * Backend:
   * PUT /api/residents/me
   */
  updateCurrentResident: async (profileData) => {
    if (!profileData) {
      throw new Error("Profile information is required.");
    }

    return apiRequest("/residents/me", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  /*
   * Update a resident using the resident ID.
   *
   * This method can be used by an administrator.
   *
   * Backend:
   * PUT /api/residents/{residentId}
   */
  updateResident: async (residentId, profileData) => {
    if (!residentId) {
      throw new Error("Resident ID is required.");
    }

    if (!profileData) {
      throw new Error("Profile information is required.");
    }

    return apiRequest(
      `/residents/${encodeURIComponent(residentId)}`,
      {
        method: "PUT",
        body: JSON.stringify(profileData),
      }
    );
  },

  /*
   * Get dashboard information for the logged-in resident.
   *
   * Backend:
   * GET /api/residents/me/dashboard
   */
  getDashboard: async () => {
    return apiRequest("/residents/me/dashboard");
  },

  /*
   * Get the room allocated to the logged-in resident.
   *
   * Backend:
   * GET /api/residents/me/room
   */
  getRoomDetails: async () => {
    try {
      return await apiRequest("/residents/me/room");
    } catch (error) {
      if (error.status === 404) {
        return null;
      }

      throw error;
    }
  },

  /*
   * Get all residents belonging to a hostel.
   *
   * This can be used by the hostel administrator.
   *
   * Backend:
   * GET /api/residents/hostel/{hostelId}
   */
  getResidentsByHostel: async (hostelId) => {
    if (!hostelId) {
      throw new Error("Hostel ID is required.");
    }

    return apiRequest(
      `/residents/hostel/${encodeURIComponent(hostelId)}`
    );
  },

  /*
   * Change the logged-in resident's password.
   *
   * Expected passwordData:
   *
   * {
   *   currentPassword: "old password",
   *   newPassword: "new password",
   *   confirmPassword: "new password"
   * }
   *
   * Backend:
   * PUT /api/residents/me/password
   */
  changePassword: async (passwordData) => {
    if (!passwordData?.currentPassword) {
      throw new Error("Current password is required.");
    }

    if (!passwordData?.newPassword) {
      throw new Error("New password is required.");
    }

    if (
      passwordData.confirmPassword &&
      passwordData.newPassword !==
        passwordData.confirmPassword
    ) {
      throw new Error(
        "New password and confirm password do not match."
      );
    }

    return apiRequest("/residents/me/password", {
      method: "PUT",
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }),
    });
  },

  /*
   * Update the logged-in resident's emergency contact.
   *
   * Expected emergencyContactData:
   *
   * {
   *   name: "Parent Name",
   *   relationship: "Father",
   *   phoneNumber: "9876543210"
   * }
   *
   * Backend:
   * PUT /api/residents/me/emergency-contact
   */
  updateEmergencyContact: async (
    emergencyContactData
  ) => {
    if (!emergencyContactData?.name) {
      throw new Error(
        "Emergency contact name is required."
      );
    }

    if (!emergencyContactData?.phoneNumber) {
      throw new Error(
        "Emergency contact phone number is required."
      );
    }

    return apiRequest(
      "/residents/me/emergency-contact",
      {
        method: "PUT",
        body: JSON.stringify(
          emergencyContactData
        ),
      }
    );
  },
};

export default residentService;