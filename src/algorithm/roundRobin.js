// src/algorithm/roundRobin.js

export const executeRoundRobin = (processes, timeQuantum = 2) => {
  const queue = [];
  const ganttChart = [];
  const processesWithRemaining = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    startTime: null,
    completionTime: null,
    waitingTime: 0,
    turnaroundTime: 0,
    responseTime: null
  }));

  let currentTime = 0;
  let completed = 0;
  const n = processes.length;
  let idx = 0;

  while (completed < n) {
    // Add newly arrived processes to queue
    while (idx < n && processesWithRemaining[idx].arrivalTime <= currentTime) {
      queue.push(processesWithRemaining[idx]);
      idx++;
    }

    if (queue.length === 0) {
      currentTime = processesWithRemaining[idx].arrivalTime;
      continue;
    }

    const currentProcess = queue.shift();
    
    if (currentProcess.startTime === null) {
      currentProcess.startTime = currentTime;
      currentProcess.responseTime = currentTime - currentProcess.arrivalTime;
    }

    const executeTime = Math.min(timeQuantum, currentProcess.remainingTime);
    currentProcess.remainingTime -= executeTime;
    currentTime += executeTime;

    ganttChart.push({
      id: currentProcess.id,
      name: currentProcess.name,
      startTime: currentTime - executeTime,
      endTime: currentTime,
      color: currentProcess.color
    });

    // Add newly arrived processes
    while (idx < n && processesWithRemaining[idx].arrivalTime <= currentTime) {
      queue.push(processesWithRemaining[idx]);
      idx++;
    }

    if (currentProcess.remainingTime > 0) {
      queue.push(currentProcess);
    } else {
      currentProcess.completionTime = currentTime;
      currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
      currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
      completed++;
    }
  }

  return { processesWithRemaining, ganttChart };
};
