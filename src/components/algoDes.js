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
      <div className="flex items-center gap-3 mb-3">
        <label className="font-semibold text-slate-700 text-sm">Select Algorithm:</label>
        <select
          value={selectedAlgorithm}
          onChange={onSelectChange}
          className="flex-1 px-3 py-2 text-sm border-2 border-slate-200 rounded-lg bg-slate-50 font-medium text-slate-700 cursor-pointer hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        >
          <option value="">Choose an Algorithm</option>
          <option value="FCFS">FCFS (First Come First Serve)</option>
          <option value="SJF">SJF (Shortest Job First)</option>
          <option value="SRTF">SRTF (Shortest Remaining Time First)</option>
          <option value="Priority">Priority Scheduling</option>
          <option value="RR">Round Robin</option>
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
        <p className="text-slate-500 text-center py-4">Select an algorithm to see details.</p>
      )}
    </div>
  );
};

AlgorithmDetails.propTypes = {
  selectedAlgorithm: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
};

export default AlgorithmDetails;
