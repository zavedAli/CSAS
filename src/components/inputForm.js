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
    <div className="process-input-form">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={process.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Arrival Time:
          <input
            type="number"
            name="arrivalTime"
            value={process.arrivalTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Burst Time:
          <input
            type="number"
            name="burstTime"
            value={process.burstTime}
            onChange={handleChange}
            required
          />
        </label>
        {selectedAlgorithm === "Priority" && (
          <label>
            Priority:
            <input
              type="number"
              name="priority"
              value={process.priority}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button type="submit" disabled={isStarted}>
          Add Process
        </button>
      </form>
      {!isStarted ? (
        <button onClick={onStart}>Start</button>
      ) : (
        <button onClick={onReset}>Reset</button>
      )}
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
