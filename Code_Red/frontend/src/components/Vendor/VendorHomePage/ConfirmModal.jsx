import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white/10 p-6 rounded-xl shadow-lg w-96 border border-purple-500 backdrop-blur-lg">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button className="btn btn-outline btn-error" onClick={onClose}>Cancel</button>
          <button className="btn btn-success" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
