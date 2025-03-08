import React, { useState } from 'react';
import './MealInput.css';

function MealInput() {
    const [mealName, setMealName] = useState('');
    const [day, setDay] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const [specialDiet, setSpecialDiet] = useState(false);
    const [dietDetails, setDietDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ mealName, day, timeRange, specialDiet, dietDetails });
        alert('Meal Added Successfully');
        // You can implement API calls here
    };

    return (
        <div className="meal-form-container">
            <h2>Add New Meal</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Meal Name</label>
                    <input
                        type="text"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Day</label>
                    <select value={day} onChange={(e) => setDay(e.target.value)} required>
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>
                <div>
                    <label>Time Range</label>
                    <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} required>
                        <option value="">Select Time Range</option>
                        <option value="9-12">9 AM - 12 PM</option>
                        <option value="12-3">12 PM - 3 PM</option>
                        <option value="5-8">5 PM - 8 PM</option>
                    </select>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={specialDiet}
                            onChange={() => setSpecialDiet(!specialDiet)}
                        /> Special Diet Meal?
                    </label>
                </div>
                {specialDiet && (
                    <div>
                        <label>Dietary Requirements</label>
                        <textarea
                            value={dietDetails}
                            onChange={(e) => setDietDetails(e.target.value)}
                            placeholder="Enter details for special diet meal..."
                            required
                        />
                    </div>
                )}
                <button type="submit">Add Meal</button>
            </form>
        </div>
    );
}

export default MealInput;
