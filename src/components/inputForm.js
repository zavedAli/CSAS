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
  selectedAlgorithm, // Add this prop to determine if Priority Algorithm is selected
}) => {
  const [process, setProcess] = useState({
    id: nextProcessId,
    name: "",
    arrivalTime: "",
    burstTime: "",
    priority: "", // Add priority to the process state
  });

  useEffect(() => {
    setProcess((prevProcess) => ({
      ...prevProcess,
      priority: "", // Reset priority when selectedAlgorithm changes
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
    <div className=" shadow-md process-input-form text-[#242424] w-full bg-[#b3b3b3] rounded-[30px] justify-center">
      <form
        className="flex flex-col gap-4 justify-start p-1 sm:p-6 border-[1px] border-inherit mx-2 font-bold sm:mx-10 mt-10 mb-6 rounded"
        onSubmit={handleSubmit}
      >
        <label className="flex justify-start gap-6">
          <span className="flex justify-start w-1/3">Process Name:</span>

          <input
            className="w-full border-[1px] border-inherit rounded"
            type="text"
            name="name"
            value={process.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-start gap-6">
          <span className="flex justify-start w-1/3">Arrival Time:</span>
          <input
            className="w-full border-[1px] border-inherit rounded"
            type="number"
            name="arrivalTime"
            value={process.arrivalTime}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex justify-start gap-6">
          <span className="flex justify-start w-1/4">Burst Time:</span>

          <input
            className="w-full border-[1px] border-inherit rounded"
            type="number"
            name="burstTime"
            value={process.burstTime}
            onChange={handleChange}
            required
          />
        </label>
        {selectedAlgorithm === "Priority" && (
          <label className="flex justify-start gap-6">
            <span className="flex justify-start w-1/4">Priority Value:</span>
            <input
              className="w-full border-[1px] border-inherit rounded"
              type="number"
              name="priority"
              value={process.priority}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button
          className="p-2 font-normal text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/4 rounded-lg text-white m-auto"
          type="submit"
          disabled={isStarted}
        >
          Add Process
        </button>
      </form>
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
  selectedAlgorithm: PropTypes.string.isRequired, // Add this prop type
};

export default ProcessInputForm;
