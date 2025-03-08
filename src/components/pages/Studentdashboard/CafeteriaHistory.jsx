import React from 'react';
import './CafeteriaHistory.css';

function CafeteriaHistory() {
    const history = [
        {
            date: "March 1, 2025",
            time: "08:30 AM",
            meal: "Pasta & Sauce",
            mealType: "Breakfast",
            student: { name: "John Doe", matricNo: "BU/22/1234", course: "Computer Science" }
        },
        {
            date: "March 2, 2025",
            time: "01:00 PM",
            meal: "Jollof Rice & Chicken",
            mealType: "Lunch",
            student: { name: "Jane Smith", matricNo: "BU/22/5678", course: "Software Engineering" }
        }
    ];

    return (
        <div className="cafeteria-history-container">
            <h2 className="history-title">Cafeteria History</h2>
            {history.length > 0 ? (
                <ul className="history-list">
                    {history.map((item, index) => (
                        <li key={index} className="history-item">
                            <div className="history-details">
                                <p><strong>Date:</strong> {item.date}</p>
                                <p><strong>Time:</strong> {item.time}</p>
                                <p><strong>Meal:</strong> {item.meal} ({item.mealType})</p>
                            </div>
                            <div className="student-details">
                                <p><strong>Name:</strong> {item.student.name}</p>
                                <p><strong>Matric No:</strong> {item.student.matricNo}</p>
                                <p><strong>Course:</strong> {item.student.course}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-history">No cafeteria history available.</p>
            )}
        </div>
    );
}

export default CafeteriaHistory;
