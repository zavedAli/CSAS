// src/components/ExecutionQueue.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getNextProcess } from "../../algorithm/fcfs";
import { getNextProcessSJF } from "../../algorithm/sjf";
import { getNextProcessPriority } from "../../algorithm/priority";
import ExecutionQueueControls from "./ExecutionQueueControls";
import ExecutionQueueInfo from "./ExecutionQueueInfo";
import "../css/executionQueue.css";

// Import the new function
import { calculateMetrics } from "../../algorithm/processMetrics"; // <-- New import

const ExecutionQueue = ({ processes, isStarted, selectedAlgorithm }) => {
  const [executedProcesses, setExecutedProcesses] = useState([]);
  const [scheduledProcesses, setScheduledProcesses] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [allProcessesScheduled, setAllProcessesScheduled] = useState(false); // <-- New state
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const scheduleProcesses = () => {
      let sortedProcesses;
      if (selectedAlgorithm === "SJF") {
        sortedProcesses = processes
          .slice()
          .sort(
            (a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime
          );
      } else if (selectedAlgorithm === "Priority") {
        sortedProcesses = processes
          .slice()
          .sort(
            (a, b) => a.arrivalTime - b.arrivalTime || b.priority - a.priority
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
        responseTime: null, // <-- Added metric
        turnaroundTime: null, // <-- Added metric
      }));
    };
    setScheduledProcesses(scheduleProcesses());
    setCurrentTime(0); // Reset current time on processes change
    setAllProcessesScheduled(false); // Reset on processes change
  }, [processes, selectedAlgorithm]);

  const handleNext = () => {
    let nextProcess;

    if (currentTime === 0) {
      nextProcess = scheduledProcesses
        .filter((process) => !executedProcesses.includes(process.id))
        .sort(
          (a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime
        )[0];
    } else {
      const waitingProcesses = scheduledProcesses.filter(
        (process) =>
          process.arrivalTime <= currentTime &&
          !executedProcesses.includes(process.id)
      );

      if (waitingProcesses.length > 0) {
        if (selectedAlgorithm === "SJF") {
          nextProcess = waitingProcesses.sort(
            (a, b) => a.burstTime - b.burstTime
          )[0];
        } else if (selectedAlgorithm === "Priority") {
          nextProcess = waitingProcesses.sort(
            (a, b) => b.priority - a.priority
          )[0];
        } else {
          nextProcess = waitingProcesses.sort(
            (a, b) => a.arrivalTime - b.arrivalTime
          )[0];
        }
      } else {
        if (selectedAlgorithm === "SJF") {
          nextProcess = getNextProcessSJF(
            scheduledProcesses,
            executedProcesses
          );
        } else if (selectedAlgorithm === "Priority") {
          nextProcess = getNextProcessPriority(
            scheduledProcesses,
            executedProcesses
          );
        } else {
          nextProcess = getNextProcess(scheduledProcesses, executedProcesses);
        }
      }
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
              responseTime:
                Math.max(currentTime, nextProcess.arrivalTime) ===
                process.arrivalTime
                  ? Math.max(currentTime, nextProcess.arrivalTime) -
                    process.arrivalTime
                  : null, // <-- Added response time
              turnaroundTime:
                Math.max(currentTime, nextProcess.arrivalTime) +
                nextProcess.burstTime -
                process.arrivalTime, // <-- Added turnaround time
            }
          : process
      );
      setScheduledProcesses(updatedProcesses);
      setExecutedProcesses([...executedProcesses, nextProcess.id]);
      setCurrentTime(
        Math.max(currentTime, nextProcess.arrivalTime) + nextProcess.burstTime
      );

      // Check if all processes are scheduled
      setAllProcessesScheduled(
        executedProcesses.length + 1 === processes.length
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
            responseTime: null, // <-- Reset response time
            turnaroundTime: null, // <-- Reset turnaround time
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
    setAllProcessesScheduled(false); // Reset when going back
  };

  const handleGenerateReport = () => {
    // Calculate metrics and generate report here
    const metrics = calculateMetrics(
      scheduledProcesses,
      executedProcesses,
      currentTime
    );
    setReportData(metrics);
    setShowReport(true);
    console.log("Generating report for processes:", metrics);
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
      <ExecutionQueueInfo
        currentTime={currentTime}
        arrivedProcesses={arrivedProcesses}
        waitingProcesses={waitingProcesses}
        executedProcessesInfo={executedProcessesInfo}
      />
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
      <ExecutionQueueControls
        isStarted={isStarted}
        executedProcesses={executedProcesses}
        scheduledProcesses={scheduledProcesses}
        handlePrevious={handlePrevious}
        handleGenerateReport={handleGenerateReport}
        handleNext={handleNext}
        allProcessesScheduled={allProcessesScheduled}
        showReport={showReport}
        processes={reportData} // <-- Added prop
      />
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
      priority: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  isStarted: PropTypes.bool.isRequired,
  selectedAlgorithm: PropTypes.string.isRequired,
};

export default ExecutionQueue;
