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

const residentService = {
  /**
   * Get the currently logged-in resident.
   * Backend endpoint: GET /api/residents/me
   */
  getCurrentResident: () => {
    return request("/residents/me");
  },

  /**
   * Get a resident using the resident ID.
   * Backend endpoint: GET /api/residents/{residentId}
   */
  getResidentById: (residentId) => {
    if (!residentId) {
      throw new Error("Resident ID is required.");
    }

    return request(`/residents/${encodeURIComponent(residentId)}`);
  },

  /**
   * Update the currently logged-in resident's profile.
   * Backend endpoint: PUT /api/residents/me
   */
  updateCurrentResident: (profileData) => {
    return request("/residents/me", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Update a resident using the resident ID.
   * Backend endpoint: PUT /api/residents/{residentId}
   */
  updateResident: (residentId, profileData) => {
    if (!residentId) {
      throw new Error("Resident ID is required.");
    }

    return request(`/residents/${encodeURIComponent(residentId)}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Get resident dashboard information.
   * Backend endpoint: GET /api/residents/me/dashboard
   */
  getDashboard: () => {
    return request("/residents/me/dashboard");
  },

  /**
   * Get the allocated room details of the logged-in resident.
   * Backend endpoint: GET /api/residents/me/room
   */
  getRoomDetails: () => {
    return request("/residents/me/room");
  },

  /**
   * Get residents belonging to a hostel.
   * This can be used on the admin side.
   * Backend endpoint: GET /api/residents/hostel/{hostelId}
   */
  getResidentsByHostel: (hostelId) => {
    if (!hostelId) {
      throw new Error("Hostel ID is required.");
    }

    return request(
      `/residents/hostel/${encodeURIComponent(hostelId)}`
    );
  },

  /**
   * Change the logged-in resident's password.
   * Backend endpoint: PUT /api/residents/me/password
   */
  changePassword: (passwordData) => {
    return request("/residents/me/password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    });
  },

  /**
   * Update resident emergency contact.
   * Backend endpoint: PUT /api/residents/me/emergency-contact
   */
  updateEmergencyContact: (emergencyContactData) => {
    return request("/residents/me/emergency-contact", {
      method: "PUT",
      body: JSON.stringify(emergencyContactData),
    });
  },
};

export default residentService;