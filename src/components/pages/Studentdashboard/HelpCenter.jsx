import React, { useState, useEffect } from 'react';
import config from '../../../config';
import './HelpCenter.css';
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  


function HelpCenter() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        // Fetch student ID from backend
        const fetchStudentId = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Unauthorized');
                return;
            }

            try {
                const response = await fetch(`${config.BASE_URL}/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStudentId(data._id);
                } else {
                    toast.error('Failed to fetch student ID.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
            }
        };

        fetchStudentId();
    }, []);

    const handleSubmit = async () => {
        if (message.trim() !== "") {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Unauthorized');
                return;
            }

            try {
                const response = await fetch(`${config.BASE_URL}/feedback/feedback`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ studentId, feedback: message }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages([...messages, { text: message, date: new Date().toLocaleString() }]);
                    setMessage("");
                    toast.success(data.message);
                } else {
                    toast.error('Failed to submit feedback.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="help-center-container">
            <h2 className="help-title">Help Center</h2>
            <p className="help-description">Submit your feedback or complaints below:</p>
            
            <div className="help-form">
                <textarea 
                    className="help-textarea" 
                    placeholder="Write your feedback..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="help-submit" onClick={handleSubmit}>Submit</button>
            </div>

            {messages.length > 0 && (
                <div className="help-messages">
                    <h3>Submitted Feedback</h3>
                    {messages.map((msg, index) => (
                        <div key={index} className="help-message">
                            <p>{msg.text}</p>
                            <span className="help-date">{msg.date}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HelpCenter;

