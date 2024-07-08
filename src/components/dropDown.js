// src/components/Dropdown.js
import React, { useState } from "react";
import "./css/dropDown.css"; // Import the CSS file

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <h2>Select Algorithm</h2>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="dropdown-select"
      >
        <option value="">Choose an Algorithm</option>
        <option value="SJF">SJF</option>
        <option value="FCFS">FCFS</option>
        <option value="Round-Robin Algorithm">Round-Robin Algorithm</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;
