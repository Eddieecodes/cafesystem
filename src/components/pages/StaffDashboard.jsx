import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { FaQrcode } from "react-icons/fa";
import config from "../../config";
import "./StaffDashBoard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StaffDashboard() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 10,
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.PDF_417,
      ],
    });

    scanner.render(handleSuccess, handleError);

    function handleSuccess(decodedText) {
      sendScanDataToBackend(decodedText);
      scanner.clear(); // Stop scanning after success
    }

    function handleError(err) {
      console.error("Scanning error:", err);
    }

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const sendScanDataToBackend = async (qrData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const response = await fetch(`${config.BASE_URL}/scan/scan`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrData }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setScanResult(data); // ✅ Store entire response properly
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error scanning:", error);
      setError("Error scanning ticket");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isStaff");
    window.location.href = "/login";
  };

  const handleScanAgain = () => {
    setScanResult(null);
    setError(null);
    window.location.reload(); // ✅ Reload page to restart scanner
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target.result;
        await sendScanDataToBackend(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="staff-dashboard">
      <h1>Staff Dashboard</h1>

      {!scanResult ? (
        <div>
          <div id="reader" className="qr-reader"></div>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
          />
        </div>
      ) : (
        <div className="ticket-info">
          <p>{scanResult.message}</p>
          <p>User: {scanResult.user?.name || "Unknown"}</p>
          <p>Credits: {scanResult.user?.credits ?? "N/A"}</p>
          <p>Meal: {scanResult.meal?.name || "N/A"}</p>
         
          <button onClick={handleScanAgain} className="scan-again-btn">
            <FaQrcode /> Scan Again
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default StaffDashboard;
