// src/components/ProcessList.js
import React from "react";
import PropTypes from "prop-types";
import "./css/processList.css";

const ProcessList = ({ processes }) => {
  return (
    <div className="process-list">
      <h2>Processes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td>{process.id}</td>
              <td>{process.name}</td>
              <td>{process.arrivalTime}</td>
              <td>{process.burstTime}</td>
              <td>
                {process.priority !== undefined ? process.priority : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProcessList.propTypes = {
  processes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      arrivalTime: PropTypes.number.isRequired,
      burstTime: PropTypes.number.isRequired,
      priority: PropTypes.number, // Add priority as an optional field
    })
  ).isRequired,
};

export default ProcessList;
