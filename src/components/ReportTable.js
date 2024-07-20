// src/components/ReportTable.js
import React from "react";
import PropTypes from "prop-types";
import "./css/reportTable.css";

const ReportTable = ({ processes }) => {
  console.log("from reportTable :", processes);
  return (
    <div className="report-table">
      <h3>Process Report</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Waiting Time</th>
            <th>Turnaround Time</th>
            <th>Response Time</th>
            <th>Executed Time</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td>{process.id}</td>
              <td>{process.name}</td>
              <td>{process.arrivalTime}</td>
              <td>{process.burstTime}</td>
              <td>{process.completionTime || "-"}</td>
              <td>{process.waitingTime || "-"}</td>
              <td>{process.turnaroundTime || "-"}</td>
              <td>{process.responseTime || "-"}</td>
              <td>{process.executedTime || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReportTable.propTypes = {
  processes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      arrivalTime: PropTypes.number.isRequired,
      burstTime: PropTypes.number.isRequired,
      completionTime: PropTypes.number,
      waitingTime: PropTypes.number,
      turnaroundTime: PropTypes.number,
      responseTime: PropTypes.number,
      executedTime: PropTypes.number,
    })
  ).isRequired,
};

export default ReportTable;
