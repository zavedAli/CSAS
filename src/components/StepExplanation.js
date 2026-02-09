import React, { useState, useEffect, useMemo, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./css/stepExplanation.css";

const StepExplanation = forwardRef(({ scheduledProcesses, executedProcesses, currentTime, selectedAlgorithm, executionHistory = [], timeQuantum = 2 }, ref) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const steps = useMemo(() => {
    const stepsArray = [];
    
    if (selectedAlgorithm === "RR" && executionHistory.length > 0) {
      executionHistory.forEach((exec, index) => {
        const process = scheduledProcesses.find(p => p.id === exec.id);
        const executeTime = exec.endTime - exec.startTime;
        const isComplete = process && process.completionTime === exec.endTime;
        
        stepsArray.push({
          type: "execution",
          step: index + 1,
          process: { ...process, ...exec },
          description: `${exec.name} executes for ${executeTime} time units (Time Quantum: ${timeQuantum}). Start: ${exec.startTime}, End: ${exec.endTime}. ${isComplete ? 'Process completes.' : 'Context switch - moved to end of ready queue.'}`,
          completion: isComplete ? `${exec.name} terminates at time ${exec.endTime}. Turnaround: ${process.turnaroundTime}, Waiting: ${process.waitingTime}` : `${exec.name} still has remaining burst time.`,
        });
      });
    } else {
      scheduledProcesses
        .filter((p) => executedProcesses.includes(p.id))
        .forEach((process, index) => {
          const step = index + 1;
          const idleTime = process.startTime - (index > 0 ? scheduledProcesses.find(p => executedProcesses[index - 1] === p.id)?.completionTime || 0 : 0);
          
          if (idleTime > 0 && index > 0) {
            stepsArray.push({
              type: "idle",
              time: process.startTime - idleTime,
              description: `CPU is idle for ${idleTime} time units (no process ready)`,
            });
          }
          
          stepsArray.push({
            type: "execution",
            step,
            process,
            description: `${process.name} starts execution at time ${process.startTime}. Burst time: ${process.burstTime}, Arrival: ${process.arrivalTime}. ${
              selectedAlgorithm === "SJF" ? "Selected by SJF (shortest burst time)." :
              selectedAlgorithm === "Priority" ? `Selected by Priority (priority: ${process.priority}).` :
              selectedAlgorithm === "FCFS" ? "Selected by FCFS (first arrival)." : ""
            }`,
            completion: `${process.name} completes at time ${process.completionTime}. Waiting time: ${process.waitingTime}, Turnaround: ${process.turnaroundTime}`,
          });
        });
    }
    
    return stepsArray;
  }, [scheduledProcesses, executedProcesses, selectedAlgorithm, executionHistory, timeQuantum]);

  useEffect(() => {
    if (steps.length > 0) {
      setCurrentStepIndex(steps.length - 1);
    } else {
      setCurrentStepIndex(0);
    }
  }, [steps.length]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  useImperativeHandle(ref, () => ({
    nextStep: handleNext,
    previousStep: handlePrevious
  }));

  const currentStep = steps[currentStepIndex];

  return (
    <div className="step-explanation-container">
      <h3 className="text-lg font-semibold text-slate-300 mb-3">Step-by-Step Explanation</h3>
      {steps.length === 0 ? (
        <div className="no-steps">Click "Next" to start execution and see step-by-step explanation</div>
      ) : (
        <div className="horizontal-step-viewer">
          <button 
            className="nav-arrow" 
            onClick={handlePrevious} 
            disabled={currentStepIndex === 0}
          >
            ←
          </button>
          
          <div className="step-content-wrapper">
            <div className="step-counter">
              {currentStepIndex + 1} / {steps.length}
            </div>
            {currentStep && (
              <div className={`step-item ${currentStep.type}`}>
                {currentStep.type === "execution" ? (
                  <>
                    <div className="step-header">
                      <span className="step-number">Step {currentStep.step}</span>
                      <span className="step-process" style={{ backgroundColor: currentStep.process.color }}>
                        {currentStep.process.name}
                      </span>
                    </div>
                    <div className="step-description">{currentStep.description}</div>
                    <div className="step-completion">{currentStep.completion}</div>
                  </>
                ) : (
                  <div className="idle-description">⏸ {currentStep.description}</div>
                )}
              </div>
            )}
          </div>
          
          <button 
            className="nav-arrow" 
            onClick={handleNext} 
            disabled={currentStepIndex === steps.length - 1}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
});

StepExplanation.propTypes = {
  scheduledProcesses: PropTypes.array.isRequired,
  executedProcesses: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  selectedAlgorithm: PropTypes.string.isRequired,
  executionHistory: PropTypes.array,
  timeQuantum: PropTypes.number,
};

export default StepExplanation;
