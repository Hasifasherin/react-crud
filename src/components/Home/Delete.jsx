import React from "react";
import "./Modal.css";

const Delete = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Are you sure?</h3>
        <p>Do you want to delete this item?</p>

        <div className="modal-actions">
          <button
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>

          <button className="btn btn-secondary" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
