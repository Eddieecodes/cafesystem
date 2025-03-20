import React, { useState, useEffect } from 'react';
import config from '../../../config';
import './Notifications.css';
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  


function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications from backend
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Unauthorized');
                return;
            }

            try {
                const response = await fetch(`${config.BASE_URL}/feedback/messages`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                   
                } else {
                    toast.error('Failed to fetch notifications.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification._id === id ? { ...notification, read: true } : notification
        ));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="notifications-container">
            <h2 className="notifications-title">Notifications</h2>
            <div className="notification-section">
                <h3>Unread Notifications</h3>
                <ul className="notification-list">
                    {notifications.filter(n => !n.read).length > 0 ? (
                        notifications.filter(n => !n.read).map((note) => (
                            <li key={note._id} className="notification-item unread" onClick={() => markAsRead(note._id)}>
                                <p><strong>{note.title}</strong></p>
                                <p>{note.content}</p>
                                <p className="notification-meta">{formatDate(note.date)}</p>
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
                            <li key={note._id} className="notification-item read">
                                <p><strong>{note.title}</strong></p>
                                <p>{note.content}</p>
                                <p className="notification-meta">{formatDate(note.date)}</p>
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
