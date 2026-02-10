// src/algorithm/srtf.js

export const executeSRTF = (processes) => {
  const timeline = [];
  const processesWithMetrics = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    startTime: null,
    completionTime: null,
    waitingTime: 0,
    turnaroundTime: 0,
    responseTime: null,
    firstExecutionTime: null
  }));

  let currentTime = 0;
  let completed = 0;
  const n = processes.length;
  let currentProcess = null;
  let segmentStart = 0;

  while (completed < n) {
    // Get all processes that have arrived and not completed
    const availableProcesses = processesWithMetrics.filter(
      p => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    // If no process available, jump to next arrival
    if (availableProcesses.length === 0) {
      const nextArrival = processesWithMetrics
        .filter(p => p.remainingTime > 0)
        .sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
      if (nextArrival) {
        currentTime = nextArrival.arrivalTime;
      }
      continue;
    }

    // Select process with shortest remaining time (tie-break by arrival time, then ID)
    const nextProcess = availableProcesses.sort(
      (a, b) => a.remainingTime - b.remainingTime || a.arrivalTime - b.arrivalTime || a.id - b.id
    )[0];

    // Context switch detected - save previous segment
    if (currentProcess && nextProcess.id !== currentProcess.id) {
      timeline.push({
        id: currentProcess.id,
        name: currentProcess.name,
        startTime: segmentStart,
        endTime: currentTime,
        color: currentProcess.color
      });
      segmentStart = currentTime;
    }

    // Starting new process
    if (!currentProcess || nextProcess.id !== currentProcess.id) {
      currentProcess = nextProcess;
      segmentStart = currentTime;
      
      // Track first execution for response time
      if (currentProcess.firstExecutionTime === null) {
        currentProcess.firstExecutionTime = currentTime;
        currentProcess.responseTime = currentTime - currentProcess.arrivalTime;
      }
    }

    // Execute for 1 time unit
    currentProcess.remainingTime -= 1;
    currentTime += 1;

    // Process completed
    if (currentProcess.remainingTime === 0) {
      currentProcess.completionTime = currentTime;
      currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
      currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
      completed++;

      // Add final segment
      timeline.push({
        id: currentProcess.id,
        name: currentProcess.name,
        startTime: segmentStart,
        endTime: currentTime,
        color: currentProcess.color
      });
      
      currentProcess = null;
    }
  }

  return { processesWithMetrics, timeline };
};
