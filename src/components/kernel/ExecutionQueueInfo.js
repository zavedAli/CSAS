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
  return (
    <div className="current-info">
      <div className="current-time">
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
      <div className="waiting-processes">
        <strong>Processes Waiting : </strong>
        {waitingProcesses.map((process) => (
          <span key={process.id} className="waiting-process">
            {process.name} (ID: {process.id}),
          </span>
        ))}
      </div>
      <div className="executed-processes">
        <strong>Processes Executed : </strong>
        {executedProcessesInfo.map((process) => (
          <span key={process.id} className="executed-process">
            {process.name} (ID: {process.id}),
          </span>
        ))}
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
