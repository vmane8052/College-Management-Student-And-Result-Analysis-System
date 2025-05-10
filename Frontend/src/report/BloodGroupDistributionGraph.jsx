import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { getStudents } from "../service/api.js"; // Adjust the path based on your project structure

// Register Chart.js components for donut chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const BloodGroupDistributionGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [bloodGroupTotals, setBloodGroupTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const response = await getStudents();
        const students = response.data;

        // Define the blood groups (based on AddStudentForm.jsx options)
        const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

        // Initialize counts for each blood group
        const totals = {
          "A+": 0,
          "A-": 0,
          "B+": 0,
          "B-": 0,
          "AB+": 0,
          "AB-": 0,
          "O+": 0,
          "O-": 0,
        };

        // Count students by blood group
        students.forEach(student => {
          const bloodGroup = student.bloodGroup;
          if (bloodGroups.includes(bloodGroup)) {
            totals[bloodGroup]++;
          }
        });

        // Store blood group totals for display
        setBloodGroupTotals(totals);

        // Prepare data for Chart.js donut chart
        const data = {
          labels: bloodGroups,
          datasets: [
            {
              label: "Number of Students",
              data: bloodGroups.map(bloodGroup => totals[bloodGroup]),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",  // Red for A+
                "rgba(54, 162, 235, 0.6)",  // Blue for A-
                "rgba(75, 192, 192, 0.6)",  // Teal for B+
                "rgba(255, 206, 86, 0.6)",  // Yellow for B-
                "rgba(153, 102, 255, 0.6)", // Purple for AB+
                "rgba(255, 159, 64, 0.6)",  // Orange for AB-
                "rgba(54, 192, 128, 0.6)",  // Green for O+
                "rgba(201, 203, 207, 0.6)", // Gray for O-
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(54, 192, 128, 1)",
                "rgba(201, 203, 207, 1)",
              ],
              borderWidth: 1,
              cutout: "50%", // Makes it a donut chart
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load blood group distribution data");
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
          Student Distribution by Blood Group
        </h2>
        <div className="h-80 mb-6">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right", // Place legend on the right for better visibility
                },
                title: {
                  display: true,
                  text: "Student Distribution by Blood Group",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                      const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                      return `${label}: ${value} (${percentage}%)`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* Display Blood Group Totals Below the Chart */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Blood Group Distribution Details</h3>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              {Object.keys(bloodGroupTotals).map(bloodGroup => (
                <li key={bloodGroup}>
                  {bloodGroup} Students: {bloodGroupTotals[bloodGroup]}
                </li>
              ))}
              <li>
                Total Students:{" "}
                {Object.values(bloodGroupTotals).reduce((sum, count) => sum + count, 0)}
              </li>
            </ul>
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

export default BloodGroupDistributionGraph;