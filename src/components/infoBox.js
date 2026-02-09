// src/components/InfoBox.js
import React from "react";
import PropTypes from "prop-types";
import "./css/InfoBox.css";

const InfoBox = ({ process }) => {
  const { id, name, startTime, burstTime, color } = process;

  return (
    <div className="info-box" style={{ borderColor: color }}>
      <div>
        Process: {name} (ID: {id})
      </div>
      <divi>Start Time: {startTime}</divi>
      <div>Burst Time: {burstTime}</div>
    </div>
  );
};

InfoBox.propTypes = {
  process: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    burstTime: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default InfoBox;
