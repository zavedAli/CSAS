// src/components/AlgorithmDetails.js
import React from "react";
import PropTypes from "prop-types";
import algorithmInfo from "../info/algoInfo.json"; // Adjust the path if necessary
import "./css/algoDes.css"; // Optional: create a CSS file for styling

const AlgorithmDetails = ({ selectedAlgorithm }) => {
  console.log(selectedAlgorithm);
  const algorithm = algorithmInfo.algorithms.find(
    (algo) => algo.name === selectedAlgorithm
  );

  if (!algorithm) return <p>Select an algorithm to see details.</p>;

  return (
    <div className="algorithm-details">
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
      <p>{algorithm.example.executionOrder.join(" -> ")}</p>
    </div>
  );
};

AlgorithmDetails.propTypes = {
  selectedAlgorithm: PropTypes.string.isRequired,
};

export default AlgorithmDetails;
