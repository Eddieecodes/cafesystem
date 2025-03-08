import React, { useState, useEffect } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch feedback
    const fetchFeedback = async () => {
      const feedbackData = [
        { id: 1, message: "Great system, but it needs improvements.", timestamp: "2025-03-04 10:00 AM" },
        { id: 2, message: "The cafeteria queues have reduced, thanks!", timestamp: "2025-03-04 12:30 PM" },
      ];
      setFeedbackList(feedbackData);
    };

    fetchFeedback();
  }, []);

  return (
    <div className="feedback-container">
      <h2>Student Feedback</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <ul>
          {feedbackList.map((feedback) => (
            <li key={feedback.id}>
              <p>{feedback.message}</p>
              <span>{feedback.timestamp}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feedback;
