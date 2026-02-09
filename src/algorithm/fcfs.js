// src/algorithms/fcfs.js

// Function to sort processes by arrival time and burst time
const sortProcesses = (processes) => {
  return processes.slice().sort((a, b) => {
    if (a.arrivalTime === b.arrivalTime) {
      return a.burstTime - b.burstTime;
    }
    return a.arrivalTime - b.arrivalTime;
  });
};

// Function to get the next process based on FCFS
export const getNextProcess = (processes, executedProcesses) => {
  const sortedProcesses = sortProcesses(processes);
  const remainingProcesses = sortedProcesses.filter(
    (p) => !executedProcesses.includes(p.id)
  );

  if (remainingProcesses.length === 0) {
    return null;
  }

  return remainingProcesses[0];
};

// Function to get the previous process based on FCFS
export const getPreviousProcess = (executedProcesses) => {
  if (executedProcesses.length === 0) {
    return null;
  }

  return executedProcesses[executedProcesses.length - 1];
};
