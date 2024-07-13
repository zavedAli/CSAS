// src/components/ExecutionQueue.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getNextProcess, getPreviousProcess } from "../algorithm/fcfs";
import { getNextProcessSJF, getPreviousProcessSJF } from "../algorithm/sjf";
import InfoBox from "./infoBox";
import "./css/executionQueue.css";

const ExecutionQueue = ({ processes, isStarted, selectedAlgorithm }) => {
  const [executedProcesses, setExecutedProcesses] = useState([]);
  const [scheduledProcesses, setScheduledProcesses] = useState([]);
  const [currentTime, setCurrentTime] = useState(0); // Track current time

  useEffect(() => {
    const scheduleProcesses = () => {
      let sortedProcesses;
      if (selectedAlgorithm === "SJF") {
        sortedProcesses = processes
          .slice()
          .sort(
            (a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime
          );
      } else {
        sortedProcesses = processes
          .slice()
          .sort((a, b) => a.arrivalTime - b.arrivalTime);
      }

      return sortedProcesses.map((process) => ({
        ...process,
        startTime: null,
        completionTime: null,
        waitingTime: null,
      }));
    };
    setScheduledProcesses(scheduleProcesses());
    setCurrentTime(0); // Reset current time on processes change
  }, [processes, selectedAlgorithm]);

  const handleNext = () => {
    let nextProcess;
    if (selectedAlgorithm === "SJF") {
      nextProcess = getNextProcessSJF(
        scheduledProcesses,
        executedProcesses,
        currentTime
      );
    } else {
      nextProcess = getNextProcess(
        scheduledProcesses,
        executedProcesses,
        currentTime
      );
    }

    if (nextProcess) {
      const newStartTime =
        executedProcesses.length === 0 ? nextProcess.arrivalTime : currentTime;
      const updatedProcesses = scheduledProcesses.map((process) =>
        process.id === nextProcess.id
          ? {
              ...process,
              startTime: newStartTime,
              completionTime: newStartTime + nextProcess.burstTime,
              waitingTime: newStartTime - process.arrivalTime,
            }
          : process
      );

      setScheduledProcesses(updatedProcesses);
      setExecutedProcesses([...executedProcesses, nextProcess.id]);
      setCurrentTime(newStartTime + nextProcess.burstTime);
    }
  };

  const handlePrevious = () => {
    const lastExecutedProcessId =
      executedProcesses[executedProcesses.length - 1];
    const lastExecutedProcess = scheduledProcesses.find(
      (process) => process.id === lastExecutedProcessId
    );

    const updatedProcesses = scheduledProcesses.map((process) =>
      process.id === lastExecutedProcessId
        ? {
            ...process,
            startTime: null,
            completionTime: null,
            waitingTime: null,
          }
        : process
    );

    setScheduledProcesses(updatedProcesses);
    setExecutedProcesses(executedProcesses.slice(0, -1));
    setCurrentTime(
      executedProcesses.length === 1
        ? 0
        : currentTime - lastExecutedProcess.burstTime
    );
  };

  const handleGenerateReport = () => {
    console.log("Generating report for executed processes:", executedProcesses);
  };

  const displayedProcesses = scheduledProcesses.filter((process) =>
    executedProcesses.includes(process.id)
  );

  const totalTime = scheduledProcesses.reduce(
    (maxTime, process) =>
      Math.max(maxTime, process.completionTime ? process.completionTime : 0),
    0
  );

  return (
    <div className="execution-queue">
      <h3>Execution Queue</h3>
      <div className="current-time">
        <strong>Current Time:</strong> {currentTime}
      </div>
      <div className="arrived-processes">
        <strong>Processes Arrived:</strong>
        {scheduledProcesses
          .filter((process) => process.arrivalTime <= currentTime)
          .map((process) => (
            <span key={process.id}>
              {", "}
              {process.name} (ID: {process.id})
            </span>
          ))}
      </div>
      <div className="gantt-chart">
        {displayedProcesses.map((process) => {
          const { id, name, startTime, burstTime, color } = process;
          const barStyle = {
            left: `${(startTime / totalTime) * 100}%`,
            width: ` ${(burstTime / totalTime) * 100}%`,
            backgroundColor: color,
          };
          return (
            <div key={id} className="gantt-bar" style={barStyle}>
              <div className="gantt-bar-text">
                {name} (ID: {id})
              </div>
              <div className="gantt-bar-time">
                <span className="start-time">{startTime}</span>
                <span className="end-time">{startTime + burstTime}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="gantt-timeline">
        {Array.from({ length: totalTime + 1 }, (_, i) => (
          <div key={i} className="gantt-timeline-marker">
            {i}
          </div>
        ))}
      </div>
      <div className="execution-buttons">
        <button
          onClick={handlePrevious}
          disabled={!isStarted || executedProcesses.length === 0}
        >
          Previous
        </button>
        <button onClick={handleGenerateReport}>Generate Report</button>
        <button
          onClick={handleNext}
          disabled={
            !isStarted || executedProcesses.length === scheduledProcesses.length
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

ExecutionQueue.propTypes = {
  processes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      arrivalTime: PropTypes.number.isRequired,
      burstTime: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  isStarted: PropTypes.bool.isRequired,
  selectedAlgorithm: PropTypes.string.isRequired,
};

export default ExecutionQueue;
