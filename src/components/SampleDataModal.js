import React from "react";
import PropTypes from "prop-types";

const SampleDataModal = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  const sampleSets = [
    { id: 0, name: "Sample Set 1", desc: "4 processes - Basic example" },
    { id: 1, name: "Sample Set 2", desc: "5 processes - Varied burst times" },
    { id: 2, name: "Sample Set 3", desc: "4 processes - Different arrivals" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-5 max-w-md w-[90%] mx-4 animate-scale-in">
        <h3 className="text-lg font-bold text-slate-200 mb-4">Select Sample Data</h3>
        <div className="flex flex-col gap-2 mb-4">
          {sampleSets.map((set) => (
            <button
              key={set.id}
              onClick={() => onSelect(set.id)}
              className="text-left px-4 py-3 bg-slate-900 hover:bg-slate-700 border border-slate-600 rounded-md transition-all duration-200"
            >
              <div className="font-semibold text-slate-200 text-sm">{set.name}</div>
              <div className="text-xs text-slate-400 mt-1">{set.desc}</div>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-sm font-semibold bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

SampleDataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SampleDataModal;
