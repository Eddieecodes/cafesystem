import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function ForgotPassword() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Forgotten Password?</h2>
                <p className="forgot-text">Don't fret, we got you covered.</p>

                <form className="auth-form">
                    <input type="email" placeholder="Enter your school email" required />
                    <button type="submit">Reset Password</button>
                </form>

                <p className="auth-toggle">
                    Remembered your password? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
