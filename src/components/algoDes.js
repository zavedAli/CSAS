// src/components/AlgorithmDetails.js
import React from "react";
import PropTypes from "prop-types";
import algorithmInfo from "../info/algoInfo.json";
import "./css/algoDes.css";

const AlgorithmDetails = ({ selectedAlgorithm, onSelectChange }) => {
  const algorithm = algorithmInfo.algorithms.find(
    (algo) => algo.name === selectedAlgorithm
  );

  return (
    <div className="algorithm-details">
      <div className="flex items-center gap-3 mb-2">
        <label className="font-semibold text-slate-300 text-xs">Algorithm:</label>
        <select
          value={selectedAlgorithm}
          onChange={onSelectChange}
          className="flex-1 px-2 py-1.5 text-xs border border-slate-600 rounded-md bg-slate-900 font-medium text-slate-300 cursor-pointer hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-all"
        >
          <option value="">Choose an Algorithm</option>
          <optgroup label="Non-Preemptive" className="bg-slate-800 text-slate-300">
            <option value="FCFS">FCFS (First Come First Serve)</option>
            <option value="SJF">SJF (Shortest Job First)</option>
            <option value="Priority">Priority Scheduling</option>
          </optgroup>
          <optgroup label="Preemptive" className="bg-slate-800 text-slate-300">
            <option value="SRTF">SRTF (Shortest Remaining Time First)</option>
            <option value="RR">Round Robin</option>
          </optgroup>
        </select>
      </div>

      {algorithm && (
        <>
          <h2>{algorithm.name} Algorithm</h2>
          <p>
            <strong>Description:</strong> {algorithm.description}
          </p>
          <h3>Example:</h3>
          <ul>
            <h5>{algorithm.example.subDes}</h5>
            {algorithm.example.processes.map((process) => (
              <li key={process.id}>
                Process ID: {process.id}, Arrival Time: {process.arrivalTime}, Burst
                Time: {process.burstTime}, Priority: {process.priority || "N/A"}
              </li>
            ))}
          </ul>
          <h3>Execution Order:</h3>
          <p>{Array.isArray(algorithm.example.executionOrder) 
            ? algorithm.example.executionOrder.join(" -> ") 
            : algorithm.example.executionOrder}</p>
        </>
      )}
      
      {!algorithm && (
        <p className="text-slate-500 text-center py-2">Select an algorithm to see details.</p>
      )}
    </div>
  );
};

AlgorithmDetails.propTypes = {
  selectedAlgorithm: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
};

export default AlgorithmDetails;
