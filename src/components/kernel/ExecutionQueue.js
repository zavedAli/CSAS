// src/components/ExecutionQueue.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getNextProcess } from "../../algorithm/fcfs";
import { getNextProcessSJF } from "../../algorithm/sjf";
import { getNextProcessPriority } from "../../algorithm/priority";
import { executeRoundRobin } from "../../algorithm/roundRobin";
import { executeSRTF } from "../../algorithm/srtf";
import ExecutionQueueControls from "./ExecutionQueueControls";
import ExecutionQueueInfo from "./ExecutionQueueInfo";
import "../css/executionQueue.css";
import { GiProcessor } from "react-icons/gi";
import { calculateMetrics } from "../../algorithm/processMetrics";

const ExecutionQueue = ({ processes, isStarted, selectedAlgorithm, timeQuantum }) => {
  const [executedProcesses, setExecutedProcesses] = useState([]);
  const [scheduledProcesses, setScheduledProcesses] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [allProcessesScheduled, setAllProcessesScheduled] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [ganttChart, setGanttChart] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (selectedAlgorithm === "RR" || selectedAlgorithm === "SRTF") {
      let result;
      if (selectedAlgorithm === "RR") {
        result = executeRoundRobin(processes, timeQuantum);
      } else {
        result = executeSRTF(processes);
      }
      setScheduledProcesses(result.processesWithRemaining);
      setGanttChart(result.ganttChart);
      setCurrentStep(0);
      setExecutedProcesses([]);
      setCurrentTime(0);
      setAllProcessesScheduled(false);
    } else {
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
          responseTime: null,
          turnaroundTime: null,
        }));
      };
      setScheduledProcesses(scheduleProcesses());
      setCurrentTime(0);
      setAllProcessesScheduled(false);
      setGanttChart([]);
    }
  }, [processes, selectedAlgorithm, timeQuantum]);

  const handleNext = () => {
    if (selectedAlgorithm === "RR" || selectedAlgorithm === "SRTF") {
      if (currentStep < ganttChart.length) {
        const step = ganttChart[currentStep];
        setCurrentTime(step.endTime);
        
        if (!executedProcesses.includes(step.id)) {
          setExecutedProcesses([...executedProcesses, step.id]);
        }
        
        setCurrentStep(currentStep + 1);
        setAllProcessesScheduled(currentStep + 1 === ganttChart.length);
      }
    } else {
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
                    : null,
                turnaroundTime:
                  Math.max(currentTime, nextProcess.arrivalTime) +
                  nextProcess.burstTime -
                  process.arrivalTime,
              }
            : process
        );
        setScheduledProcesses(updatedProcesses);
        setExecutedProcesses([...executedProcesses, nextProcess.id]);
        setCurrentTime(
          Math.max(currentTime, nextProcess.arrivalTime) + nextProcess.burstTime
        );
        setAllProcessesScheduled(
          executedProcesses.length + 1 === processes.length
        );
      }
    }
  };

  const handlePrevious = () => {
    if (selectedAlgorithm === "RR" || selectedAlgorithm === "SRTF") {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        const prevStep = ganttChart[currentStep - 1];
        setCurrentTime(prevStep.endTime);
        setAllProcessesScheduled(false);
      }
    } else {
      const lastExecutedProcessId =
        executedProcesses[executedProcesses.length - 1];

      const updatedProcesses = scheduledProcesses.map((process) =>
        process.id === lastExecutedProcessId
          ? {
              ...process,
              startTime: null,
              completionTime: null,
              waitingTime: null,
              responseTime: null,
              turnaroundTime: null,
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
      setAllProcessesScheduled(false);
    }
  };

  const handleGenerateReport = () => {
    const metrics = calculateMetrics(
      scheduledProcesses,
      executedProcesses,
      currentTime
    );
    setReportData(metrics);
    setShowReport(true);
  };

  const displayedProcesses = (selectedAlgorithm === "RR" || selectedAlgorithm === "SRTF")
    ? ganttChart.slice(0, currentStep)
    : scheduledProcesses.filter((process) =>
        executedProcesses.includes(process.id)
      );

  const totalTime = (selectedAlgorithm === "RR" || selectedAlgorithm === "SRTF")
    ? (ganttChart.length > 0 ? ganttChart[ganttChart.length - 1].endTime : 0)
    : scheduledProcesses.reduce(
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

      <div className="gantt-chart">
        {displayedProcesses.map((process, index) => {
          const { id, name, startTime, color } = process;
          const burstTime = (selectedAlgorithm === "RR" || selectedAlgorithm === "SRTF")
            ? process.endTime - process.startTime
            : process.burstTime;
          const start = (selectedAlgorithm === "RR" || selectedAlgorithm === "SRTF")
            ? process.startTime
            : startTime;
          
          const barStyle = {
            left: `${(start / totalTime) * 100}%`,
            width: ` ${(burstTime / totalTime) * 100}%`,
            backgroundColor: color,
          };
          return (
            <div key={`${id}-${index}`} className="gantt-bar" style={barStyle}>
              <div className="gantt-bar-text">
                {name} (ID: {id})
              </div>
              <div className="gantt-bar-time">
                <span className="start-time">{start}</span>
                <span className="end-time">{start + burstTime}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="gantt-timeline mb-10">
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
      priority: PropTypes.number,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  isStarted: PropTypes.bool.isRequired,
  selectedAlgorithm: PropTypes.string.isRequired,
  timeQuantum: PropTypes.number,
};

export default ExecutionQueue;
