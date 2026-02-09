import React from "react";
import PropTypes from "prop-types";
import "./css/metrics.css";

const Metrics = ({ processes, executedProcesses, currentTime }) => {
  const throughput = currentTime > 0 ? (executedProcesses.length / currentTime).toFixed(3) : 0;
  
  const STARVATION_THRESHOLD = 10;
  const starvedProcesses = processes.filter((p) => {
    if (executedProcesses.includes(p.id)) return false;
    const waitingTime = currentTime - p.arrivalTime;
    return p.arrivalTime <= currentTime && waitingTime > STARVATION_THRESHOLD;
  });

  return (
    <div className="metrics-container">
      <div className="metric-box">
        <div className="metric-label">Throughput</div>
        <div className="metric-value">{throughput}</div>
        <div className="metric-unit">processes/time unit</div>
      </div>
      
      <div className="metric-box starvation">
        <div className="metric-label">Starvation Detection</div>
        {starvedProcesses.length > 0 ? (
          <div className="starvation-warning">
            <div className="metric-value">{starvedProcesses.length}</div>
            <div className="starved-list">
              {starvedProcesses.map((p) => (
                <span key={p.id} className="starved-badge" style={{ backgroundColor: p.color }}>
                  {p.name} (waiting: {currentTime - p.arrivalTime})
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-starvation">
            <div className="metric-value">✓</div>
            <div className="metric-unit">No starvation detected</div>
          </div>
        )}
      </div>
    </div>
  );
};

Metrics.propTypes = {
  processes: PropTypes.array.isRequired,
  executedProcesses: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
};

export default Metrics;
