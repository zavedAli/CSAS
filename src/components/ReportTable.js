import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./css/reportTable.css";

const ReportTable = ({ processes, selectedAlgorithm }) => {
  const [averages, setAverages] = useState({});
  const [resultData, setResultData] = useState([]);
  console.log(selectedAlgorithm);

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
  }, [processes]);

  const handleStoreResult = () => {
    setResultData((prevData) => [...prevData, averages]);
  };

  return (
    <div className="report-table-container">
      <h3 className="flex gap-4 text-center sm:text-start text-[30px] sm:text-[25px] text-[#505050]  pb-4 items-center">
        Report Table
      </h3>

      <div className="flex w-[70vw] m-auto">
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
      <div className="flex justify-center mt-7">
        <button
          className="p-2 text-center text-[16px] bg-[#1473E6] hover:bg-[#144ce6] w-1/6 rounded-lg text-white m-auto"
          onClick={handleStoreResult}
        >
          Store Result
        </button>
      </div>

      {resultData.length > 0 && (
        <div className="stored-results mb-11">
          <h4 className="flex gap-4 text-center sm:text-start text-[30px] sm:text-[25px] text-[#505050]  pb-4 items-center">
            Stored Results
          </h4>
          <div className="flex w-[70vw] m-auto">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Algorithm selected</th>
                  <th>Average Burst Time</th>

                  <th>Average Waiting Time</th>
                  <th>Average Turnaround Time</th>
                  <th>Average Response Time</th>
                </tr>
              </thead>
              <tbody>
                {console.log(resultData)}
                {resultData.map((data, index) => (
                  <tr key={index}>
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
        </div>
      )}
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
};

export default ReportTable;
