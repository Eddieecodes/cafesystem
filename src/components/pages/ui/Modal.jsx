import React from "react";
import "./ui.css"; 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
