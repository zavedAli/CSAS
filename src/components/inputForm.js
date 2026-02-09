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
<<<<<<< HEAD
  selectedAlgorithm,
  timeQuantum,
  onTimeQuantumChange,
=======
  selectedAlgorithm, // Add this prop to determine if Priority Algorithm is selected
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
}) => {
  const [process, setProcess] = useState({
    id: nextProcessId,
    name: "",
    arrivalTime: "",
    burstTime: "",
<<<<<<< HEAD
    priority: "",
=======
    priority: "", // Add priority to the process state
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
  });

  useEffect(() => {
    setProcess((prevProcess) => ({
      ...prevProcess,
<<<<<<< HEAD
      priority: "",
=======
      priority: "", // Reset priority when selectedAlgorithm changes
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
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
<<<<<<< HEAD
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
=======
    <div className=" shadow-md process-input-form text-[#242424] w-full bg-[#b3b3b3] rounded-[30px] justify-center">
      <form
        className="flex flex-col gap-4 justify-start p-1 sm:p-6 border-[1px] border-inherit mx-2 font-bold sm:mx-10 mt-10 mb-6 rounded"
        onSubmit={handleSubmit}
      >
        <label className="flex justify-start gap-6">
          <span className="flex justify-start w-1/3">Process Name:</span>

          <input
            className="w-full border-[1px] border-inherit rounded"
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
            type="text"
            name="name"
            value={process.name}
            onChange={handleChange}
            required
          />
        </label>
<<<<<<< HEAD
        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-700 w-28">Arrival Time:</span>
          <input
            className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
=======
        <label className="flex justify-start gap-6">
          <span className="flex justify-start w-1/3">Arrival Time:</span>
          <input
            className="w-full border-[1px] border-inherit rounded"
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
            type="number"
            name="arrivalTime"
            value={process.arrivalTime}
            onChange={handleChange}
            required
          />
        </label>
<<<<<<< HEAD
        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-700 w-28">Burst Time:</span>
          <input
            className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
=======
        <label className="flex justify-start gap-6">
          <span className="flex justify-start w-1/4">Burst Time:</span>

          <input
            className="w-full border-[1px] border-inherit rounded"
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
            type="number"
            name="burstTime"
            value={process.burstTime}
            onChange={handleChange}
            required
          />
        </label>
        {selectedAlgorithm === "Priority" && (
<<<<<<< HEAD
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-slate-700 w-28">Priority Value:</span>
            <input
              className="flex-1 px-3 py-1.5 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700"
=======
          <label className="flex justify-start gap-6">
            <span className="flex justify-start w-1/4">Priority Value:</span>
            <input
              className="w-full border-[1px] border-inherit rounded"
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
              type="number"
              name="priority"
              value={process.priority}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button
<<<<<<< HEAD
          className="mt-1 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white mx-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
=======
          className="p-2 font-normal text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/4 rounded-lg text-white m-auto"
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
          type="submit"
          disabled={isStarted}
        >
          Add Process
        </button>
      </form>
<<<<<<< HEAD
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
=======
      <div className="flex justify-center w-full mb-7">
        {!isStarted ? (
          <button
            onClick={onStart}
            className="p-2 text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/6 rounded-lg text-white text-center m-auto"
          >
            Start
          </button>
        ) : (
          <button
            className="p-2 text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/6 rounded-lg text-white m-auto mb-5"
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
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
<<<<<<< HEAD
  selectedAlgorithm: PropTypes.string.isRequired,
  timeQuantum: PropTypes.number,
  onTimeQuantumChange: PropTypes.func,
=======
  selectedAlgorithm: PropTypes.string.isRequired, // Add this prop type
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
};

export default ProcessInputForm;
