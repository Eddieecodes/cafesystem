import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ role, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    admin: [
      { path: "/admin", label: "Dashboard Overview" },
      { path: "/admin/students", label: "Student Management" },
      { path: "/admin/meals", label: "Meal Input" },
      { path: "/admin/announcement", label: "Announcement" },
      { path: "/admin/feedback", label: "Feedback" },
      { path: "/admin/settings", label: "Profile" },
    ],
    student: [
      { path: "/student", label: "Dashboard Overview" },
      { path: "/student/menu", label: "Daily menu" },
      { path: "/student/history", label: "Cafeteria History" },
      { path: "/student/notifications", label: "Notifications" },
      { path: "/student/help", label: "Help Center" },
      { path: "/student/profile", label: "Student Profile" },
    ],
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2 className="logo">Cafesystem</h2>
        <ul>
          <div className="menu-items">
            {menuItems[role]?.map((item, index) => (
              <li key={index}>
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </div>
          <div className="logout-section">
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
