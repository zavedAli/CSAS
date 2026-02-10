// src/components/ExecutionQueueControls.js
import React from "react";
import PropTypes from "prop-types";
import "../css/executionQueue.css";
import ReportTable from "../ReportTable"; // Import ReportTable
import { BsClipboardData } from "react-icons/bs";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
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
  onStoreResult,
}) => {
  return (
    <>
      <div className="execution-buttons">
        <button
          className="flex justify-center items-center gap-3 p-2 text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/6 rounded-lg text-white m-auto"
          onClick={handlePrevious}
          disabled={!isStarted || executedProcesses.length === 0}
        >
          <GrFormPreviousLink /> Previous
        </button>
        <button
          className="flex justify-center items-center gap-1 p-2 text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/6 rounded-lg text-white m-auto"
          onClick={handleGenerateReport}
          disabled={scheduledProcesses.filter(p => p.completionTime !== null).length !== scheduledProcesses.length}
        >
          Generate Report <BsClipboardData />
        </button>
        <button
          className="flex justify-center items-center gap-3 p-2 text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/6 rounded-lg text-white m-auto"
          onClick={handleNext}
          disabled={
            !isStarted || scheduledProcesses.filter(p => p.completionTime !== null).length === scheduledProcesses.length
          }
        >
          Next <GrFormNextLink />
        </button>
      </div>
      <div>
        {showReport && (
          <ReportTable
            processes={processes}
            selectedAlgorithm={selectedAlgorithm}
            onAutoStore={onStoreResult}
          />
        )}
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
  processes: PropTypes.array.isRequired,
  selectedAlgorithm: PropTypes.string.isRequired,
  onStoreResult: PropTypes.func,
};

export default ExecutionQueueControls;
