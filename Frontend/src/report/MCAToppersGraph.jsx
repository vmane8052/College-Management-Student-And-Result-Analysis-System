import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getAllStudentMarksByCourseAndSemester, getStudent } from "../service/api.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MCAToppersGraph = () => {
  const [studentsData, setStudentsData] = useState({});
  const [chartData, setChartData] = useState(null);
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
        const courseId = "MCA";
        const semesters = ["sem1", "sem2", "sem3", "sem4"];
        console.log(`Starting fetch for courseId: ${courseId}, semesters: ${semesters}`);

        // Initialize students data
        const students = {};
        semesters.forEach(semId => {
          students[semId] = [];
        });

        // Fetch marks for each semester
        for (const semId of semesters) {
          try {
            const marksResponse = await getAllStudentMarksByCourseAndSemester(courseId, semId);
            console.log(`Marks API response for MCA, semester ${semId}:`, marksResponse);

            if (!marksResponse?.data) {
              console.log(`No marks data in response for MCA, semester ${semId}`);
              continue;
            }

            const marksData = marksResponse.data;
            console.log(`Marks data for MCA, semester ${semId}:`, marksData);

            if (!Array.isArray(marksData)) {
              console.error(`Marks data for MCA, semester ${semId} is not an array:`, marksData);
              continue;
            }

            if (marksData.length === 0) {
              console.log(`No marks entries found for MCA, semester ${semId}`);
              continue;
            }

            const studentMarks = [];
            for (const student of marksData) {
              if (!student.studentId || !student.percentage || !student.semesterId) {
                console.warn(`Incomplete student record:`, student);
                continue;
              }

              const percentage = parseFloat(student.percentage);
              if (isNaN(percentage)) {
                console.warn(`Invalid percentage for student ${student.studentId}: ${student.percentage}`);
                continue;
              }

              let studentName = `Student ${student.studentId}`;
              try {
                const studentResponse = await getStudent(student.studentId);
                console.log(`Student API response for ${student.studentId}:`, studentResponse);
                if (!studentResponse?.data) {
                  throw new Error(`No data in student response for ${student.studentId}`);
                }
                const studentData = studentResponse.data;
                if (studentData?.firstName && studentData?.lastName) {
                  studentName = `${studentData.firstName} ${studentData.lastName}`;
                }
              } catch (err) {
                console.error(`Error fetching student ${student.studentId}:`, err.message);
              }

              studentMarks.push({
                name: studentName,
                percentage: percentage,
              });
            }

            // Sort by percentage (descending) for ranking
            const sortedStudents = studentMarks.sort((a, b) => b.percentage - a.percentage);
            students[semId] = sortedStudents;
            console.log(`Students for MCA, semester ${semId}:`, sortedStudents);
          } catch (err) {
            console.error(`Error fetching marks for MCA, semester ${semId}:`, err.message);
            students[semId] = [];
          }
        }

        // Prepare chart data
        const colors = [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ];

        const borderColors = [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ];

        // Create datasets for the chart
        const datasets = [];
        let studentIndex = 0;
        const allStudents = new Set();

        // Collect all unique student names across semesters
        semesters.forEach(semId => {
          students[semId].forEach(student => {
            allStudents.add(student.name);
          });
        });

        const studentNames = Array.from(allStudents);
        studentNames.forEach((studentName, idx) => {
          const data = semesters.map(semId => {
            const student = students[semId].find(s => s.name === studentName);
            return student ? student.percentage : 0;
          });

          datasets.push({
            label: studentName,
            data: data,
            backgroundColor: colors[idx % colors.length],
            borderColor: borderColors[idx % colors.length],
            borderWidth: 1,
          });
          studentIndex++;
        });

        const chartData = {
          labels: semesters.map(semId => semesterNameMap[semId]),
          datasets: datasets,
        };

        setChartData(chartData);
        setStudentsData(students);
        console.log("Students data:", students);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchData:", err.message);
        setError(`Failed to load MCA students data: ${err.message}`);
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
      <div className="w-full max-w-5xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          MCA Students by Semester with Percentages
        </h2>

        {/* Bar Graph */}
        {chartData && (
          <div className="h-96 mb-6">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "MCA Students Percentages by Semester" },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const datasetLabel = context.dataset.label;
                        const percentage = context.raw;
                        return `${datasetLabel}: ${percentage}%`;
                      },
                    },
                  },
                },
                scales: {
                  x: { title: { display: true, text: "Semesters" }, stacked: false },
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: "Percentage (%)" },
                    ticks: { stepSize: 10 },
                    stacked: false,
                  },
                },
              }}
            />
          </div>
        )}

        {/* Display students table */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">MCA Students Details</h3>
          <div className="space-y-4">
            {Object.keys(studentsData).map((semId) => (
              <div key={semId} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-800">{semesterNameMap[semId]}</h4>
                {studentsData[semId].length === 0 ? (
                  <p className="text-gray-500 mt-2">No students available for this semester.</p>
                ) : (
                  <table className="w-full border-collapse border border-gray-300 mt-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2 text-left">Rank</th>
                        <th className="border border-gray-300 p-2 text-left">Student Name</th>
                        <th className="border border-gray-300 p-2 text-left">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsData[semId].map((student, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">{index + 1}</td>
                          <td className="border border-gray-300 p-2">{student.name}</td>
                          <td className="border border-gray-300 p-2">{student.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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

export default MCAToppersGraph;