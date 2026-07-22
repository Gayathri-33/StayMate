import { useState } from "react";
import "./ResidentRegister.css";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./ResidentRegister.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

const initialFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  hostelCode: "",
};

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

const getErrorMessage = (responseData) => {
  if (!responseData) {
    return "Resident registration failed.";
  }

  if (typeof responseData === "string") {
    return responseData;
  }

  if (responseData.message) {
    return responseData.message;
  }

  if (responseData.error) {
    return responseData.error;
  }

  /*
   * Supports Spring Boot validation errors such as:
   *
   * {
   *   "errors": {
   *     "email": "Email already exists",
   *     "phoneNumber": "Invalid phone number"
   *   }
   * }
   */
  if (
    responseData.errors &&
    typeof responseData.errors === "object"
  ) {
    return Object.values(
      responseData.errors
    ).join(", ");
  }

  return "Resident registration failed.";
};

function ResidentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    initialFormData
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    /*
     * Phone number should contain only numbers.
     */
    if (
      name === "phoneNumber" &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    /*
     * Hostel code is stored in uppercase.
     */
    const updatedValue =
      name === "hostelCode"
        ? value.toUpperCase()
        : value;

    setFormData((previousData) => ({
      ...previousData,
      [name]: updatedValue,
    }));

    setError("");
  };

  const validateForm = () => {
    if (formData.fullName.trim().length < 3) {
      setError(
        "Full name must contain at least 3 characters."
      );

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

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );

      return false;
    }

    if (formData.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );

      return false;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Password and confirm password do not match."
      );

      return false;
    }

    if (!formData.hostelCode.trim()) {
      setError("Please enter the hostel code.");
      return false;
    }

    return true;
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
        `${API_BASE_URL}/auth/register/resident`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: formData.email
              .trim()
              .toLowerCase(),
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            confirmPassword:
              formData.confirmPassword,
            hostelCode:
              formData.hostelCode.trim(),
          }),
        }
      );

      const responseData =
        await readResponse(response);

      if (!response.ok) {
        throw new Error(
          getErrorMessage(responseData)
        );
      }

      /*
       * Do not save a token and do not redirect to the
       * dashboard here.
       *
       * The resident must log in first. Login.jsx will
       * then check the room-allocation status.
       */
      setFormData(initialFormData);

      navigate("/login", {
        replace: true,

        state: {
          registrationSuccess: true,

          message:
            "Resident registration completed successfully. Please log in to continue.",

          email: formData.email
            .trim()
            .toLowerCase(),

          role: "RESIDENT",
        },
      });
    } catch (registrationError) {
      console.error(
        "Resident registration failed:",
        registrationError
      );

      setError(
        registrationError.message ||
          "Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resident-register-page">
      <div className="resident-register-shape resident-register-shape-one" />
      <div className="resident-register-shape resident-register-shape-two" />

      <div className="resident-register-container">
        <section className="resident-register-intro">
          <Link
            to="/"
            className="resident-register-brand"
          >
            <span>S</span>
            StayMate
          </Link>

          <div className="resident-register-intro-content">
            <p>Resident Registration</p>

            <h1>
              Join your hostel community with StayMate.
            </h1>

            <span>
              Register your account to request a room
              and access hostel services after
              administrator approval.
            </span>
          </div>

          <div className="resident-register-flow">
            <div>
              <span>1</span>

              <p>Register your account</p>
            </div>

            <div>
              <span>2</span>

              <p>Request an available room</p>
            </div>

            <div>
              <span>3</span>

              <p>Receive admin approval</p>
            </div>
          </div>
        </section>

        <section className="resident-register-form-section">
          <div className="resident-register-heading">
            <p>Create Resident Account</p>

            <h2>Resident Registration</h2>

            <span>
              Enter your information to create your
              StayMate account.
            </span>
          </div>

          {error && (
            <div
              className="resident-register-error"
              role="alert"
            >
              <span>!</span>

              <p>{error}</p>
            </div>
          )}

          <form
            className="resident-register-form"
            onSubmit={handleSubmit}
          >
            <div className="resident-register-field resident-register-full-width">
              <label htmlFor="residentFullName">
                Full Name <span>*</span>
              </label>

              <input
                id="residentFullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={loading}
              />
            </div>

            <div className="resident-register-field">
              <label htmlFor="residentEmail">
                Email Address <span>*</span>
              </label>

              <input
                id="residentEmail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="resident-register-field">
              <label htmlFor="residentPhoneNumber">
                Phone Number <span>*</span>
              </label>

              <input
                id="residentPhoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter 10-digit number"
                autoComplete="tel"
                inputMode="numeric"
                maxLength="10"
                disabled={loading}
              />
            </div>

            <div className="resident-register-field">
              <label htmlFor="residentPassword">
                Password <span>*</span>
              </label>

              <div className="resident-register-password">
                <input
                  id="residentPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
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

            <div className="resident-register-field">
              <label htmlFor="residentConfirmPassword">
                Confirm Password <span>*</span>
              </label>

              <div className="resident-register-password">
                <input
                  id="residentConfirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  disabled={loading}
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            <div className="resident-register-field resident-register-full-width">
              <label htmlFor="residentHostelCode">
                Hostel Code <span>*</span>
              </label>

              <input
                id="residentHostelCode"
                type="text"
                name="hostelCode"
                value={formData.hostelCode}
                onChange={handleInputChange}
                placeholder="Enter the code provided by your hostel"
                maxLength="20"
                disabled={loading}
              />

              <small>
                Ask your hostel administrator for the
                hostel code.
              </small>
            </div>

            <button
              type="submit"
              className="resident-register-submit"
              disabled={loading}
            >
              {loading && (
                <span className="resident-register-spinner" />
              )}

              {loading
                ? "Creating Account..."
                : "Register"}
            </button>
          </form>

          <p className="resident-register-login">
            Already have an account?{" "}

            <Link to="/login">Login</Link>
          </p>

          <Link
            to="/register"
            className="resident-register-back"
          >
            ← Back to Registration Options
          </Link>
        </section>
      </div>
    </div>
  );
}

export default ResidentRegister;