// src/App.js
import React, { useState } from "react";
import "./App.css";
import Dropdown from "./components/dropDown";
import ProcessInputForm from "./components/inputForm";
import ProcessList from "./components/processList";
import GanttChart from "./components/gantChart";
import ExecutionQueue from "./components/kernel/ExecutionQueue";
import AlgoDes from "./components/algoDes";
import Navbar from "./components/navbar";

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
      <Navbar />
      <div className="flex flex-col text-[#2b2b2b] w-[95vw] sm:w-[80vw] m-auto bg-[#EEEDEB] font-sans rounded-[40px]">
        <div className="flex flex-col m-auto">
          <Dropdown
            selectedOption={selectedAlgorithm}
            onSelectChange={handleAlgorithmChange}
          />
        </div>

        <div className="flex flex-col m-auto align-middle w-[90%]">
          <AlgoDes selectedAlgorithm={selectedAlgorithm} />
        </div>
        <div className="flex sm:flex-row flex-col gap-4 m-[10px] sm:m-16 ">
          <div className="flex w-full">
            <ProcessInputForm
              onAddProcess={handleAddProcess}
              nextProcessId={nextProcessId}
              onStart={handleStart}
              onReset={handleReset}
              isStarted={isStarted}
              selectedAlgorithm={selectedAlgorithm} // Pass the prop here
            />
          </div>
          <div className="flex sm:w-1/2">
            <ProcessList processes={processes} />
          </div>
        </div>
      </div>
      <div className="w-[80vw] m-auto pt-10">
        <GanttChart processes={processes} />
      </div>
      <div className="flex flex-col  mt-6 w-[95vw] sm:w-[80vw] m-auto  font-mono rounded-b-[40px]">
        <ExecutionQueue
          processes={processes}
          isStarted={isStarted}
          selectedAlgorithm={selectedAlgorithm}
        />
      </div>
    </>
  );
}

export default App;
