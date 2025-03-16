import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import config from "../../../config";
import "./StudentProfile.css";

function StudentProfile() {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    matric: "",
    department: "",
    mealPlan: "",
    email: "",
    verified: false,
  });

  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch student profile
  useEffect(() => {
    const fetchStudentInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Unauthorized");
        return;
      }

      try {
        const response = await fetch(`${config.BASE_URL}/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStudentInfo({
            name: data.name,
            matric: data.studentDetails.matricNumber,
            department: data.studentDetails.department,
            mealPlan: data.studentDetails.mealPlan,
            email: data.email,
            verified: data.verified,
          });
        } else {
          const errorData = await response.json();
          if (errorData.message === "Token expired") {
            localStorage.removeItem("token");
            navigate('/login');
          } else {
            setMessage("Failed to fetch student profile.");
          }
        }
      } catch (error) {
        setMessage("An error occurred while fetching profile.");
      }
    };

    fetchStudentInfo();
  }, [navigate]);

  // Handle file change
  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  // Handle receipt upload
  const handleReceiptUpload = async (e) => {
    e.preventDefault();

    if (!receipt) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", receipt);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("${config.BASE_URL}/receipt/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setShowModal(true);
      } else {
        setMessage(data.message || "Failed to upload receipt.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload receipt.");
    }
  };

  return (
    <div className="student-profile">
      <h2>Student Profile</h2>
      <div className="profile-container">
        <label>Name:</label>
        <input type="text" value={studentInfo.name} disabled />

        <label>Matric Number:</label>
        <input type="text" value={studentInfo.matric} disabled />

        <label>Department:</label>
        <input type="text" value={studentInfo.department} disabled />

        <label>Meal Plan:</label>
        <input type="text" value={studentInfo.mealPlan} disabled />

        <label>Email:</label>
        <input type="email" value={studentInfo.email} disabled />

        {studentInfo.verified && (
          <div className="verified-check">
            <span>Verified</span>
            <span className="checkmark">✔️</span>
          </div>
        )}
      </div>

      <form onSubmit={handleReceiptUpload} className="upload-receipt-form">
        <label>Upload Receipt:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="upload-btn" type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
