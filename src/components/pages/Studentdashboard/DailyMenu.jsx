import React, { useState, useEffect } from 'react';
import config from '../../../config';
import './DailyMenu.css';

function DailyMenu() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        // Fetch available meals from backend
        const fetchMeals = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Unauthorized');
                return;
            }

            try {
                const response = await fetch(`${config.BASE_URL}/feedback/meals`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMenu(data);
                } else {
                    alert('Failed to fetch meals.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        };

        fetchMeals();
    }, []);

    const formatTimeFrame = (timeFrame) => {
        switch (timeFrame) {
            case 'B':
                return 'Breakfast';
            case 'L':
                return 'Lunch';
            case 'S':
                return 'Supper';
            default:
                return '';
        }
    };

    return (
        <div className="daily-menu">
            <h2>Daily Menu</h2>
            <div className="menu-list">
                {menu.length > 0 ? (
                    menu.map((meal) => (
                        <div key={meal._id} className="menu-item">
                            <h3>{meal.name}</h3>
                            <p>{meal.description}</p>
                            <p><strong>Time Frame:</strong> {formatTimeFrame(meal.timeFrame)}</p>
                            <p><strong>Date:</strong> {new Date(meal.date).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-menu">No meals available today</p>
                )}
            </div>
        </div>
    );
}

export default DailyMenu;

