import React, { useState, useEffect } from 'react';
import config from '../../../config';
import './StudentProfile.css';

function StudentProfile() {
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        matric: "",
        department: "",
        mealPlan: "",
        email: "",
    });

    const [receipt, setReceipt] = useState(null);
    const [message, setMessage] = useState('');
    const [extractedText, setExtractedText] = useState('');

    useEffect(() => {
        // Fetch student profile data from backend
        const fetchStudentInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Unauthorized');
                return;
            }

            try {
                const response = await fetch(`${config.BASE_URL}/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStudentInfo({
                        name: data.name,
                        matric: data.studentDetails.matricNumber,
                        department: data.studentDetails.department,
                        mealPlan: data.studentDetails.mealPlan,
                        email: data.email,
                    });
                } else {
                    alert('Failed to fetch student profile.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        };

        fetchStudentInfo();
    }, []);

    const handleFileChange = (e) => {
        setReceipt(e.target.files[0]);
    };

    const handleReceiptUpload = async (e) => {
        e.preventDefault();
        if (!receipt) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('receipt', receipt);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.BASE_URL}/receipt/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setExtractedText(data.extractedText);
            } else {
                setMessage('Failed to upload receipt.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessage('Failed to upload receipt.');
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
                    disabled 
                />

                <label>Matric Number:</label>
                <input 
                    type="text" 
                    name="matric" 
                    value={studentInfo.matric} 
                    disabled 
                />

                <label>Department:</label>
                <input 
                    type="text" 
                    name="department" 
                    value={studentInfo.department} 
                    disabled 
                />

                <label>Meal Plan:</label>
                <input 
                    type="text" 
                    name="mealPlan" 
                    value={studentInfo.mealPlan} 
                    disabled 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={studentInfo.email} 
                    disabled 
                />

                <form onSubmit={handleReceiptUpload} className="upload-receipt-form">
                    <label>Upload Receipt:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange} 
                        required 
                    />
                    <button type="submit">Upload</button>
                    {message && <p>{message}</p>}
                    {extractedText && (
                        <div>
                            <h3>Extracted Text:</h3>
                            <p>{extractedText}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default StudentProfile;
