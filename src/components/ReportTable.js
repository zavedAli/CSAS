import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./css/reportTable.css";
import { exportToCSV, exportToPDF } from "../utils/exportUtils";

const ReportTable = ({ processes, selectedAlgorithm, onAutoStore }) => {
  const [averages, setAverages] = useState({});

  useEffect(() => {
    const calculateAverages = () => {
      const totalProcesses = processes.length;
      const sums = processes.reduce(
        (acc, process) => {
          acc.arrivalTime += process.arrivalTime || 0;
          acc.burstTime += process.burstTime || 0;
          acc.completionTime += process.completionTime || 0;
          acc.waitingTime += process.waitingTime || 0;
          acc.turnaroundTime += process.turnaroundTime || 0;
          acc.responseTime += process.responseTime || 0;
          acc.executedTime += process.executedTime || 0;
          return acc;
        },
        {
          arrivalTime: 0,
          burstTime: 0,
          completionTime: 0,
          waitingTime: 0,
          turnaroundTime: 0,
          responseTime: 0,
          executedTime: 0,
        }
      );

      const averages = {
        algoType: selectedAlgorithm,
        arrivalTime: (sums.arrivalTime / totalProcesses).toFixed(2),
        burstTime: (sums.burstTime / totalProcesses).toFixed(2),
        completionTime: (sums.completionTime / totalProcesses).toFixed(2),
        waitingTime: (sums.waitingTime / totalProcesses).toFixed(2),
        turnaroundTime: (sums.turnaroundTime / totalProcesses).toFixed(2),
        responseTime: (sums.responseTime / totalProcesses).toFixed(2),
        executedTime: (sums.executedTime / totalProcesses).toFixed(2),
      };

      setAverages(averages);
    };

    calculateAverages();
  }, [processes, selectedAlgorithm]);

  useEffect(() => {
    const handleAutoStore = () => {
      if (averages.algoType && onAutoStore) {
        onAutoStore(averages);
      }
    };

    window.addEventListener('autoStoreResults', handleAutoStore);
    return () => window.removeEventListener('autoStoreResults', handleAutoStore);
  }, [averages, onAutoStore]);

  const handleStoreResult = () => {
    if (onAutoStore) {
      onAutoStore(averages);
    }
  };

  const handleExportCSV = () => {
    const exportData = processes.map(p => ({
      'Process ID': p.id,
      'Arrival Time': p.arrivalTime,
      'Burst Time': p.burstTime,
      'Completion Time': p.completionTime,
      'Waiting Time': p.waitingTime,
      'Turnaround Time': p.turnaroundTime,
      'Response Time': p.responseTime,
    }));
    exportToCSV(exportData, `${selectedAlgorithm}_report.csv`);
  };

  const handleExportPDF = () => {
    const exportData = processes.map(p => ({
      'Process ID': p.id,
      'Arrival Time': p.arrivalTime,
      'Burst Time': p.burstTime,
      'Completion Time': p.completionTime,
      'Waiting Time': p.waitingTime,
      'Turnaround Time': p.turnaroundTime,
      'Response Time': p.responseTime,
    }));
    exportToPDF(exportData, `${selectedAlgorithm} Algorithm Report`, `${selectedAlgorithm}_report.pdf`);
  };

  return (
    <div className="report-table-container">
      <h3 className="flex gap-4 text-center sm:text-start text-[30px] sm:text-[25px] text-[#505050]  pb-4 items-center">
        Report Table
      </h3>

      <div className="overflow-x-auto w-full">
        <table className="report-table">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Completion Time</th>
              <th>Waiting Time</th>
              <th>Turnaround Time</th>
              <th>Response Time</th>
              <th>Executed Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.id}>
                <td>{process.id}</td>
                <td>{process.arrivalTime}</td>
                <td>{process.burstTime}</td>
                <td>{process.completionTime}</td>
                <td>{process.waitingTime}</td>
                <td>{process.turnaroundTime}</td>
                <td>{process.responseTime}</td>
                <td>{process.executedTime}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Averages</td>
              <td>{averages.arrivalTime}</td>
              <td>{averages.burstTime}</td>
              <td>{averages.completionTime}</td>
              <td>{averages.waitingTime}</td>
              <td>{averages.turnaroundTime}</td>
              <td>{averages.responseTime}</td>
              <td>{averages.executedTime}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-center gap-3 mt-7">
        <button
          className="p-2 text-center text-xs bg-green-600 hover:bg-green-700 rounded-lg text-white"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
        <button
          className="p-2 text-center text-xs bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          onClick={handleExportPDF}
        >
          Export PDF
        </button>
        <button
          className="p-2 text-center text-xs bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
          onClick={handleStoreResult}
        >
          Store Result
        </button>
      </div>
    </div>
  );
};

ReportTable.propTypes = {
  processes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      arrivalTime: PropTypes.number,
      burstTime: PropTypes.number,
      completionTime: PropTypes.number,
      waitingTime: PropTypes.number,
      turnaroundTime: PropTypes.number,
      responseTime: PropTypes.number,
      executedTime: PropTypes.number,
    })
  ).isRequired,
  selectedAlgorithm: PropTypes.string.isRequired,
  onAutoStore: PropTypes.func,
};

export default ReportTable;
