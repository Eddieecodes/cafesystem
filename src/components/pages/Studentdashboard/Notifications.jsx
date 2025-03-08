import React, { useState } from 'react';
import './Notifications.css';

function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Meals will be served outside today.", sender: "Admin", date: "March 5, 2025", day: "Wednesday", read: false },
        { id: 2, message: "Cafeteria closes at 8 PM today.", sender: "Admin", date: "March 4, 2025", day: "Tuesday", read: true },
        { id: 3, message: "New meal options available from next week.", sender: "Admin", date: "March 3, 2025", day: "Monday", read: false },
    ]);

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    return (
        <div className="notifications-container">
            <h2 className="notifications-title">Notifications</h2>
            <div className="notification-section">
                <h3>Unread Notifications</h3>
                <ul className="notification-list">
                    {notifications.filter(n => !n.read).length > 0 ? (
                        notifications.filter(n => !n.read).map((note) => (
                            <li key={note.id} className="notification-item unread" onClick={() => markAsRead(note.id)}>
                                <p><strong>{note.message}</strong></p>
                                <p className="notification-meta">{note.day}, {note.date} • Sent by {note.sender}</p>
                            </li>
                        ))
                    ) : (
                        <p className="no-notifications">No unread notifications.</p>
                    )}
                </ul>
            </div>

            <div className="notification-section">
                <h3>Read Notifications</h3>
                <ul className="notification-list">
                    {notifications.filter(n => n.read).length > 0 ? (
                        notifications.filter(n => n.read).map((note) => (
                            <li key={note.id} className="notification-item read">
                                <p>{note.message}</p>
                                <p className="notification-meta">{note.day}, {note.date} • Sent by {note.sender}</p>
                            </li>
                        ))
                    ) : (
                        <p className="no-notifications">No read notifications.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Notifications;
