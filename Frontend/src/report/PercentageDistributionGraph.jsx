import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getAllStudentMarksByCourseAndSemester, getUserByCourseId, getSemesters } from "../service/api.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PercentageDistributionGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [percentageCounts, setPercentageCounts] = useState({});
  const [courseNames, setCourseNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the classes (course IDs for MCA, MBA, BCA, BBA)
        const classes = [
          { courseId: "MCA", name: "MCA" },
          { courseId: "MBA", name: "MBA" },
          { courseId: "BCA", name: "BCA" },
          { courseId: "BBA", name: "BBA" },
        ];

        // Fetch course names for display
        const courseNameMap = {};
        for (const cls of classes) {
          try {
            const courseResponse = await getUserByCourseId(cls.courseId);
            courseNameMap[cls.courseId] = courseResponse.data.courseName || cls.name;
          } catch (err) {
            console.error(`Failed to fetch course name for ${cls.courseId}:`, err);
            courseNameMap[cls.courseId] = cls.name; // Fallback to courseId if name not found
          }
        }
        setCourseNames(courseNameMap);

        // Fetch all semesters to get marks for all semesters
        const semestersResponse = await getSemesters();
        const semesters = semestersResponse.data;

        // Initialize counts for each class and percentage range
        const counts = {
          MCA: { below30: 0, range30to60: 0, range60to90: 0, range90to100: 0 },
          MBA: { below30: 0, range30to60: 0, range60to90: 0, range90to100: 0 },
          BBA: { below30: 0, range30to60: 0, range60to90: 0, range90to100: 0 },
          BCA: { below30: 0, range30to60: 0, range60to90: 0, range90to100: 0 },
        };

        // Fetch marks for each course and semester combination
        for (const cls of classes) {
          for (const semester of semesters) {
            try {
              const marksResponse = await getAllStudentMarksByCourseAndSemester(cls.courseId, semester.semId);
              const marksData = marksResponse.data;

              // Process each student's marks
              marksData.forEach(studentMarks => {
                const percentage = parseFloat(studentMarks.percentage) || 0;

                // Categorize into percentage ranges
                if (percentage < 30) {
                  counts[cls.courseId].below30++;
                } else if (percentage >= 30 && percentage < 60) {
                  counts[cls.courseId].range30to60++;
                } else if (percentage >= 60 && percentage < 90) {
                  counts[cls.courseId].range60to90++;
                } else if (percentage >= 90 && percentage <= 100) {
                  counts[cls.courseId].range90to100++;
                }
              });
            } catch (err) {
              console.error(`Failed to fetch marks for ${cls.courseId}, semester ${semester.semId}:`, err);
              // Continue even if marks for one semester fail to load
            }
          }
        }

        // Store counts for display
        setPercentageCounts(counts);

        // Prepare data for Chart.js stacked bar chart
        const data = {
          labels: classes.map(cls => courseNameMap[cls.courseId]), // Use course names for labels
          datasets: [
            {
              label: "Below 30%",
              data: classes.map(cls => counts[cls.courseId].below30),
              backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "30% to 60%",
              data: classes.map(cls => counts[cls.courseId].range30to60),
              backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "60% to 90%",
              data: classes.map(cls => counts[cls.courseId].range60to90),
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "90% to 100%",
              data: classes.map(cls => counts[cls.courseId].range90to100),
              backgroundColor: "rgba(255, 206, 86, 0.6)", // Yellow
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(`Failed to load percentage distribution data: ${err.message}`);
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

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/college.png')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Percentage Distribution of Students Across Classes
        </h2>
        <div className="h-96 mb-6">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Percentage Distribution of Students (MCA, MBA, BCA, BBA)",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Classes",
                  },
                  stacked: true, // Enable stacking on X-axis
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Students",
                  },
                  ticks: {
                    stepSize: 1, // Ensure whole numbers on Y-axis
                  },
                  stacked: true, // Enable stacking on Y-axis
                },
              },
            }}
          />
        </div>

        {/* Display Percentage Counts Below the Chart */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Percentage Distribution Details</h3>
          <div className="space-y-4">
            {percentageCounts && Object.keys(percentageCounts).map((courseId) => (
              <div key={courseId} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-800">{courseNames[courseId]}</h4>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Below 30%: {percentageCounts[courseId].below30}</li>
                  <li>30% to 60%: {percentageCounts[courseId].range30to60}</li>
                  <li>60% to 90%: {percentageCounts[courseId].range60to90}</li>
                  <li>90% to 100%: {percentageCounts[courseId].range90to100}</li>
                  <li>
                    Total Students:{" "}
                    {percentageCounts[courseId].below30 +
                      percentageCounts[courseId].range30to60 +
                      percentageCounts[courseId].range60to90 +
                      percentageCounts[courseId].range90to100}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
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

export default PercentageDistributionGraph;