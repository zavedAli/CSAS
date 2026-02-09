import React, { useState } from "react";
import PropTypes from "prop-types";
import "./css/storedResults.css";
import { exportToCSV, exportToPDF } from "../utils/exportUtils";

const StoredResults = ({ storedResults, onClear }) => {
  const [selectedResults, setSelectedResults] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  if (storedResults.length === 0) return null;

  const handleCheckboxChange = (index) => {
    setSelectedResults((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCompare = () => {
    if (selectedResults.length < 2) {
      alert("Please select at least 2 results to compare.");
      return;
    }
    setShowComparison(true);
  };

  const handleExportCSV = () => {
    const exportData = storedResults.map((r, idx) => ({
      '#': idx + 1,
      'Algorithm': r.algoType,
      'Avg Burst Time': r.burstTime,
      'Avg Waiting Time': r.waitingTime,
      'Avg Turnaround Time': r.turnaroundTime,
      'Avg Response Time': r.responseTime,
    }));
    exportToCSV(exportData, 'stored_results.csv');
  };

  const handleExportPDF = () => {
    const exportData = storedResults.map((r, idx) => ({
      '#': idx + 1,
      'Algorithm': r.algoType,
      'Avg Burst Time': r.burstTime,
      'Avg Waiting Time': r.waitingTime,
      'Avg Turnaround Time': r.turnaroundTime,
      'Avg Response Time': r.responseTime,
    }));
    exportToPDF(exportData, 'Stored Results Comparison', 'stored_results.pdf');
  };

  const handleExportComparison = () => {
    const exportData = selectedData.map((r, idx) => ({
      '#': idx + 1,
      'Algorithm': r.algoType,
      'Avg Waiting Time': r.waitingTime,
      'Avg Turnaround Time': r.turnaroundTime,
      'Avg Response Time': r.responseTime,
      'Avg Burst Time': r.burstTime,
    }));
    exportToCSV(exportData, 'comparison_chart.csv');
  };

  const handleExportComparisonPDF = () => {
    const exportData = selectedData.map((r, idx) => ({
      '#': idx + 1,
      'Algorithm': r.algoType,
      'Avg Waiting Time': r.waitingTime,
      'Avg Turnaround Time': r.turnaroundTime,
      'Avg Response Time': r.responseTime,
      'Avg Burst Time': r.burstTime,
    }));
    exportToPDF(exportData, 'Algorithm Comparison Chart', 'comparison_chart.pdf');
  };

  const selectedData = selectedResults.map((idx) => storedResults[idx]);

  return (
    <div className="stored-results-container">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-slate-300">
          Stored Results History
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 text-xs font-semibold bg-green-600 hover:bg-green-700 rounded-md text-white transition-all duration-200"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-all duration-200"
          >
            Export PDF
          </button>
          {selectedResults.length >= 2 && (
            <button
              onClick={handleCompare}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-all duration-200"
            >
              Compare ({selectedResults.length})
            </button>
          )}
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 rounded-md text-white transition-all duration-200"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="stored-results-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>#</th>
              <th>Algorithm</th>
              <th>Avg Burst</th>
              <th>Avg Waiting</th>
              <th>Avg Turnaround</th>
              <th>Avg Response</th>
            </tr>
          </thead>
          <tbody>
            {storedResults.map((data, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedResults.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                    className="cursor-pointer"
                  />
                </td>
                <td>{index + 1}</td>
                <td>{data.algoType}</td>
                <td>{data.burstTime}</td>
                <td>{data.waitingTime}</td>
                <td>{data.turnaroundTime}</td>
                <td>{data.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showComparison && selectedData.length >= 2 && (
        <div className="comparison-chart mt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-semibold text-slate-300">Comparison Chart</h4>
            <div className="flex gap-2">
              <button
                onClick={handleExportComparison}
                className="px-2 py-1 text-xs font-semibold bg-green-600 hover:bg-green-700 rounded-md text-white"
              >
                Export CSV
              </button>
              <button
                onClick={handleExportComparisonPDF}
                className="px-2 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Export PDF
              </button>
              <button
                onClick={() => setShowComparison(false)}
                className="px-2 py-1 text-xs font-semibold bg-slate-600 hover:bg-slate-500 rounded-md text-white"
              >
                Close
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["waitingTime", "turnaroundTime", "responseTime", "burstTime"].map((metric) => (
              <div key={metric} className="chart-container">
                <h5 className="text-sm text-slate-400 mb-2 capitalize">
                  {metric.replace(/([A-Z])/g, " $1").trim()}
                </h5>
                <div className="bar-chart">
                  {selectedData.map((data, idx) => {
                    const maxValue = Math.max(...selectedData.map((d) => parseFloat(d[metric])));
                    const percentage = (parseFloat(data[metric]) / maxValue) * 100;
                    return (
                      <div key={idx} className="bar-item">
                        <div className="bar-label">{data.algoType}</div>
                        <div className="bar-wrapper">
                          <div
                            className="bar-fill"
                            style={{ width: `${percentage}%` }}
                          >
                            <span className="bar-value">{data[metric]}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

StoredResults.propTypes = {
  storedResults: PropTypes.arrayOf(
    PropTypes.shape({
      algoType: PropTypes.string.isRequired,
      burstTime: PropTypes.string.isRequired,
      waitingTime: PropTypes.string.isRequired,
      turnaroundTime: PropTypes.string.isRequired,
      responseTime: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClear: PropTypes.func.isRequired,
};

export default StoredResults;
