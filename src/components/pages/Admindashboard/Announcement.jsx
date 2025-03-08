import React, { useState } from "react";
import "./Announcement.css";

const Announcement = ({ onSendAnnouncement }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newAnnouncement = {
      message,
      timestamp: new Date().toLocaleString(),
    };

    onSendAnnouncement(newAnnouncement);
    setMessage("");
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
