import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
    // Fetch details from localStorage or API (Simulating stored login details)
    const storedEmployeeNo = localStorage.getItem("employeeNo") || "EMP12345";
    const storedPassword = localStorage.getItem("password") || "********";

    const [employeeNo] = useState(storedEmployeeNo);
    const [password, setPassword] = useState(storedPassword);
    const [email, setEmail] = useState(localStorage.getItem("email") || "");

    useEffect(() => {
        // Load existing details on mount
        setEmail(localStorage.getItem("email") || "");
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        alert("Profile Updated Successfully!");
    };

    return (
        <div className="profile-container">
            <h2>Admin Profile</h2>
            <form onSubmit={handleSave}>
                <div className="profile-item">
                    <label>Employee Number</label>
                    <input type="text" value={employeeNo} disabled />
                </div>

                <div className="profile-item">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="profile-item">
                    <label>School Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter school email" />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Profile;
