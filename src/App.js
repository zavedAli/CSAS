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
import StoredResults from "./components/StoredResults";
import SampleDataModal from "./components/SampleDataModal";
import AboutPage from "./components/AboutPage";

const getStaticColor = (index) => {
  const colors = ["#1961b4", "#c42c22", "#0e7d44", "#8c5a18", "#7b06a6"];
  return colors[index % colors.length];
};

const SAMPLE_DATA = [
  { id: 1, name: "P1", arrivalTime: 0, burstTime: 5, priority: 2 },
  { id: 2, name: "P2", arrivalTime: 1, burstTime: 3, priority: 1 },
  { id: 3, name: "P3", arrivalTime: 2, burstTime: 8, priority: 3 },
  { id: 4, name: "P4", arrivalTime: 3, burstTime: 6, priority: 2 },
];

const SAMPLE_DATA_2 = [
  { id: 1, name: "P1", arrivalTime: 0, burstTime: 4, priority: 3 },
  { id: 2, name: "P2", arrivalTime: 1, burstTime: 2, priority: 1 },
  { id: 3, name: "P3", arrivalTime: 2, burstTime: 6, priority: 2 },
  { id: 4, name: "P4", arrivalTime: 3, burstTime: 3, priority: 4 },
  { id: 5, name: "P5", arrivalTime: 4, burstTime: 5, priority: 2 },
];

const SAMPLE_DATA_3 = [
  { id: 1, name: "P1", arrivalTime: 0, burstTime: 7, priority: 2 },
  { id: 2, name: "P2", arrivalTime: 2, burstTime: 4, priority: 1 },
  { id: 3, name: "P3", arrivalTime: 4, burstTime: 1, priority: 3 },
  { id: 4, name: "P4", arrivalTime: 5, burstTime: 4, priority: 2 },
];

function App() {
  const [processes, setProcesses] = useState([]);
  const [nextProcessId, setNextProcessId] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [pendingAlgorithm, setPendingAlgorithm] = useState("");
  const [storedResults, setStoredResults] = useState([]);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [isResultStored, setIsResultStored] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const handleAddProcess = (newProcess) => {
    newProcess.color = getStaticColor(nextProcessId - 1);
    setProcesses((prevProcesses) => [...prevProcesses, newProcess]);
    setNextProcessId((prevId) => prevId + 1);
  };

  const [sampleDataIndex, setSampleDataIndex] = useState(0);
  const SAMPLE_SETS = [SAMPLE_DATA, SAMPLE_DATA_2, SAMPLE_DATA_3];

  const handleLoadSampleData = () => {
    if (isStarted) return;
    setShowSampleModal(true);
  };

  const handleSelectSample = (index) => {
    const currentSample = SAMPLE_SETS[index];
    const sampleProcesses = currentSample.map((p, idx) => ({
      ...p,
      color: getStaticColor(idx),
    }));
    setProcesses(sampleProcesses);
    setNextProcessId(currentSample.length + 1);
    setShowSampleModal(false);
  };

  const handleStart = () => {
    if (!selectedAlgorithm) {
      alert("Please select an algorithm before starting the simulation.");
      return;
    }
    if (processes.length === 0) {
      alert("Please add at least one process before starting the simulation.");
      return;
    }
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
    
    // Auto-store results before changing algorithm only if not already stored
    if (isStarted && processes.length > 0 && !isResultStored) {
      const event = new CustomEvent('autoStoreResults');
      window.dispatchEvent(event);
    }
    
    // Reset the stored flag for new algorithm
    setIsResultStored(false);
    
    // Always reset simulation when algorithm changes
    setIsStarted(false);
    
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

  const handleStoreResult = (result) => {
    setStoredResults((prev) => [...prev, result]);
    setIsResultStored(true);
  };

  const handleClearResults = () => {
    setStoredResults([]);
  };

  return (
    <div className="min-h-screen pb-4">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {currentPage === "about" ? (
        <AboutPage onNavigateHome={() => setCurrentPage("home")} />
      ) : (
        <>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full px-4 mx-auto mt-2 max-w-[1920px]">
        <div className="xl:col-span-1 space-y-4 xl:sticky xl:top-4 xl:self-start xl:max-h-[calc(100vh-2rem)] xl:overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl">
            <div className="p-2 border-b border-slate-700">
              <AlgoDes 
                selectedAlgorithm={selectedAlgorithm}
                onSelectChange={handleAlgorithmChange}
              />
            </div>
            <div className="p-2">
              <ProcessInputForm
                onAddProcess={handleAddProcess}
                nextProcessId={nextProcessId}
                onStart={handleStart}
                onReset={handleReset}
                isStarted={isStarted}
                selectedAlgorithm={selectedAlgorithm}
                timeQuantum={timeQuantum}
                onTimeQuantumChange={handleTimeQuantumChange}
                onLoadSample={handleLoadSampleData}
                processes={processes}
              />
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2">
            <ProcessList processes={processes} />
          </div>
        </div>
        
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4">
            <GanttChart processes={processes} />
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4">
            <ExecutionQueue
              processes={processes}
              isStarted={isStarted}
              selectedAlgorithm={selectedAlgorithm}
              timeQuantum={timeQuantum}
              onStoreResult={handleStoreResult}
            />
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4">
            <StoredResults 
              storedResults={storedResults}
              onClear={handleClearResults}
            />
          </div>
        </div>
      </div>
      
      <ConfirmModal
        isOpen={showModal}
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
        message="Do you want to reset all processes? Click 'Reset All' to start fresh, or 'Keep Processes' to use existing processes with the new algorithm."
      />
      
      <SampleDataModal
        isOpen={showSampleModal}
        onSelect={handleSelectSample}
        onClose={() => setShowSampleModal(false)}
      />
        </>
      )}
    </div>
  );
}

export default App;
