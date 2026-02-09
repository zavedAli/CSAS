// src/algorithm/srtf.js

export const executeSRTF = (processes) => {
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
  let lastProcess = null;

  while (completed < n) {
    const availableProcesses = processesWithRemaining.filter(
      p => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (availableProcesses.length === 0) {
      const nextArrival = processesWithRemaining
        .filter(p => p.remainingTime > 0)
        .sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
      currentTime = nextArrival.arrivalTime;
      continue;
    }

    const currentProcess = availableProcesses.sort(
      (a, b) => a.remainingTime - b.remainingTime
    )[0];

    if (currentProcess.startTime === null) {
      currentProcess.startTime = currentTime;
      currentProcess.responseTime = currentTime - currentProcess.arrivalTime;
    }

    if (lastProcess !== currentProcess.id) {
      ganttChart.push({
        id: currentProcess.id,
        name: currentProcess.name,
        startTime: currentTime,
        endTime: currentTime + 1,
        color: currentProcess.color
      });
      lastProcess = currentProcess.id;
    } else {
      ganttChart[ganttChart.length - 1].endTime = currentTime + 1;
    }

    currentProcess.remainingTime--;
    currentTime++;

    if (currentProcess.remainingTime === 0) {
      currentProcess.completionTime = currentTime;
      currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
      currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
      completed++;
    }
  }

  return { processesWithRemaining, ganttChart };
};
