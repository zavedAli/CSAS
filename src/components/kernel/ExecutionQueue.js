// src/components/ExecutionQueue.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getNextProcess } from "../../algorithm/fcfs";
import { getNextProcessSJF } from "../../algorithm/sjf";
import { getNextProcessPriority } from "../../algorithm/priority";
import ExecutionQueueControls from "./ExecutionQueueControls";
import ExecutionQueueInfo from "./ExecutionQueueInfo";
import ProcessStateDiagram from "../ProcessStateDiagram";
import Metrics from "../Metrics";
import StepExplanation from "../StepExplanation";
import "../css/executionQueue.css";
import { GiProcessor } from "react-icons/gi";

// Import the new function
import { calculateMetrics } from "../../algorithm/processMetrics"; // <-- New import

const ExecutionQueue = ({ processes, isStarted, selectedAlgorithm, timeQuantum, onStoreResult }) => {
  const [executedProcesses, setExecutedProcesses] = useState([]);
  const [scheduledProcesses, setScheduledProcesses] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [allProcessesScheduled, setAllProcessesScheduled] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [readyQueue, setReadyQueue] = useState([]);
  const [executionHistory, setExecutionHistory] = useState([]);
  const stepExplanationRef = React.useRef();

  useEffect(() => {
    setExecutedProcesses([]);
    setCurrentTime(0);
    setAllProcessesScheduled(false);
    setShowReport(false);
    setReadyQueue([]);
    setExecutionHistory([]);
    
    const scheduleProcesses = () => {
      let sortedProcesses = processes.slice().sort((a, b) => a.arrivalTime - b.arrivalTime);
      return sortedProcesses.map((process) => ({
        ...process,
        remainingTime: process.burstTime,
        startTime: null,
        completionTime: null,
        waitingTime: null,
        responseTime: null,
        turnaroundTime: null,
      }));
    };
    setScheduledProcesses(scheduleProcesses());
  }, [processes, selectedAlgorithm]);

  const handleNext = () => {
    if (selectedAlgorithm === "RR") {
      let queue = [...readyQueue];
      
      scheduledProcesses.forEach(p => {
        if (p.arrivalTime <= currentTime && p.remainingTime > 0 && !queue.find(q => q.id === p.id)) {
          queue.push(p);
        }
      });
      
      if (queue.length === 0) {
        const next = scheduledProcesses.find(p => p.arrivalTime > currentTime && p.remainingTime > 0);
        if (next) {
          setCurrentTime(next.arrivalTime);
        }
        return;
      }
      
      const current = queue.shift();
      const execTime = Math.min(timeQuantum, current.remainingTime);
      const start = currentTime;
      const end = start + execTime;
      
      setExecutionHistory([...executionHistory, {
        id: current.id,
        name: current.name,
        startTime: start,
        endTime: end,
        color: current.color
      }]);
      
      const remaining = current.remainingTime - execTime;
      const done = remaining === 0;
      
      const updated = scheduledProcesses.map(p => {
        if (p.id !== current.id) return p;
        return {
          ...p,
          remainingTime: remaining,
          startTime: p.startTime === null ? start : p.startTime,
          responseTime: p.startTime === null ? start - p.arrivalTime : p.responseTime,
          completionTime: done ? end : p.completionTime,
          turnaroundTime: done ? end - p.arrivalTime : p.turnaroundTime,
          waitingTime: done ? end - p.arrivalTime - p.burstTime : p.waitingTime,
        };
      });
      
      setScheduledProcesses(updated);
      setCurrentTime(end);
      
      scheduledProcesses.forEach(p => {
        if (p.arrivalTime > start && p.arrivalTime <= end && p.remainingTime > 0 && !queue.find(q => q.id === p.id)) {
          queue.push(p);
        }
      });
      
      if (!done) {
        queue.push({...current, remainingTime: remaining});
      } else {
        setExecutedProcesses([...executedProcesses, current.id]);
      }
      
      setReadyQueue(queue);
      setAllProcessesScheduled(updated.every(p => p.remainingTime === 0));
      return;
    }
    
    let nextProcess;
    if (currentTime === 0) {
      nextProcess = scheduledProcesses
        .filter((process) => !executedProcesses.includes(process.id))
        .sort((a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime)[0];
    } else {
      const waitingProcesses = scheduledProcesses.filter(
        (process) => process.arrivalTime <= currentTime && !executedProcesses.includes(process.id)
      );
      if (waitingProcesses.length > 0) {
        if (selectedAlgorithm === "SJF") {
          nextProcess = waitingProcesses.sort((a, b) => a.burstTime - b.burstTime)[0];
        } else if (selectedAlgorithm === "Priority") {
          nextProcess = waitingProcesses.sort((a, b) => b.priority - a.priority)[0];
        } else {
          nextProcess = waitingProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
        }
      } else {
        if (selectedAlgorithm === "SJF") {
          nextProcess = getNextProcessSJF(scheduledProcesses, executedProcesses);
        } else if (selectedAlgorithm === "Priority") {
          nextProcess = getNextProcessPriority(scheduledProcesses, executedProcesses);
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
              completionTime: Math.max(currentTime, nextProcess.arrivalTime) + nextProcess.burstTime,
              waitingTime: Math.max(currentTime, nextProcess.arrivalTime) - process.arrivalTime,
              responseTime: Math.max(currentTime, nextProcess.arrivalTime) === process.arrivalTime
                  ? Math.max(currentTime, nextProcess.arrivalTime) - process.arrivalTime : null,
              turnaroundTime: Math.max(currentTime, nextProcess.arrivalTime) + nextProcess.burstTime - process.arrivalTime,
            }
          : process
      );
      setScheduledProcesses(updatedProcesses);
      setExecutedProcesses([...executedProcesses, nextProcess.id]);
      setCurrentTime(Math.max(currentTime, nextProcess.arrivalTime) + nextProcess.burstTime);
      setAllProcessesScheduled(executedProcesses.length + 1 === processes.length);
    }
  };

  const handlePrevious = () => {
    if (selectedAlgorithm === "RR") {
      if (executionHistory.length === 0) return;
      
      const lastExecution = executionHistory[executionHistory.length - 1];
      const newHistory = executionHistory.slice(0, -1);
      setExecutionHistory(newHistory);
      
      const executeTime = lastExecution.endTime - lastExecution.startTime;
      
      const updatedProcesses = scheduledProcesses.map((p) =>
        p.id === lastExecution.id
          ? {
              ...p,
              remainingTime: p.remainingTime + executeTime,
              startTime: newHistory.find(h => h.id === p.id) ? p.startTime : null,
              responseTime: newHistory.find(h => h.id === p.id) ? p.responseTime : null,
              completionTime: null,
              turnaroundTime: null,
              waitingTime: null,
            }
          : p
      );
      
      setScheduledProcesses(updatedProcesses);
      setCurrentTime(lastExecution.startTime);
      setExecutedProcesses(executedProcesses.filter(id => updatedProcesses.find(p => p.id === id && p.remainingTime > 0) ? false : true));
      
      const queueAtTime = [];
      updatedProcesses.forEach(p => {
        if (p.arrivalTime <= lastExecution.startTime && p.remainingTime > 0) {
          const inHistory = newHistory.filter(h => h.id === p.id && h.endTime <= lastExecution.startTime);
          if (inHistory.length === 0 || inHistory[inHistory.length - 1].endTime < lastExecution.startTime) {
            queueAtTime.push(p);
          }
        }
      });
      
      setReadyQueue(queueAtTime);
      setAllProcessesScheduled(false);
      return;
    }
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

  const displayedProcesses = selectedAlgorithm === "RR" 
    ? executionHistory 
    : scheduledProcesses.filter((process) => executedProcesses.includes(process.id));

  const totalTime = selectedAlgorithm === "RR" 
    ? Math.max(currentTime, ...executionHistory.map(h => h.endTime))
    : scheduledProcesses.reduce((maxTime, process) => Math.max(maxTime, process.completionTime ? process.completionTime : 0), 0);

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
      <h3 className="flex gap-4 text-center sm:text-start text-[30px] sm:text-[40px] text-[#2d4b8d]  pb-4 items-center">
        Execution Queue
        <GiProcessor />
      </h3>
      <div className=" mb-10">
        <ExecutionQueueInfo
          currentTime={currentTime}
          arrivedProcesses={arrivedProcesses}
          waitingProcesses={waitingProcesses}
          executedProcessesInfo={executedProcessesInfo}
        />
      </div>

      <ProcessStateDiagram
        processes={scheduledProcesses}
        executedProcesses={executedProcesses}
        currentTime={currentTime}
        readyQueue={readyQueue}
        executionHistory={executionHistory}
      />

      <Metrics
        processes={scheduledProcesses}
        executedProcesses={executedProcesses}
        currentTime={currentTime}
      />

      <StepExplanation
        ref={stepExplanationRef}
        scheduledProcesses={scheduledProcesses}
        executedProcesses={executedProcesses}
        currentTime={currentTime}
        selectedAlgorithm={selectedAlgorithm}
        executionHistory={executionHistory}
        timeQuantum={timeQuantum}
      />

      <div className="gantt-chart">
        {displayedProcesses.map((process, index) => {
          const { id, name, startTime, color } = process;
          const endTime = selectedAlgorithm === "RR" ? process.endTime : process.startTime + process.burstTime;
          const duration = endTime - startTime;
          const barStyle = {
            left: `${(startTime / totalTime) * 100}%`,
            width: `${(duration / totalTime) * 100}%`,
            backgroundColor: color,
          };
          return (
            <div key={selectedAlgorithm === "RR" ? `${id}-${index}` : id} className="gantt-bar" style={barStyle}>
              <div className="gantt-bar-text">
                {name} (ID: {id})
              </div>
              <div className="gantt-bar-time">
                <span className="start-time">{startTime}</span>
                <span className="end-time">{endTime}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="gantt-timeline mb-10 text-gray-300">
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
        processes={reportData}
        selectedAlgorithm={selectedAlgorithm}
        onStoreResult={onStoreResult}
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
