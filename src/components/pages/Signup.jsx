import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

function Signup() {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        alert('Student signup will be implemented later.');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Student Sign Up</h2>

                <form className="auth-form" onSubmit={handleSignup}>
                    <input type="email" placeholder="School Email" required />
                    <input type="text" placeholder="Matric No" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <input type="file" required />
                    <button type="submit">Sign Up</button>
                </form>

                <p className="auth-toggle">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
