import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { getStudents } from "../service/api.js"; // Adjust the path based on your project structure

// Register Chart.js components for pie chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CasteDistributionGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [casteTotals, setCasteTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const response = await getStudents();
        const students = response.data;

        // Define the caste categories (based on AddStudentForm.jsx options)
        const casteCategories = ["General", "OBC", "SC", "ST", "EWS", "Other"];

        // Initialize counts for each caste category
        const totals = {
          General: 0,
          OBC: 0,
          SC: 0,
          ST: 0,
          EWS: 0,
          Other: 0,
        };

        // Count students by caste category
        students.forEach(student => {
          const caste = student.casteCategory;
          if (casteCategories.includes(caste)) {
            totals[caste]++;
          }
        });

        // Store caste totals for display
        setCasteTotals(totals);

        // Prepare data for Chart.js pie chart
        const data = {
          labels: casteCategories,
          datasets: [
            {
              label: "Number of Students",
              data: casteCategories.map(caste => totals[caste]),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",  // Red for General
                "rgba(54, 162, 235, 0.6)",  // Blue for OBC
                "rgba(75, 192, 192, 0.6)",  // Teal for SC
                "rgba(255, 206, 86, 0.6)",  // Yellow for ST
                "rgba(153, 102, 255, 0.6)", // Purple for EWS
                "rgba(201, 203, 207, 0.6)", // Gray for Other
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(201, 203, 207, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load caste distribution data");
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
          Student Distribution by Caste Category
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
                  text: "Student Distribution by Caste Category",
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

        {/* Display Caste Totals Below the Chart */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Caste Distribution Details</h3>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              {Object.keys(casteTotals).map(caste => (
                <li key={caste}>
                  {caste} Students: {casteTotals[caste]}
                </li>
              ))}
              <li>
                Total Students:{" "}
                {Object.values(casteTotals).reduce((sum, count) => sum + count, 0)}
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

export default CasteDistributionGraph;