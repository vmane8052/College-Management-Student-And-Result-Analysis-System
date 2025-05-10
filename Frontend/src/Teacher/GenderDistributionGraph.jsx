import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getStudents } from "../service/api.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GenderDistributionGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [genderCounts, setGenderCounts] = useState(null); // Store gender counts for display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const response = await getStudents();
        const students = response.data;

        // Define the classes and genders
        const classes = ["MBA", "MCA", "BBA", "BCA"];
        const genders = ["Male", "Female", "Other"];

        // Initialize counts for each class and gender
        const counts = {
          MBA: { Male: 0, Female: 0, Other: 0 },
          MCA: { Male: 0, Female: 0, Other: 0 },
          BBA: { Male: 0, Female: 0, Other: 0 },
          BCA: { Male: 0, Female: 0, Other: 0 },
        };

        // Count students by class and gender
        students.forEach(student => {
          const course = student.courseId;
          const gender = student.gender;

          if (classes.includes(course) && genders.includes(gender)) {
            counts[course][gender]++;
          }
        });

        // Store gender counts for display
        setGenderCounts(counts);

        // Prepare data for Chart.js
        const data = {
          labels: classes,
          datasets: [
            {
              label: "Male",
              data: classes.map(cls => counts[cls].Male),
              backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Female",
              data: classes.map(cls => counts[cls].Female),
              backgroundColor: "rgba(255, 99, 132, 0.6)", // Pink
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Other",
              data: classes.map(cls => counts[cls].Other),
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load gender distribution data");
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
          Course-wise Student Strength
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
                  text: "Course-wise Student Strength (MBA, MCA, BBA, BCA)",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Classes",
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

        {/* Display Gender Counts Below the Chart */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Gender Distribution Details</h3>
          <div className="space-y-4">
            {genderCounts && Object.keys(genderCounts).map((course) => (
              <div key={course} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium text-gray-800">{course}</h4>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Male Students: {genderCounts[course].Male}</li>
                  <li>Female Students: {genderCounts[course].Female}</li>
                  <li>Other Students: {genderCounts[course].Other}</li>
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

export default GenderDistributionGraph;