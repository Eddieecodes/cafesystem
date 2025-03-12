import React, { useState, useEffect } from 'react';
import './StudentProfile.css';

function StudentProfile() {
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        matric: "",
        course: "",
        mealType: "",
        level: "",
        email: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [receipt, setReceipt] = useState(null);

    useEffect(() => {
        // Fetch student profile data from backend
        const fetchStudentInfo = async () => {
            try {
                const response = await fetch('https://caf-system.onrender.com/student/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStudentInfo(data);
                } else {
                    alert('Failed to fetch student profile.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        };

        fetchStudentInfo();
    }, []);

    const handleChange = (e) => {
        setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
    };

    const handleEditToggle = async () => {
        if (isEditing) {
            // Save changes to backend
            try {
                const response = await fetch('https://caf-system.onrender.com/student/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(studentInfo),
                });
                if (!response.ok) {
                    alert('Failed to save profile changes.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        }
        setIsEditing(!isEditing);
    };

    const handleReceiptUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('receipt', receipt);

        try {
            const response = await fetch('https://caf-system.onrender.com/student/upload-receipt', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            });
            if (response.ok) {
                alert('Receipt uploaded successfully.');
            } else {
                alert('Failed to upload receipt.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
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

               

                <form onSubmit={handleReceiptUpload} className="upload-receipt-form">
                    <label>Upload Receipt:</label>
                    <input 
                        type="file" 
                        onChange={(e) => setReceipt(e.target.files[0])} 
                        required 
                    />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
}

export default StudentProfile;
