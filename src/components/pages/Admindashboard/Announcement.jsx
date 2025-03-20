import React, { useState } from "react";
import axios from "axios";
import config from '../../../config';
import "./Announcement.css";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  


const Announcement = ({ onSendAnnouncement }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized');
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/feedback/message`, { title: "Announcement", content: message }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Announcement sent successfully!');
      setMessage("");
    } catch (error) {
      toast.error('Failed to send announcement.');
    }
  };

  return (
    <div className="announcement-container">
      <h2>Post an Announcement</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your announcement here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Send Announcement</button>
      </form>
    </div>
  );
};

export default Announcement;
