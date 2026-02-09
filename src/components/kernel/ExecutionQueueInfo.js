// src/components/ExecutionQueueInfo.js
import React from "react";
import PropTypes from "prop-types";
import "../css/executionQueue.css";

const ExecutionQueueInfo = ({
  currentTime,
  arrivedProcesses,
  waitingProcesses,
  executedProcessesInfo,
}) => {
  const totalBurstTime = executedProcessesInfo.reduce((sum, p) => sum + p.burstTime, 0);
  const cpuUtilization = currentTime > 0 ? ((totalBurstTime / currentTime) * 100).toFixed(2) : 0;

  return (
    <div className="current-info">
      <div className="current-time ">
        <strong>Current Time :</strong> {currentTime}
      </div>
      <div className="arrived-processes">
        <strong>Processes Arrived : </strong>
        {arrivedProcesses.map((process) => (
          <span key={process.id} className="arrived-process">
            {process.name} (ID: {process.id}),
          </span>
        ))}
      </div>
      <div className="waiting-processes text-gray-300">
        <strong>Processes Waiting : </strong>
        {waitingProcesses.map((process) => (
          <span key={process.id} className="waiting-process">
            {process.name} (ID: {process.id}),
          </span>
        ))}
      </div>
      <div className="executed-processes text-gray-300">
        <strong>Processes Executed : </strong>
        {executedProcessesInfo.map((process) => (
          <span key={process.id} className="executed-process">
            {process.name} (ID: {process.id}),
          </span>
        ))}
      </div>
      <div className="current-time">
        <strong>CPU Utilization :</strong> {cpuUtilization}%
      </div>
      </div>

  );
};

ExecutionQueueInfo.propTypes = {
  currentTime: PropTypes.number.isRequired,
  arrivedProcesses: PropTypes.array.isRequired,
  waitingProcesses: PropTypes.array.isRequired,
  executedProcessesInfo: PropTypes.array.isRequired,
};

export default ExecutionQueueInfo;
