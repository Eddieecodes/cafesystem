import React, { useState } from 'react';
import './StudentProfile.css';

function StudentProfile() {
    const [studentInfo, setStudentInfo] = useState({
        name: "John Doe",
        matric: "BU/21/04/1234",
        course: "Computer Science",
        mealType: "Breakfast and Dinner", // Non-editable
        level: "400",
        email: "johndoe@babcock.edu.ng",
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="student-profile">
            <h2>Student Profile</h2>
            <div className="profile-container">
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={studentInfo.name} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                />

                <label>Matric Number:</label>
                <input 
                    type="text" 
                    name="matric" 
                    value={studentInfo.matric} 
                    disabled 
                />

                <label>Course:</label>
                <input 
                    type="text" 
                    name="course" 
                    value={studentInfo.course} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                />

                <label>Meal Type:</label>
                <input 
                    type="text" 
                    name="mealType" 
                    value={studentInfo.mealType} 
                    disabled 
                />

                <label>Level:</label>
                <input 
                    type="text" 
                    name="level" 
                    value={studentInfo.level} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={studentInfo.email} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                />

                <button onClick={handleEditToggle} className="edit-btn">
                    {isEditing ? "Save" : "Edit Profile"}
                </button>
            </div>
        </div>
    );
}

export default StudentProfile;
