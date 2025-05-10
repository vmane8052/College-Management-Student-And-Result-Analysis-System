import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getAllStudentMarksByCourseAndSemester } from "../service/api.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const MBAPassFailPieChart = () => {
  const [passFailData, setPassFailData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcode semester mapping with lowercase semId for 4 semesters
  const semesterNameMap = {
    sem1: "Semester 1",
    sem2: "Semester 2",
    sem3: "Semester 3",
    sem4: "Semester 4",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseId = "MBA";
        const semesters = ["sem1", "sem2", "sem3", "sem4"];
        console.log(`Starting fetch for courseId: ${courseId}, semesters: ${semesters}`);

        // Initialize pass/fail data
        const passFailStats = {};
        semesters.forEach(semId => {
          passFailStats[semId] = { pass: 0, fail: 0 };
        });

        // Fetch marks for each semester
        for (const semId of semesters) {
          try {
            const marksResponse = await getAllStudentMarksByCourseAndSemester(courseId, semId);
            console.log(`Marks API response for MBA, semester ${semId}:`, marksResponse);

            if (!marksResponse?.data) {
              console.log(`No marks data in response for MBA, semester ${semId}`);
              continue;
            }

            const marksData = marksResponse.data;
            console.log(`Marks data for MBA, semester ${semId}:`, marksData);

            if (!Array.isArray(marksData)) {
              console.error(`Marks data for MBA, semester ${semId} is not an array:`, marksData);
              continue;
            }

            if (marksData.length === 0) {
              console.log(`No marks entries found for MBA, semester ${semId}`);
              continue;
            }

            // Calculate pass/fail counts
            let passCount = 0;
            let failCount = 0;
            marksData.forEach(student => {
              if (student.overallResult === "Pass") {
                passCount++;
              } else if (student.overallResult === "Fail") {
                failCount++;
              }
            });

            passFailStats[semId] = { pass: passCount, fail: failCount };
            console.log(`Pass/Fail stats for MBA, semester ${semId}:`, passFailStats[semId]);
          } catch (err) {
            console.error(`Error fetching marks for MBA, semester ${semId}:`, err.message);
            passFailStats[semId] = { pass: 0, fail: 0 };
          }
        }

        setPassFailData(passFailStats);
        console.log("Pass/Fail data:", passFailStats);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchData:", err.message);
        setError(`Failed to load MBA pass/fail data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  // Prepare pie chart data for each semester
  const pieCharts = Object.keys(passFailData).map(semId => {
    const data = passFailData[semId];
    const total = data.pass + data.fail;
    const passPercentage = total > 0 ? ((data.pass / total) * 100).toFixed(2) : 0;
    const failPercentage = total > 0 ? ((data.fail / total) * 100).toFixed(2) : 0;

    const chartData = {
      labels: ["Pass", "Fail"],
      datasets: [
        {
          data: [data.pass, data.fail],
          backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div key={semId} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-4">
        <h4 className="text-lg font-medium text-gray-800 text-center">
          {semesterNameMap[semId]} Pass/Fail Distribution
        </h4>
        {total === 0 ? (
          <p className="text-gray-500 text-center mt-2">No data available for this semester.</p>
        ) : (
          <div className="h-64">
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
            <div className="text-center mt-2">
              <p>Pass: {passPercentage}%</p>
              <p>Fail: {failPercentage}%</p>
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/college.png')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-5xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          MBA Pass/Fail Distribution by Semester
        </h2>
        <div className="flex flex-wrap -mx-4">
          {pieCharts}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-all duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MBAPassFailPieChart;