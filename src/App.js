// src/App.js
import React, { useState } from "react";
import "./App.css";
import ProcessInputForm from "./components/inputForm";
import ProcessList from "./components/processList";
import GanttChart from "./components/gantChart";
import ExecutionQueue from "./components/kernel/ExecutionQueue";
import AlgoDes from "./components/algoDes";
import Navbar from "./components/navbar";
import ConfirmModal from "./components/ConfirmModal";

const getStaticColor = (index) => {
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
  return colors[index % colors.length];
};

function App() {
  const [processes, setProcesses] = useState([]);
  const [nextProcessId, setNextProcessId] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [pendingAlgorithm, setPendingAlgorithm] = useState("");

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
    const newAlgorithm = e.target.value;
    
    if (processes.length > 0 && selectedAlgorithm !== "") {
      setPendingAlgorithm(newAlgorithm);
      setShowModal(true);
    } else {
      setSelectedAlgorithm(newAlgorithm);
    }
  };

  const handleConfirmReset = () => {
    handleReset();
    setSelectedAlgorithm(pendingAlgorithm);
    setShowModal(false);
    setPendingAlgorithm("");
  };

  const handleCancelReset = () => {
    setSelectedAlgorithm(pendingAlgorithm);
    setShowModal(false);
    setPendingAlgorithm("");
  };

  const handleTimeQuantumChange = (value) => {
    setTimeQuantum(value);
  };

  return (
    <div className="min-h-screen pb-4">
      <Navbar />
      <div className="flex flex-col text-slate-800 w-[98vw] sm:w-[96vw] mx-auto mt-3 bg-white/95 backdrop-blur-sm font-sans rounded-2xl shadow-xl">
        <div className="p-3">
          <AlgoDes 
            selectedAlgorithm={selectedAlgorithm}
            onSelectChange={handleAlgorithmChange}
          />
        </div>

        <div className="flex sm:flex-row flex-col gap-3 px-3 pb-3">
          <div className="flex w-full sm:w-1/2">
            <ProcessInputForm
              onAddProcess={handleAddProcess}
              nextProcessId={nextProcessId}
              onStart={handleStart}
              onReset={handleReset}
              isStarted={isStarted}
              selectedAlgorithm={selectedAlgorithm}
              timeQuantum={timeQuantum}
              onTimeQuantumChange={handleTimeQuantumChange}
            />
          </div>
          <div className="flex w-full sm:w-1/2">
            <ProcessList processes={processes} />
          </div>
        </div>
      </div>
      <div className="w-[96vw] mx-auto mt-3">
        <GanttChart processes={processes} />
      </div>
      <div className="flex flex-col mt-3 w-[98vw] sm:w-[96vw] mx-auto font-mono rounded-2xl">
        <ExecutionQueue
          processes={processes}
          isStarted={isStarted}
          selectedAlgorithm={selectedAlgorithm}
          timeQuantum={timeQuantum}
        />
      </div>
      
      <ConfirmModal
        isOpen={showModal}
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
        message="Do you want to reset all processes? Click 'Reset All' to start fresh, or 'Keep Processes' to use existing processes with the new algorithm."
      />
    </div>
  );
}

export default App;
