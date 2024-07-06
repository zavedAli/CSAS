// src/components/ProcessInputForm.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./css/inputForm.css";

const ProcessInputForm = ({ onAddProcess, nextProcessId, onStart }) => {
  const [name, setName] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");

  const handleAddProcess = () => {
    if (name && arrivalTime && burstTime) {
      const newProcess = {
        id: nextProcessId,
        name,
        arrivalTime: parseInt(arrivalTime),
        burstTime: parseInt(burstTime),
      };
      onAddProcess(newProcess);
      setName("");
      setArrivalTime("");
      setBurstTime("");
    }
  };

  return (
    <div className="process-input-form">
      <h2>Process Input Form</h2>
      <input
        type="text"
        placeholder="Process Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Arrival Time"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Burst Time"
        value={burstTime}
        onChange={(e) => setBurstTime(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleAddProcess}>Add Process</button>
        <button onClick={onStart}>Start</button>
      </div>
    </div>
  );
};

ProcessInputForm.propTypes = {
  onAddProcess: PropTypes.func.isRequired,
  nextProcessId: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
};

export default ProcessInputForm;
