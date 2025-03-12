import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import config from '../../../config';
import './Overvieww.css';

function Overvieww() {
    const [qrCode, setQrCode] = useState(null);
    const [error, setError] = useState(null);
    const [studentData, setStudentData] = useState({ name: "", meal: "", credits: 0 });

    useEffect(() => {
        // Fetch student data from backend
        const fetchStudentData = async () => {
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
                    setStudentData(data);
                } else {
                    alert('Failed to fetch student data.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        };

        fetchStudentData();
    }, []);

    const generateQRCode = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Unauthorized');
            return;
        }

        try {
            const response = await fetch(`${config.BASE_URL}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ mealId: 'mealIdPlaceholder' }), // Replace with actual meal ID
            });

            if (response.ok) {
                const data = await response.json();
                setQrCode(data.qrCode);
                setError(null);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="overview-all">
            <h1 className='overview-name'>Welcome back <br></br>{studentData.name}!</h1>
            <div className="overview">
                <h2>Dashboard Overview</h2>
                <p>Current Meal: {studentData.meal}</p>
                <button className="generate-btn" onClick={generateQRCode}>
                    Generate QR Code
                </button>
                {qrCode && <QRCode value={qrCode} size={200} className="qr-code" />}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default Overvieww;
