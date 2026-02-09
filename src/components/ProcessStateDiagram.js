import React from "react";
import PropTypes from "prop-types";
import "./css/processStateDiagram.css";

const ProcessStateDiagram = ({ processes, executedProcesses, currentTime, readyQueue = [], executionHistory = [] }) => {
  const lastExecution = executionHistory.length > 0 ? executionHistory[executionHistory.length - 1] : null;
  const isRunning = lastExecution && lastExecution.endTime === currentTime;
  
  const newProcesses = processes.filter((p) => p.arrivalTime > currentTime).reverse();
  
  const readyProcesses = readyQueue.length > 0 
    ? readyQueue.filter(q => q.remainingTime > 0).reverse()
    : processes.filter((p) => p.arrivalTime <= currentTime && p.remainingTime > 0 && !executedProcesses.includes(p.id)).reverse();
  
  const runningProcess = isRunning ? processes.find(p => p.id === lastExecution.id) : null;
  
  const terminatedProcesses = executedProcesses.map(id => processes.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="state-diagram-container">
      <h3 className="text-lg font-semibold text-slate-300 mb-3">Process State Diagram</h3>
      <div className="state-diagram">
        <div className="state-box new">
          <div className="state-title">New</div>
          <div className="state-content">
            {newProcesses.map((p) => (
              <span key={p.id} className="process-badge" style={{ backgroundColor: p.color }}>
                {p.name}
              </span>
            ))}
            {newProcesses.length === 0 && <span className="empty-state">None</span>}
          </div>
        </div>
        <div className="arrow">→</div>
        <div className="state-box ready">
          <div className="state-title">Ready</div>
          <div className="state-content">
            {readyProcesses.map((p) => (
              <span key={p.id} className="process-badge" style={{ backgroundColor: p.color }}>
                {p.name}
              </span>
            ))}
            {readyProcesses.length === 0 && <span className="empty-state">None</span>}
          </div>
        </div>
        <div className="arrow">→</div>
        <div className="state-box running">
          <div className="state-title">Running</div>
          <div className="state-content">
            {runningProcess ? (
              <span className="process-badge" style={{ backgroundColor: runningProcess.color }}>
                {runningProcess.name}
              </span>
            ) : (
              <span className="empty-state">Idle</span>
            )}
          </div>
        </div>
        <div className="arrow">→</div>
        <div className="state-box terminated">
          <div className="state-title">Terminated</div>
          <div className="state-content">
            {terminatedProcesses.map((p) => (
              <span key={p.id} className="process-badge" style={{ backgroundColor: p.color }}>
                {p.name}
              </span>
            ))}
            {terminatedProcesses.length === 0 && <span className="empty-state">None</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

ProcessStateDiagram.propTypes = {
  processes: PropTypes.array.isRequired,
  executedProcesses: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  readyQueue: PropTypes.array,
  executionHistory: PropTypes.array,
};

export default ProcessStateDiagram;
