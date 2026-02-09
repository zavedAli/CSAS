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
  onLoadSample,
  processes,
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
    <div className="shadow-xl process-input-form text-slate-200 w-full bg-slate-800 border border-slate-700 rounded-lg">
      <form
        className="flex flex-col gap-2 justify-start p-3 mx-3 mt-3 mb-2 rounded-lg bg-slate-900 border border-slate-700"
        onSubmit={handleSubmit}
      >
        {selectedAlgorithm === "RR" && (
          <label className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-300 w-28">Time Quantum:</span>
            <input
              className="flex-1 px-2 py-1.5 border border-slate-600 rounded-md text-xs font-medium text-slate-200 bg-slate-800"
              type="number"
              min="1"
              value={timeQuantum}
              onChange={(e) => onTimeQuantumChange(parseInt(e.target.value))}
              disabled={isStarted}
            />
          </label>
        )}
        <label className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-300 w-28">Process Name:</span>
          <input
            className="flex-1 px-2 py-1.5 border border-slate-600 rounded-md text-xs font-medium text-slate-200 bg-slate-800"
            type="text"
            name="name"
            value={process.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-300 w-28">Arrival Time:</span>
          <input
            className="flex-1 px-2 py-1.5 border border-slate-600 rounded-md text-xs font-medium text-slate-200 bg-slate-800"
            type="number"
            name="arrivalTime"
            value={process.arrivalTime}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-300 w-28">Burst Time:</span>
          <input
            className="flex-1 px-2 py-1.5 border border-slate-600 rounded-md text-xs font-medium text-slate-200 bg-slate-800"
            type="number"
            name="burstTime"
            value={process.burstTime}
            onChange={handleChange}
            required
          />
        </label>
        {selectedAlgorithm === "Priority" && (
          <label className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-300 w-28">Priority Value:</span>
            <input
              className="flex-1 px-2 py-1.5 border border-slate-600 rounded-md text-xs font-medium text-slate-200 bg-slate-800"
              type="number"
              name="priority"
              value={process.priority}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button
          className="mt-1 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 rounded-md text-white mx-auto shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isStarted}
        >
          Add Process
        </button>
      </form>
      <div className="flex justify-center gap-2 w-full mb-3 px-3">
        <button
          onClick={onLoadSample}
          disabled={isStarted}
          className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-md text-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Load Sample
        </button>
        {!isStarted ? (
          <button
            onClick={onStart}
            className="px-4 py-1.5 text-xs font-semibold bg-green-600 hover:bg-green-700 rounded-md text-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedAlgorithm || processes.length === 0}
            title={!selectedAlgorithm ? "Select an algorithm first" : processes.length === 0 ? "Add processes first" : "Start simulation"}
          >
            Start
          </button>
        ) : (
          <button
            className="px-4 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 rounded-md text-white shadow-md transition-all duration-200"
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
  onLoadSample: PropTypes.func.isRequired,
  processes: PropTypes.array,
};

export default ProcessInputForm;
