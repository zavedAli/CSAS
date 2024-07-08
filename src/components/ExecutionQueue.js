// src/components/ExecutionQueue.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getNextProcess, getPreviousProcess } from "../algorithm/fcfs";
import "./css/executionQueue.css";

const ExecutionQueue = ({ processes, isStarted }) => {
  const [executedProcesses, setExecutedProcesses] = useState([]);
  const [scheduledProcesses, setScheduledProcesses] = useState([]);

  useEffect(() => {
    const scheduleProcesses = () => {
      let currentTime = 0;
      return processes
        .slice()
        .sort(
          (a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime
        )
        .map((process) => {
          const startTime = Math.max(currentTime, process.arrivalTime);
          const completionTime = startTime + process.burstTime;
          currentTime = completionTime;
          return {
            ...process,
            startTime,
            completionTime,
          };
        });
    };
    setScheduledProcesses(scheduleProcesses());
  }, [processes]);

  const handleNext = () => {
    const nextProcess = getNextProcess(scheduledProcesses, executedProcesses);
    if (nextProcess) {
      setExecutedProcesses([...executedProcesses, nextProcess.id]);
    }
  };

  const handlePrevious = () => {
    const newExecutedProcesses = [...executedProcesses];
    newExecutedProcesses.pop();
    setExecutedProcesses(newExecutedProcesses);
  };

  const displayedProcesses = scheduledProcesses.filter((process) =>
    executedProcesses.includes(process.id)
  );

  const totalTime = scheduledProcesses.reduce(
    (maxTime, process) => Math.max(maxTime, process.completionTime),
    0
  );

  return (
    <div className="execution-queue">
      <h3>Execution Queue</h3>
      <div className="gantt-chart">
        {displayedProcesses.map((process) => {
          const { id, name, startTime, burstTime, color } = process;
          const barStyle = {
            left: ` ${(startTime / totalTime) * 100}%`,
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
};

export default ExecutionQueue;
