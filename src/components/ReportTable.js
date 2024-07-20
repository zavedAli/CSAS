// src/components/ReportTable.js
import React from "react";
import PropTypes from "prop-types";
import "./css/reportTable.css";

const ReportTable = ({ processes }) => {
  const calculateAverages = () => {
    const totalProcesses = processes.length;
    const sums = processes.reduce(
      (acc, process) => {
        acc.arrivalTime += process.arrivalTime || 0;
        acc.burstTime += process.burstTime || 0;
        acc.completionTime += process.completionTime || 0;
        acc.waitingTime += process.waitingTime || 0;
        acc.turnaroundTime += process.turnaroundTime || 0;
        acc.responseTime += process.responseTime || 0;
        acc.executedTime += process.executedTime || 0;
        return acc;
      },
      {
        arrivalTime: 0,
        burstTime: 0,
        completionTime: 0,
        waitingTime: 0,
        turnaroundTime: 0,
        responseTime: 0,
        executedTime: 0,
      }
    );

    return {
      arrivalTime: (sums.arrivalTime / totalProcesses).toFixed(2),
      burstTime: (sums.burstTime / totalProcesses).toFixed(2),
      completionTime: (sums.completionTime / totalProcesses).toFixed(2),
      waitingTime: (sums.waitingTime / totalProcesses).toFixed(2),
      turnaroundTime: (sums.turnaroundTime / totalProcesses).toFixed(2),
      responseTime: (sums.responseTime / totalProcesses).toFixed(2),
      executedTime: (sums.executedTime / totalProcesses).toFixed(2),
    };
  };

  const averages = calculateAverages();

  return (
    <div className="report-table-container">
      <h3>Report Table</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>Process ID</th>
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
              <td>{process.arrivalTime}</td>
              <td>{process.burstTime}</td>
              <td>{process.completionTime}</td>
              <td>{process.waitingTime}</td>
              <td>{process.turnaroundTime}</td>
              <td>{process.responseTime}</td>
              <td>{process.executedTime}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Averages</td>
            <td>{averages.arrivalTime}</td>
            <td>{averages.burstTime}</td>
            <td>{averages.completionTime}</td>
            <td>{averages.waitingTime}</td>
            <td>{averages.turnaroundTime}</td>
            <td>{averages.responseTime}</td>
            <td>{averages.executedTime}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

ReportTable.propTypes = {
  processes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      arrivalTime: PropTypes.number,
      burstTime: PropTypes.number,
      completionTime: PropTypes.number,
      waitingTime: PropTypes.number,
      turnaroundTime: PropTypes.number,
      responseTime: PropTypes.number,
      executedTime: PropTypes.number,
    })
  ).isRequired,
};

export default ReportTable;
