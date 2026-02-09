// src/App.js
import React, { useState } from "react";
import "./App.css";
<<<<<<< HEAD
=======
import Dropdown from "./components/dropDown";
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
import ProcessInputForm from "./components/inputForm";
import ProcessList from "./components/processList";
import GanttChart from "./components/gantChart";
import ExecutionQueue from "./components/kernel/ExecutionQueue";
import AlgoDes from "./components/algoDes";
import Navbar from "./components/navbar";
<<<<<<< HEAD
import ConfirmModal from "./components/ConfirmModal";
=======
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9

const getStaticColor = (index) => {
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
  return colors[index % colors.length];
};

function App() {
  const [processes, setProcesses] = useState([]);
  const [nextProcessId, setNextProcessId] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
<<<<<<< HEAD
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [pendingAlgorithm, setPendingAlgorithm] = useState("");
=======
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9

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
<<<<<<< HEAD
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
=======
    setSelectedAlgorithm(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-[#2b2b2b] w-[95vw] sm:w-[80vw] m-auto bg-[#EEEDEB] font-sans rounded-[40px]">
        <div className="flex flex-col m-auto">
          <Dropdown
            selectedOption={selectedAlgorithm}
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
            onSelectChange={handleAlgorithmChange}
          />
        </div>

<<<<<<< HEAD
        <div className="flex sm:flex-row flex-col gap-3 px-3 pb-3">
          <div className="flex w-full sm:w-1/2">
=======
        <div className="flex flex-col m-auto align-middle w-[90%]">
          <AlgoDes selectedAlgorithm={selectedAlgorithm} />
        </div>
        <div className="flex sm:flex-row flex-col gap-4 m-[10px] sm:m-16 ">
          <div className="flex w-full">
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
            <ProcessInputForm
              onAddProcess={handleAddProcess}
              nextProcessId={nextProcessId}
              onStart={handleStart}
              onReset={handleReset}
              isStarted={isStarted}
<<<<<<< HEAD
              selectedAlgorithm={selectedAlgorithm}
              timeQuantum={timeQuantum}
              onTimeQuantumChange={handleTimeQuantumChange}
            />
          </div>
          <div className="flex w-full sm:w-1/2">
=======
              selectedAlgorithm={selectedAlgorithm} // Pass the prop here
            />
          </div>
          <div className="flex sm:w-1/2">
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
            <ProcessList processes={processes} />
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div className="w-[96vw] mx-auto mt-3">
        <GanttChart processes={processes} />
      </div>
      <div className="flex flex-col mt-3 w-[98vw] sm:w-[96vw] mx-auto font-mono rounded-2xl">
=======
      <div className="w-[80vw] m-auto pt-10">
        <GanttChart processes={processes} />
      </div>
      <div className="flex flex-col  mt-6 w-[95vw] sm:w-[80vw] m-auto  font-mono rounded-b-[40px]">
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
        <ExecutionQueue
          processes={processes}
          isStarted={isStarted}
          selectedAlgorithm={selectedAlgorithm}
<<<<<<< HEAD
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
=======
        />
      </div>
    </>
>>>>>>> f9c1f0451182c729e58c1958980744ef0ca889c9
  );
}

export default App;
