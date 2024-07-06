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
        <option value="" disabled>
          Select an option
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;
