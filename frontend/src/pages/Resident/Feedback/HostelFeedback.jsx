import { useEffect, useState } from "react";
import "./HostelFeedback.css";

const ratingFields = [
  {
    name: "overallRating",
    label: "Overall Experience",
    description: "Your overall experience with the hostel",
  },
  {
    name: "foodRating",
    label: "Food Quality",
    description: "Quality, taste, and variety of food",
  },
  {
    name: "cleanlinessRating",
    label: "Cleanliness",
    description: "Rooms, bathrooms, and common areas",
  },
  {
    name: "managementRating",
    label: "Management",
    description: "Management support and responsiveness",
  },
];

function StarRating({ value, onChange, disabled = false }) {
  return (
    <div
      className="hostel-feedback-stars"
      role="radiogroup"
      aria-label="Select rating"
    >
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={`hostel-feedback-star ${
            rating <= value ? "active" : ""
          }`}
          onClick={() => onChange(rating)}
          disabled={disabled}
          aria-label={`${rating} star${rating > 1 ? "s" : ""}`}
          aria-checked={value === rating}
          role="radio"
        >
          ★
        </button>
      ))}
    </div>
  );
}

function HostelFeedback() {
  const [formData, setFormData] = useState({
    overallRating: 0,
    foodRating: 0,
    cleanlinessRating: 0,
    managementRating: 0,
    comments: "",
    suggestions: "",
    anonymous: false,
  });

  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const resident = JSON.parse(localStorage.getItem("resident")) || {
    id: "RES001",
    fullName: "Resident",
    hostelName: "StayMate Hostel",
    roomNumber: "Not allocated",
  };

  useEffect(() => {
    try {
      const storedFeedback =
        JSON.parse(localStorage.getItem("hostelFeedbacks")) || [];

      const residentFeedback = storedFeedback
        .filter(
          (feedback) =>
            feedback.residentId === resident.id ||
            feedback.residentEmail === resident.email
        )
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

      setFeedbackHistory(residentFeedback);
    } catch (error) {
      console.error("Unable to load feedback:", error);
      setFeedbackHistory([]);
    }
  }, [resident.id, resident.email]);

  const handleRatingChange = (fieldName, rating) => {
    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: rating,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const ratingsCompleted = ratingFields.every(
      (field) => formData[field.name] > 0
    );

    if (!ratingsCompleted) {
      setMessage({
        type: "error",
        text: "Please provide a rating for every category.",
      });
      return;
    }

    if (formData.comments.trim().length < 10) {
      setMessage({
        type: "error",
        text: "Please enter at least 10 characters in your feedback.",
      });
      return;
    }

    const newFeedback = {
      id: `FDB-${Date.now()}`,
      residentId: resident.id || "RES001",
      residentEmail: resident.email || "",
      residentName: formData.anonymous
        ? "Anonymous Resident"
        : resident.fullName || resident.name || "Resident",
      hostelName: resident.hostelName || "StayMate Hostel",
      roomNumber: resident.roomNumber || "Not allocated",
      overallRating: formData.overallRating,
      foodRating: formData.foodRating,
      cleanlinessRating: formData.cleanlinessRating,
      managementRating: formData.managementRating,
      comments: formData.comments.trim(),
      suggestions: formData.suggestions.trim(),
      anonymous: formData.anonymous,
      status: "SUBMITTED",
      submittedAt: new Date().toISOString(),
    };

    try {
      const existingFeedback =
        JSON.parse(localStorage.getItem("hostelFeedbacks")) || [];

      const updatedFeedback = [newFeedback, ...existingFeedback];

      localStorage.setItem(
        "hostelFeedbacks",
        JSON.stringify(updatedFeedback)
      );

      setFeedbackHistory((previousHistory) => [
        newFeedback,
        ...previousHistory,
      ]);

      setFormData({
        overallRating: 0,
        foodRating: 0,
        cleanlinessRating: 0,
        managementRating: 0,
        comments: "",
        suggestions: "",
        anonymous: false,
      });

      setMessage({
        type: "success",
        text: "Thank you! Your feedback has been submitted successfully.",
      });
    } catch (error) {
      console.error("Unable to save feedback:", error);

      setMessage({
        type: "error",
        text: "Unable to submit feedback. Please try again.",
      });
    }
  };

  const formatDate = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getAverageRating = (feedback) => {
    const total =
      feedback.overallRating +
      feedback.foodRating +
      feedback.cleanlinessRating +
      feedback.managementRating;

    return (total / 4).toFixed(1);
  };

  return (
    <div className="hostel-feedback-page">
      <section className="hostel-feedback-heading">
        <div>
          <p className="hostel-feedback-eyebrow">Resident Services</p>
          <h1>Hostel Feedback</h1>
          <p>
            Share your experience and help the hostel management improve its
            services.
          </p>
        </div>

        <div className="hostel-feedback-hostel-card">
          <span>Giving feedback for</span>
          <strong>{resident.hostelName || "StayMate Hostel"}</strong>
        </div>
      </section>

      {message.text && (
        <div
          className={`hostel-feedback-message hostel-feedback-message-${message.type}`}
          role="alert"
        >
          <span>{message.type === "success" ? "✓" : "!"}</span>
          <p>{message.text}</p>
        </div>
      )}

      <div className="hostel-feedback-content">
        <form className="hostel-feedback-form" onSubmit={handleSubmit}>
          <div className="hostel-feedback-card">
            <div className="hostel-feedback-card-heading">
              <div>
                <h2>Rate Your Experience</h2>
                <p>Select a rating from 1 to 5 for each category.</p>
              </div>

              <span className="hostel-feedback-required">All required</span>
            </div>

            <div className="hostel-feedback-ratings">
              {ratingFields.map((field) => (
                <div className="hostel-feedback-rating-row" key={field.name}>
                  <div>
                    <label>{field.label}</label>
                    <p>{field.description}</p>
                  </div>

                  <div className="hostel-feedback-rating-control">
                    <StarRating
                      value={formData[field.name]}
                      onChange={(rating) =>
                        handleRatingChange(field.name, rating)
                      }
                    />

                    <span>
                      {formData[field.name] > 0
                        ? `${formData[field.name]}/5`
                        : "Not rated"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hostel-feedback-card">
            <div className="hostel-feedback-card-heading">
              <div>
                <h2>Tell Us More</h2>
                <p>Your comments help management understand your experience.</p>
              </div>
            </div>

            <div className="hostel-feedback-field">
              <label htmlFor="comments">
                Your Feedback <span>*</span>
              </label>

              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Tell us what you liked and what could be improved..."
                maxLength="500"
                rows="5"
              />

              <div className="hostel-feedback-field-footer">
                <small>Minimum 10 characters</small>
                <small>{formData.comments.length}/500</small>
              </div>
            </div>

            <div className="hostel-feedback-field">
              <label htmlFor="suggestions">Suggestions</label>

              <textarea
                id="suggestions"
                name="suggestions"
                value={formData.suggestions}
                onChange={handleInputChange}
                placeholder="Share any suggestions you have for the hostel..."
                maxLength="300"
                rows="4"
              />

              <div className="hostel-feedback-field-footer">
                <small>Optional</small>
                <small>{formData.suggestions.length}/300</small>
              </div>
            </div>

            <label className="hostel-feedback-checkbox">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleInputChange}
              />

              <span className="hostel-feedback-checkbox-box">✓</span>

              <span>
                <strong>Submit anonymously</strong>
                <small>
                  Your name and room number will not be shown to hostel
                  management.
                </small>
              </span>
            </label>

            <div className="hostel-feedback-form-actions">
              <p>
                Your feedback will only be visible to authorized hostel
                management.
              </p>

              <button type="submit" className="hostel-feedback-submit-button">
                Submit Feedback
              </button>
            </div>
          </div>
        </form>

        <aside className="hostel-feedback-side">
          <div className="hostel-feedback-info-card">
            <div className="hostel-feedback-info-icon">♥</div>
            <h3>Your opinion matters</h3>
            <p>
              Honest feedback helps us provide cleaner, safer, and more
              comfortable hostel services.
            </p>

            <ul>
              <li>Your feedback is kept secure</li>
              <li>You may submit anonymously</li>
              <li>Management reviews every response</li>
            </ul>
          </div>

          <div className="hostel-feedback-guide-card">
            <h3>Rating Guide</h3>

            <div>
              <span>5 ★</span>
              <p>Excellent</p>
            </div>

            <div>
              <span>4 ★</span>
              <p>Good</p>
            </div>

            <div>
              <span>3 ★</span>
              <p>Average</p>
            </div>

            <div>
              <span>2 ★</span>
              <p>Needs improvement</p>
            </div>

            <div>
              <span>1 ★</span>
              <p>Poor</p>
            </div>
          </div>
        </aside>
      </div>

      <section className="hostel-feedback-history">
        <div className="hostel-feedback-history-heading">
          <div>
            <h2>Previous Feedback</h2>
            <p>Feedback you have submitted earlier.</p>
          </div>

          <span>
            {feedbackHistory.length}{" "}
            {feedbackHistory.length === 1 ? "response" : "responses"}
          </span>
        </div>

        {feedbackHistory.length === 0 ? (
          <div className="hostel-feedback-empty">
            <div>☆</div>
            <h3>No feedback submitted yet</h3>
            <p>Your submitted feedback will appear here.</p>
          </div>
        ) : (
          <div className="hostel-feedback-history-list">
            {feedbackHistory.map((feedback) => (
              <article
                className="hostel-feedback-history-item"
                key={feedback.id}
              >
                <div className="hostel-feedback-history-top">
                  <div className="hostel-feedback-average">
                    <strong>{getAverageRating(feedback)}</strong>
                    <span>★ Average Rating</span>
                  </div>

                  <div className="hostel-feedback-history-date">
                    <span className="hostel-feedback-status">
                      {feedback.status}
                    </span>
                    <p>{formatDate(feedback.submittedAt)}</p>
                  </div>
                </div>

                <div className="hostel-feedback-history-ratings">
                  <span>Overall: {feedback.overallRating}/5</span>
                  <span>Food: {feedback.foodRating}/5</span>
                  <span>Cleanliness: {feedback.cleanlinessRating}/5</span>
                  <span>Management: {feedback.managementRating}/5</span>
                </div>

                <p className="hostel-feedback-history-comment">
                  “{feedback.comments}”
                </p>

                {feedback.suggestions && (
                  <div className="hostel-feedback-history-suggestion">
                    <strong>Suggestion:</strong>
                    <p>{feedback.suggestions}</p>
                  </div>
                )}

                {feedback.anonymous && (
                  <span className="hostel-feedback-anonymous">
                    Submitted anonymously
                  </span>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HostelFeedback;