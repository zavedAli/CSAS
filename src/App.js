// src/App.js
import React, { useState } from "react";
import "./App.css";
import Dropdown from "./components/dropDown";
import ProcessInputForm from "./components/inputForm";
import GanttChart from "./components/gantChart";
import ProcessList from "./components/processList";
import ExecutionQueue from "./components/ExecutionQueue";

function App() {
  const [processes, setProcesses] = useState([]);
  const [nextProcessId, setNextProcessId] = useState(1);

  const handleAddProcess = (newProcess) => {
    setProcesses((prevProcesses) => [...prevProcesses, newProcess]);
    setNextProcessId((prevId) => prevId + 1);
    logProcesses([...processes, newProcess]);
  };

  const logProcesses = (processes) => {
    console.log("Current Processes:");
    processes.forEach((process, index) => {
      console.log(
        ` Process ${index + 1}: ID=${process.id}, Name=${
          process.name
        }, Arrival Time=${process.arrivalTime}, Burst Time=${process.burstTime}`
      );
    });
  };
  const handleStart = () => {
    console.log(processes);
  };

  return (
    <>
      <div className="App">
        <div className="centered-container">
          <Dropdown />
        </div>
        <div className="centered-container">
          <ProcessInputForm
            onAddProcess={handleAddProcess}
            nextProcessId={nextProcessId}
            onStart={handleStart}
          />
        </div>
        <ProcessList processes={processes} />
      </div>
      <GanttChart processes={processes} />
      <ExecutionQueue processes={processes} />
    </>
  );
}

export default App;
