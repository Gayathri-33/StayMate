import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import residentService from "../../services/residentService.js";

import "./Login.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

/*
 * Converts roles such as ROLE_RESIDENT into RESIDENT.
 */
const normalizeRole = (role) => {
  return String(role || "")
    .toUpperCase()
    .replace("ROLE_", "");
};

/*
 * Safely read the response returned by Spring Boot.
 */
const readResponse = async (response) => {
  const responseText = await response.text();

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "RESIDENT",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return false;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(formData.email.trim())
    ) {
      setError(
        "Please enter a valid email address."
      );

      return false;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return false;
    }

    if (!formData.role) {
      setError("Please select your account type.");
      return false;
    }

    return true;
  };

  /*
   * Store the authentication token.
   * residentService and roomAllocationService will use
   * this value in their Authorization header.
   */
  const saveToken = (token) => {
    if (!token) {
      return;
    }

    localStorage.setItem(
      "staymateToken",
      token
    );
  };

  const clearOldLoginData = () => {
    localStorage.removeItem("staymateToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("resident");
    localStorage.removeItem("admin");
    localStorage.removeItem("allocationStatus");
  };

  /*
   * Resident redirection based on allocation status.
   */
  const redirectResident = async (
    loginResponse,
    residentData
  ) => {
    let allocationData;

    try {
      allocationData =
        await residentService.getAllocationStatus();
    } catch (allocationError) {
      /*
       * Some login APIs may return allocation status
       * along with the login response.
       *
       * Use it only as a fallback when the separate
       * allocation endpoint is temporarily unavailable.
       */
      const loginAllocationStatus =
        loginResponse.allocationStatus ||
        residentData.allocationStatus;

      if (loginAllocationStatus) {
        allocationData = {
          allocationStatus:
            loginAllocationStatus,

          roomAllocated:
            loginResponse.roomAllocated ??
            residentData.roomAllocated ??
            false,

          roomId:
            loginResponse.roomId ||
            residentData.roomId ||
            null,

          roomNumber:
            loginResponse.roomNumber ||
            residentData.roomNumber ||
            null,
        };
      } else {
        throw allocationError;
      }
    }

    const allocationStatus = String(
      allocationData?.allocationStatus ||
        allocationData?.status ||
        (allocationData?.roomAllocated
          ? "APPROVED"
          : "NONE")
    ).toUpperCase();

    const updatedResident = {
      ...residentData,

      allocationStatus,

      roomAllocated:
        allocationStatus === "APPROVED",

      roomId:
        allocationData?.roomId ||
        residentData.roomId ||
        null,

      roomNumber:
        allocationData?.roomNumber ||
        residentData.roomNumber ||
        null,

      roomAllocationRequestId:
        allocationData?.requestId ||
        residentData.roomAllocationRequestId ||
        null,
    };

    localStorage.setItem(
      "resident",
      JSON.stringify(updatedResident)
    );

    localStorage.setItem(
      "allocationStatus",
      allocationStatus
    );

    /*
     * Final resident-login routing.
     */
    if (allocationStatus === "APPROVED") {
      navigate("/resident/dashboard", {
        replace: true,
      });

      return;
    }

    if (
      allocationStatus === "PENDING" ||
      allocationStatus === "REJECTED"
    ) {
      navigate(
        "/resident/allocation-status",
        {
          replace: true,
        }
      );

      return;
    }

    /*
     * NONE, CANCELLED, or an unknown state means the
     * resident should select an available room.
     */
    navigate("/resident/room-request", {
      replace: true,
    });
  };

  /*
   * Existing administrator redirection.
   */
  const redirectAdmin = (
    loginResponse,
    adminData
  ) => {
    localStorage.setItem(
      "admin",
      JSON.stringify(adminData)
    );

    const hasHostel =
      loginResponse.hasHostel === true ||
      adminData.hasHostel === true ||
      Boolean(
        loginResponse.hostelId ||
          adminData.hostelId ||
          loginResponse.hostel?.id ||
          adminData.hostel?.id
      );

    if (hasHostel) {
      navigate("/admin/dashboard", {
        replace: true,
      });
    } else {
      navigate("/admin/welcome", {
        replace: true,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const responseData =
        await readResponse(response);

      if (!response.ok) {
        const errorMessage =
          responseData?.message ||
          responseData?.error ||
          responseData ||
          "Invalid email or password.";

        throw new Error(errorMessage);
      }

      const loginData =
        responseData?.data || responseData || {};

      const userData =
        loginData.user ||
        loginData.resident ||
        loginData.admin ||
        {};

      const token =
        loginData.token ||
        loginData.accessToken ||
        loginData.jwtToken ||
        loginData.jwt ||
        responseData?.token;

      if (!token) {
        throw new Error(
          "Login was successful, but the authentication token was not received."
        );
      }

      const role = normalizeRole(
        loginData.role ||
          userData.role ||
          formData.role
      );

      clearOldLoginData();
      saveToken(token);

      if (role === "RESIDENT") {
        const residentData =
          loginData.resident ||
          loginData.user || {
            ...userData,
            email: formData.email.trim(),
          };

        localStorage.setItem(
          "resident",
          JSON.stringify(residentData)
        );

        await redirectResident(
          loginData,
          residentData
        );

        return;
      }

      if (role === "ADMIN") {
        const adminData =
          loginData.admin ||
          loginData.user || {
            ...userData,
            email: formData.email.trim(),
          };

        redirectAdmin(loginData, adminData);
        return;
      }

      throw new Error(
        "The selected account type does not match this account."
      );
    } catch (loginError) {
      console.error("Login failed:", loginError);

      setError(
        loginError.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-shape login-shape-one" />
      <div className="login-background-shape login-shape-two" />

      <div className="login-container">
        <section className="login-welcome-section">
          <Link
            to="/"
            className="login-brand"
          >
            <span>S</span>
            StayMate
          </Link>

          <div className="login-welcome-content">
            <p>Smart Hostel Management</p>

            <h1>
              Welcome back to your hostel companion.
            </h1>

            <span>
              Manage rooms, menus, complaints, requests,
              and hostel services from one secure place.
            </span>
          </div>

          <div className="login-welcome-features">
            <span>Secure</span>
            <span>Fast</span>
            <span>Student Friendly</span>
          </div>
        </section>

        <section className="login-form-section">
          <div className="login-form-heading">
            <p>Welcome Back</p>

            <h2>Login to StayMate</h2>

            <span>
              Enter your account details to continue.
            </span>
          </div>

          {error && (
            <div
              className="login-error-message"
              role="alert"
            >
              <span>!</span>

              <p>{error}</p>
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="login-field">
              <label htmlFor="loginRole">
                Account Type
              </label>

              <select
                id="loginRole"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="RESIDENT">
                  Resident
                </option>

                <option value="ADMIN">
                  Hostel Administrator
                </option>
              </select>
            </div>

            <div className="login-field">
              <label htmlFor="loginEmail">
                Email Address
              </label>

              <div className="login-input-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6h18v12H3V6Zm0 1 9 6 9-6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                </svg>

                <input
                  id="loginEmail"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="loginPassword">
                  Password
                </label>

                <button
                  type="button"
                  className="login-forgot-button"
                  onClick={() => {
                    setError(
                      "Password recovery will be added later."
                    );
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="login-input-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="11"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.7"
                  />
                </svg>

                <input
                  id="loginPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading && (
                <span className="login-button-spinner" />
              )}

              {loading
                ? "Checking Account..."
                : "Login"}
            </button>
          </form>

          <p className="login-register-text">
            Don&apos;t have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>
          </p>

          <Link
            to="/"
            className="login-home-link"
          >
            ← Back to Home
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Login;