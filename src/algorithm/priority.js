// src/algorithm/priority.js
export const getNextProcessPriority = (
  scheduledProcesses,
  executedProcesses
) => {
  const waitingProcesses = scheduledProcesses.filter(
    (process) => !executedProcesses.includes(process.id)
  );

  if (waitingProcesses.length === 0) return null;

  return waitingProcesses.sort((a, b) => b.priority - a.priority)[0];
};

export const getPreviousProcessPriority = (
  scheduledProcesses,
  executedProcesses
) => {
  if (executedProcesses.length === 0) return null;

  const lastExecutedProcessId = executedProcesses[executedProcesses.length - 1];
  return scheduledProcesses.find(
    (process) => process.id === lastExecutedProcessId
  );
};
