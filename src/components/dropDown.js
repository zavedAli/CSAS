// src/components/Dropdown.js
import React from "react";
import PropTypes from "prop-types";
import "./css/dropDown.css"; // Import the CSS file

const Dropdown = ({ selectedOption, onSelectChange }) => {
  return (
    <div className="dropdown-container w-full">
      <h2>Select Algorithm</h2>
      <select
        value={selectedOption}
        onChange={onSelectChange}
        className="dropdown-select"
      >
        <option value="">Choose an Algorithm</option>
<<<<<<< HEAD
        <option value="FCFS">FCFS (First Come First Serve)</option>
        <option value="SJF">SJF (Shortest Job First)</option>
        <option value="SRTF">SRTF (Shortest Remaining Time First)</option>
        <option value="Priority">Priority Scheduling</option>
        <option value="RR">Round Robin</option>
=======
        <option value="SJF">SJF</option>
        <option value="FCFS">FCFS</option>
        <option value="Priority">Priority Algorithm</option>
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
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
