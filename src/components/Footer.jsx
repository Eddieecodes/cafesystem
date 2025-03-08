import React from "react";
import "../App.css";

function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join the Adventure newsletter to receive our best vacation deals
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <input type="email" className="footer-input" placeholder="Your Email" />
                    <button>Subscribe</button>
                </div>
            </section>
            <p>&copy; 2024 CafeSystem. All rights reserved.</p>
        </div>
    );
}

export default Footer;
