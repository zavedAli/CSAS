// src/components/ProcessInputForm.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./css/inputForm.css";

const ProcessInputForm = ({
  onAddProcess,
  nextProcessId,
  onStart,
  onReset,
  isStarted,
}) => {
  const [process, setProcess] = useState({
    id: nextProcessId,
    name: "",
    arrivalTime: "",
    burstTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (process.name && process.arrivalTime && process.burstTime) {
      onAddProcess({
        ...process,
        arrivalTime: parseInt(process.arrivalTime),
        burstTime: parseInt(process.burstTime),
      });
      setProcess({
        id: nextProcessId + 1,
        name: "",
        arrivalTime: "",
        burstTime: "",
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
};

export default ProcessInputForm;
