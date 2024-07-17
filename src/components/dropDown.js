// src/components/Dropdown.js
import React from "react";
import PropTypes from "prop-types";
import "./css/dropDown.css"; // Import the CSS file

const Dropdown = ({ selectedOption, onSelectChange }) => {
  return (
    <div className="dropdown-container">
      <h2>Select Algorithm</h2>
      <select
        value={selectedOption}
        onChange={onSelectChange}
        className="dropdown-select"
      >
        <option value="">Choose an Algorithm</option>
        <option value="SJF">SJF</option>
        <option value="FCFS">FCFS</option>
        <option value="Priority">Priority Algorithm</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

Dropdown.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
};

export default Dropdown;
