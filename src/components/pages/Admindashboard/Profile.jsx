import React, { useState, useEffect } from "react";
import axios from "axios";
import config from '../../../config';
import "./Profile.css";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  


const Profile = () => {
    const [adminInfo, setAdminInfo] = useState({
        name: "",
        email: "",
        role: "",
        createdAt: ""
    });
    const [password, setPassword] = useState("********");

    useEffect(() => {
        // Fetch admin profile data from backend
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Unauthorized');
                return;
            }

            try {
                const response = await axios.get(`${config.BASE_URL}/feedback/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;
                setAdminInfo({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    createdAt: new Date(data.createdAt).toLocaleDateString()
                });
            } catch (error) {
                toast.error('Failed to fetch profile data.');
            }
        };

        fetchProfile();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem("email", adminInfo.email);
        localStorage.setItem("password", password);
        toast.success("Profile Updated Successfully!");
    };

    return (
        <div className="profile-container">
            <h2>Admin Profile</h2>
            <form onSubmit={handleSave}>
                <div className="profile-item">
                    <label>Name</label>
                    <input type="text" value={adminInfo.name} disabled />
                </div>

                <div className="profile-item">
                    <label>Email</label>
                    <input type="email" value={adminInfo.email} disabled />
                </div>

                <div className="profile-item">
                    <label>Role</label>
                    <input type="text" value={adminInfo.role} disabled />
                </div>

                <div className="profile-item">
                    <label>Created At</label>
                    <input type="text" value={adminInfo.createdAt} disabled />
                </div>

                <div className="profile-item">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Profile;
