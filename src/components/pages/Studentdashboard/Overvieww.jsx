import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import config from '../../../config';
import './Overvieww.css';
import { toast } from "react-toastify";

function Overvieww() {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [error, setError] = useState(null);
    const [studentData, setStudentData] = useState({ name: "", meal: "", credits: 0, verified: false });
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState("");

    useEffect(() => {
        // Fetch student data from backend
        const fetchStudentData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Unauthorized');
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
                    setStudentData(data);
                } else {
                    toast.error('Failed to fetch student data.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
            }
        };

        // Fetch available meals for the day
        const fetchMeals = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Unauthorized');
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
                    const today = new Date().setHours(0, 0, 0, 0);
                    const availableMeals = data.filter(meal => new Date(meal.date).setHours(0, 0, 0, 0) === today);
                    setMeals(availableMeals);
                } else {
                    toast.error('Failed to fetch meals.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
            }
        };

        fetchStudentData();
        fetchMeals();
    }, []);

    const generateQRCode = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Unauthorized');
            return;
        }

        try {
            const response = await fetch(`${config.BASE_URL}/tickets/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    mealId: selectedMeal,
                    email: studentData.email
                })
            });

            if (response.ok) {
                const data = await response.json();
                setQrCodeUrl(data.qrCodeUrl);
                setError(null);
                toast.success("QR Code generated successfully!");
            } else {
                let errorMessage = "An error occurred. Please try again.";
            
                try {
                    const errorData = await response.json();
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (error) {
                    console.error("Error parsing JSON response:", error);
                }
            
                setError(errorMessage);
                toast.error(errorMessage);
            }
            
        } catch (error) {
            setError('An error occurred. Please try again.');
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `${qrCodeUrl}`;
        link.download = 'qrcode.png';
        link.click();
    };

    return (
        <div className="overview-all">
            <h1 className='overview-name'>Welcome back <br></br>{studentData.name}!</h1>
            <div className="verified-check">
                {studentData.verified ? (
                    <>
                        <span>Verified</span>
                        <FaCheckCircle className="checkmark" />
                    </>
                ) : (
                    <span>Not Verified</span>
                )}
                <span className="credits">Credits: {studentData.credits}</span>
            </div>
            <div className="overview">
                <select 
                    value={selectedMeal} 
                    onChange={(e) => setSelectedMeal(e.target.value)} 
                    className="meal-select"
                >
                    <option value="">Select a meal</option>
                    {meals.map(meal => (
                        <option key={meal._id} value={meal._id}>{meal.name}</option>
                    ))}
                </select>
                <button className="generate-btn" onClick={generateQRCode} disabled={!selectedMeal}>
                    Generate QR Code
                </button>
                {error && <p className="error-message">{error}</p>}
                {qrCodeUrl && (
                    <div className="qr-code-container">
                        <p>QR Code generated successfully!</p>
                        <img src={`${qrCodeUrl}`} alt="QR Code" className="qr-code-image" />
                        <button className="download-btn" onClick={handleDownload}>Download QR Code</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Overvieww;
