import React from "react";
import "./ui.css"; 

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`custom-button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
