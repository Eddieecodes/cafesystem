import React from 'react';
import './DailyMenu.css';

function DailyMenu() {
    const menu = ["Breakfast: Pancakes", "Lunch: Fried Rice", "Dinner: Grilled Fish"];

    return (
        <div className="daily-menu">
            <h2>Daily Menu</h2>
            <div className="menu-list">
                {menu.length > 0 ? (
                    menu.map((meal, index) => (
                        <div key={index} className="menu-item">
                            <span>{meal}</span>
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

