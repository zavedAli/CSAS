// src/components/ProcessList.js
import React from "react";
import PropTypes from "prop-types";
import "./css/processList.css";

const ProcessList = ({ processes }) => {
  return (
<<<<<<< HEAD
    <div className="process-list flex m-auto flex-col w-full">
      <h2 className="text-lg font-semibold text-slate-700 px-3 py-2">
        Processes
      </h2>
      <div className="h-[1px] bg-slate-300 w-full mb-2"></div>
=======
    <div className="process-list flex m-auto flex-col">
      <h2 className="flex gap-4 text-center sm:text-start text-[30px] sm:text-[25px] text-[#414040]  items-center ps-[10px]">
        Processes
      </h2>
      <div className="h-[1px] bg-[#9b9b9b] w-full mb-4"></div>
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
<<<<<<< HEAD
            <th>Arrival</th>
            <th>Burst</th>
=======
            <th>Arrival Time</th>
            <th>Burst Time</th>
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
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
<<<<<<< HEAD
      priority: PropTypes.number,
=======
      priority: PropTypes.number, // Add priority as an optional field
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
    })
  ).isRequired,
};

export default ProcessList;
