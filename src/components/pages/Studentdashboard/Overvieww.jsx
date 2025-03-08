import React, { useState } from 'react';
import QRCode from "react-qr-code";
import './Overvieww.css';

function Overvieww() {
    const [qrCode, setQrCode] = useState(null);
    const studentData = { name: "John Doe", meal: "Rice & Chicken", credits: 10 };

    const generateQRCode = () => {
        const qrData = JSON.stringify(studentData);
        setQrCode(qrData);
    };

    return (
        <div className="overview-all">
            <h1 className='overview-name'>Welcome back Yusuf!</h1>
            <div className="overview">
            <h2>Dashboard Overview</h2>
            <p>Total Meal Credits: {studentData.credits}</p>
            <button className="generate-btn" onClick={generateQRCode}>
                Generate QR Code
            </button>
            {/* ✅ Corrected QRCode usage */}
            {qrCode && <QRCode value={qrCode} size={200} className="qr-code" />}

            </div>
        </div>
    );
}

export default Overvieww;
