// src/components/ExecutionQueueControls.js
import React from "react";
import PropTypes from "prop-types";
import "../css/executionQueue.css";
import ReportTable from "../ReportTable"; // Import ReportTable

const ExecutionQueueControls = ({
  isStarted,
  executedProcesses,
  scheduledProcesses,
  handlePrevious,
  handleGenerateReport,
  handleNext,
  showReport,
  processes,
  selectedAlgorithm,
}) => {
  return (
    <>
      <div className="execution-buttons">
        <button
          onClick={handlePrevious}
          disabled={!isStarted || executedProcesses.length === 0}
        >
          Previous
        </button>
        <button
          onClick={handleGenerateReport}
          disabled={executedProcesses.length !== scheduledProcesses.length}
        >
          Generate Report
        </button>
        <button
          onClick={handleNext}
          disabled={
            !isStarted || executedProcesses.length === scheduledProcesses.length
          }
        >
          Next
        </button>
        {/* Conditionally render ReportTable */}
      </div>
      <div>
        {showReport && (
          <ReportTable
            processes={processes}
            selectedAlgorithm={selectedAlgorithm}
          />
        )}{" "}
      </div>
    </>
  );
};

ExecutionQueueControls.propTypes = {
  isStarted: PropTypes.bool.isRequired,
  executedProcesses: PropTypes.array.isRequired,
  scheduledProcesses: PropTypes.array.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleGenerateReport: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  showReport: PropTypes.bool.isRequired,
  processes: PropTypes.array.isRequired, // Add processes prop type
  selectedAlgorithm: PropTypes.string.isRequired,
};

export default ExecutionQueueControls;
