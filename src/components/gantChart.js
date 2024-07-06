// src/components/GanttChart.js
import React from "react";
import PropTypes from "prop-types";
import "./css/GanttChart.css";

const getStaticColor = (index) => {
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
  return colors[index % colors.length];
};

const GanttChart = ({ processes }) => {
  let currentTime = 0;
  const scheduledProcesses = processes.map((process, index) => {
    const { id, name, arrivalTime, burstTime } = process;
    const startTime = Math.max(currentTime, arrivalTime);
    const completionTime = startTime + burstTime;
    currentTime = completionTime;

    return {
      ...process,
      startTime,
      completionTime,
      color: getStaticColor(index),
    };
  });

  const totalTime = scheduledProcesses.reduce(
    (maxTime, process) => Math.max(maxTime, process.completionTime),
    0
  );

  const timeIntervals = Array.from({ length: totalTime + 1 }, (_, i) => i);

  // Generate segments for "idle" time
  const idleSegments = [];
  let lastEndTime = 0;

  scheduledProcesses.forEach((process) => {
    if (process.startTime > lastEndTime) {
      idleSegments.push({
        startTime: lastEndTime,
        endTime: process.startTime,
      });
    }
    lastEndTime = process.completionTime;
  });

  if (lastEndTime < totalTime) {
    idleSegments.push({
      startTime: lastEndTime,
      endTime: totalTime,
    });
  }

  return (
    <div>
      <div>
        <h3>Gantt Chart</h3>
        <div className="gantt-chart">
          {scheduledProcesses.map((process) => {
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
          {/* Render idle segments */}
          {idleSegments.map((segment, index) => {
            const { startTime, endTime } = segment;
            const idleWidth = ((endTime - startTime) / totalTime) * 100;
            const idleStyle = {
              left: `${(startTime / totalTime) * 100}%`,
              width: `${idleWidth}%`,
              backgroundColor: "#ccc", // Idle color
            };
            return (
              <div
                key={`idle-${index}`}
                className="gantt-idle"
                style={idleStyle}
              >
                Idle
              </div>
            );
          })}
        </div>
        <div className="gantt-timeline">
          {timeIntervals.map((time) => (
            <div key={time} className="gantt-timeline-marker">
              {time}
              {time !== 0 && <div className="gantt-timeline-line"></div>}
            </div>
          ))}
        </div>
        <div className="gantt-legend">
          <h3>Process Legend</h3>
          <ul>
            {scheduledProcesses.map((process) => (
              <li key={process.id} style={{ color: process.color }}>
                {process.name} (ID: {process.id})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

GanttChart.propTypes = {
  processes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      arrivalTime: PropTypes.number.isRequired,
      burstTime: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GanttChart;
