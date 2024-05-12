import React, { useState } from 'react';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-container">
        <div className="confirmation-popup">
            <div className="confirmation-content">
                <p>{message}</p>
                <div className="button-container">
                <button className="cancel-btn" onClick={onCancel}>Cancel</button>                
                <button className="confirm-btn" onClick={onConfirm}>OK</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ConfirmationPopup;