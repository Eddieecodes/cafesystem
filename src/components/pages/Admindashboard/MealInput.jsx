import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import './MealInput.css';

function MealInput() {
    const [mealName, setMealName] = useState('');
    const [description, setDescription] = useState('');
    const [timeFrame, setTimeFrame] = useState('');
    const [specialDiet, setSpecialDiet] = useState(false);
    const [dietDetails, setDietDetails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Unauthorized');
            return;
        }

        try {
            const response = await axios.post(`${config.BASE_URL}/feedback/meals`, { name: mealName, description, timeFrame }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Meal Added Successfully');
        } catch (error) {
            alert('Failed to add meal.');
        }
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
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Time Frame</label>
                    <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} required>
                        <option value="">Select Time Frame</option>
                        <option value="B">Breakfast</option>
                        <option value="L">Lunch</option>
                        <option value="S">Supper</option>
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
