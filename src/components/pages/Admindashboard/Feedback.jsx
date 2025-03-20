import React, { useState, useEffect } from "react";
import axios from "axios";
import config from '../../../config';
import "./Feedback.css";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  


const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch feedback from backend
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Unauthorized');
        return;
      }

      try {
        const response = await axios.get(`${config.BASE_URL}/feedback/feedbacks`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFeedbackList(response.data);
      } catch (error) {
        toast.error('Failed to fetch feedback.');
      }
    };

    fetchFeedback();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="feedback-container">
      <h2>Student Feedback</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <ul>
          {feedbackList.map((feedback) => (
            <li key={feedback._id}>
              <p>{feedback.feedback}</p>
              <span>{formatDate(feedback.date)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feedback;
