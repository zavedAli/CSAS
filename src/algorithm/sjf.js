// src/algorithms/sjf.js

// Function to sort processes by burst time
const sortProcessesByBurstTime = (processes) => {
  return processes.slice().sort((a, b) => a.burstTime - b.burstTime);
};

// Function to get the next process based on SJF
export const getNextProcessSJF = (processes, executedProcesses) => {
  const sortedProcesses = sortProcessesByBurstTime(processes);
  const remainingProcesses = sortedProcesses.filter(
    (p) => !executedProcesses.includes(p.id)
  );

  if (remainingProcesses.length === 0) {
    return null;
  }

  return remainingProcesses[0];
};

// Function to get the previous process based on SJF
export const getPreviousProcessSJF = (executedProcesses) => {
  if (executedProcesses.length === 0) {
    return null;
  }

  return executedProcesses[executedProcesses.length - 1];
};
