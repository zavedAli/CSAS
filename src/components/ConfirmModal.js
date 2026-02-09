import React from "react";
import PropTypes from "prop-types";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-[90%] sm:w-full mx-4 animate-scale-in">
        <h3 className="text-xl font-bold text-slate-800 mb-3">Confirm Action</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-sm font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Keep Processes
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmModal;
