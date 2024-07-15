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
      nextProcess = getNextProcessSJF(scheduledProcesses, executedProcesses);
    } else {
      nextProcess = getNextProcess(scheduledProcesses, executedProcesses);
    }

    if (nextProcess) {
      const updatedProcesses = scheduledProcesses.map((process) =>
        process.id === nextProcess.id
          ? {
              ...process,
              startTime: Math.max(currentTime, nextProcess.arrivalTime),
              completionTime:
                Math.max(currentTime, nextProcess.arrivalTime) +
                nextProcess.burstTime,
              waitingTime:
                Math.max(currentTime, nextProcess.arrivalTime) -
                process.arrivalTime,
            }
          : process
      );
      setScheduledProcesses(updatedProcesses);
      setExecutedProcesses([...executedProcesses, nextProcess.id]);
      setCurrentTime(
        Math.max(currentTime, nextProcess.arrivalTime) + nextProcess.burstTime
      );
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

    const newCurrentTime =
      executedProcesses.length > 1
        ? scheduledProcesses.find(
            (process) =>
              process.id === executedProcesses[executedProcesses.length - 2]
          ).completionTime
        : 0;

    setCurrentTime(newCurrentTime);
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

  const arrivedProcesses = scheduledProcesses.filter(
    (process) => process.arrivalTime <= currentTime
  );

  const waitingProcesses = arrivedProcesses.filter(
    (process) => !executedProcesses.includes(process.id)
  );

  const executedProcessesInfo = scheduledProcesses.filter((process) =>
    executedProcesses.includes(process.id)
  );

  return (
    <div className="execution-queue">
      <h3>Execution Queue</h3>
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
