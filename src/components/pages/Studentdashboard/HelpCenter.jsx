import React, { useState } from 'react';
import './HelpCenter.css';

function HelpCenter() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSubmit = () => {
        if (message.trim() !== "") {
            setMessages([...messages, { text: message, date: new Date().toLocaleString() }]);
            setMessage("");
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

