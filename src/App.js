// src/App.js
import React, { useState } from "react";
import "./App.css";
import Dropdown from "./components/dropDown";
import ProcessInputForm from "./components/inputForm";
import ProcessList from "./components/processList";
import GanttChart from "./components/gantChart";
import ExecutionQueue from "./components/ExecutionQueue";

const getStaticColor = (index) => {
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
  return colors[index % colors.length];
};

function App() {
  const [processes, setProcesses] = useState([]);
  const [nextProcessId, setNextProcessId] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  const handleAddProcess = (newProcess) => {
    newProcess.color = getStaticColor(nextProcessId - 1);
    setProcesses((prevProcesses) => [...prevProcesses, newProcess]);
    setNextProcessId((prevId) => prevId + 1);
  };

  const handleStart = () => {
    setIsStarted(true);
    console.log("Starting with processes:", processes);
  };

  const handleReset = () => {
    setProcesses([]);
    setNextProcessId(1);
    setIsStarted(false);
  };

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  return (
    <>
      <div className="App">
        <Dropdown
          selectedOption={selectedAlgorithm}
          onSelectChange={handleAlgorithmChange}
        />
        <ProcessInputForm
          onAddProcess={handleAddProcess}
          nextProcessId={nextProcessId}
          onStart={handleStart}
          onReset={handleReset}
          isStarted={isStarted}
          selectedAlgorithm={selectedAlgorithm} // Pass the prop here
        />
        <ProcessList processes={processes} />
      </div>
      <GanttChart processes={processes} />
      <ExecutionQueue
        processes={processes}
        isStarted={isStarted}
        selectedAlgorithm={selectedAlgorithm}
      />
    </>
  );
}

export default App;
