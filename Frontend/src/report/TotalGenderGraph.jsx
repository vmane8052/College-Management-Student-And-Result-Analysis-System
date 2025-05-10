import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getStudents } from "../service/api.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalGenderGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [genderTotals, setGenderTotals] = useState({ Male: 0, Female: 0, Other: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const response = await getStudents();
        const students = response.data;

        // Define the genders
        const genders = ["Male", "Female", "Other"];

        // Initialize counts for each gender
        const totals = { Male: 0, Female: 0, Other: 0 };

        // Count students by gender
        students.forEach(student => {
          const gender = student.gender;
          if (genders.includes(gender)) {
            totals[gender]++;
          }
        });

        // Store gender totals for display
        setGenderTotals(totals);

        // Prepare data for Chart.js
        const data = {
          labels: genders,
          datasets: [
            {
              label: "Number of Students",
              data: [totals.Male, totals.Female, totals.Other],
              backgroundColor: [
                "rgba(235, 54, 226, 0.6)", // Blue for Male
                "rgba(99, 255, 133, 0.6)", // Pink for Female
                "rgba(192, 75, 100, 0.6)", // Teal for Other
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load total gender data");
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
          Total Students by Gender
        </h2>
        <div className="h-80 mb-6">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false, // Hide legend since we have only one dataset
                },
                title: {
                  display: true,
                  text: "Total Students by Gender",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Gender",
                  },
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
                },
              },
            }}
          />
        </div>

        {/* Display Gender Totals Below the Chart */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Gender Totals</h3>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              <li>Male Students: {genderTotals.Male}</li>
              <li>Female Students: {genderTotals.Female}</li>
              <li>Other Students: {genderTotals.Other}</li>
              <li>Total Students: {genderTotals.Male + genderTotals.Female + genderTotals.Other}</li>
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

export default TotalGenderGraph;