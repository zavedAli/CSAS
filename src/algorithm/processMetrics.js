// src/algorithm/processMetrics.js

/**
 * Calculates and updates process metrics.
 *
 * @param {Array} processes - The array of processes.
 * @param {Array} executedProcesses - The array of executed process IDs.
 * @param {number} currentTime - The current time in the scheduling.
 * @returns {Array} The updated processes array with metrics.
 */
export const calculateMetrics = (processes, executedProcesses, currentTime) => {
  return processes.map((process) => {
    if (executedProcesses.includes(process.id)) {
      const { startTime, burstTime, arrivalTime } = process;
      const completionTime = startTime + burstTime;
      const waitingTime = startTime - arrivalTime;
      const turnaroundTime = completionTime - arrivalTime;
      const responseTime = startTime - arrivalTime;

      return {
        ...process,
        completionTime,
        waitingTime,
        turnaroundTime,
        responseTime,
        executedTime: burstTime,
      };
    }
    return process;
  });
};
