import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { getStudents } from "../service/api.js";

// Register Chart.js components for pie chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ReligionDistributionGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [religionTotals, setReligionTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const response = await getStudents();
        const students = response.data;

        // Define the religions (based on AddStudentForm.jsx options)
        const religions = ["Hinduism", "Islam", "Christianity", "Sikhism", "Buddhism", "Jainism", "Other"];

        // Initialize counts for each religion
        const totals = {
          Hinduism: 0,
          Islam: 0,
          Christianity: 0,
          Sikhism: 0,
          Buddhism: 0,
          Jainism: 0,
          Other: 0,
        };

        // Count students by religion
        students.forEach(student => {
          const religion = student.religion;
          if (religions.includes(religion)) {
            totals[religion]++;
          }
        });

        // Store religion totals for display
        setReligionTotals(totals);

        // Prepare data for Chart.js pie chart
        const data = {
          labels: religions,
          datasets: [
            {
              label: "Number of Students",
              data: religions.map(religion => totals[religion]),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",  // Red for Hinduism
                "rgba(54, 162, 235, 0.6)",  // Blue for Islam
                "rgba(75, 192, 192, 0.6)",  // Teal for Christianity
                "rgba(255, 206, 86, 0.6)",  // Yellow for Sikhism
                "rgba(153, 102, 255, 0.6)", // Purple for Buddhism
                "rgba(255, 159, 64, 0.6)",  // Orange for Jainism
                "rgba(201, 203, 207, 0.6)", // Gray for Other
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
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
        setError("Failed to load religion distribution data");
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
          Student Distribution by Religion
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
                  text: "Student Distribution by Religion",
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

        {/* Display Religion Totals Below the Chart */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Religion Distribution Details</h3>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              {Object.keys(religionTotals).map(religion => (
                <li key={religion}>
                  {religion} Students: {religionTotals[religion]}
                </li>
              ))}
              <li>
                Total Students:{" "}
                {Object.values(religionTotals).reduce((sum, count) => sum + count, 0)}
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

export default ReligionDistributionGraph;