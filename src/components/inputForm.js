// src/components/ProcessInputForm.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./css/inputForm.css";

const ProcessInputForm = ({
  onAddProcess,
  nextProcessId,
  onStart,
  onReset,
  isStarted,
  selectedAlgorithm,
  timeQuantum,
  onTimeQuantumChange,
}) => {
  const [process, setProcess] = useState({
    id: nextProcessId,
    name: "",
    arrivalTime: "",
    burstTime: "",
    priority: "",
  });

  useEffect(() => {
    setProcess((prevProcess) => ({
      ...prevProcess,
      priority: "",
    }));
  }, [selectedAlgorithm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      process.name &&
      process.arrivalTime &&
      process.burstTime &&
      (selectedAlgorithm !== "Priority" || process.priority)
    ) {
      onAddProcess({
        ...process,
        arrivalTime: parseInt(process.arrivalTime),
        burstTime: parseInt(process.burstTime),
        priority:
          selectedAlgorithm === "Priority" ? parseInt(process.priority) : null,
      });
      setProcess({
        id: nextProcessId + 1,
        name: "",
        arrivalTime: "",
        burstTime: "",
        priority: "",
      });
    }
  };

  return (
    <div className="shadow-xl process-input-form text-slate-800 w-full bg-white rounded-2xl">
      <form
        className="flex flex-col gap-3 justify-start p-4 sm:p-5 mx-3 sm:mx-5 mt-4 mb-3 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200"
        onSubmit={handleSubmit}
      >
        {selectedAlgorithm === "RR" && (
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-slate-700 w-28">Time Quantum:</span>
            <input
              className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
              type="number"
              min="1"
              value={timeQuantum}
              onChange={(e) => onTimeQuantumChange(parseInt(e.target.value))}
              disabled={isStarted}
            />
          </label>
        )}
        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-700 w-28">Process Name:</span>
          <input
            className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
            type="text"
            name="name"
            value={process.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-700 w-28">Arrival Time:</span>
          <input
            className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
            type="number"
            name="arrivalTime"
            value={process.arrivalTime}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-700 w-28">Burst Time:</span>
          <input
            className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
            type="number"
            name="burstTime"
            value={process.burstTime}
            onChange={handleChange}
            required
          />
        </label>
        {selectedAlgorithm === "Priority" && (
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-slate-700 w-28">Priority Value:</span>
            <input
              className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
              type="number"
              name="priority"
              value={process.priority}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button
          className="mt-1 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white mx-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          type="submit"
          disabled={isStarted}
        >
          Add Process
        </button>
      </form>
      <div className="flex justify-center w-full mb-4">
        {!isStarted ? (
          <button
            onClick={onStart}
            className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Simulation
          </button>
        ) : (
          <button
            className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

ProcessInputForm.propTypes = {
  onAddProcess: PropTypes.func.isRequired,
  nextProcessId: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  selectedAlgorithm: PropTypes.string.isRequired,
  timeQuantum: PropTypes.number,
  onTimeQuantumChange: PropTypes.func,
};

export default ProcessInputForm;
