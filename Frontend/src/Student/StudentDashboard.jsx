import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentByEmail } from "../service/api.js";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const email = localStorage.getItem('studentEmail');
      if (!email) {
        setError("Please log in to access the dashboard");
        navigate("/student/login");
        return;
      }

      try {
        const response = await getStudentByEmail(email);
        setStudent(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch student details");
        navigate("/student/login");
      }
    };

    fetchStudentDetails();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/college.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "right",
      }}
    >
      <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-2xl rounded-lg p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome, {student.firstName} {student.lastName}
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Email Address</label>
            <p className="text-gray-600 text-base mt-1">{student.email}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Student ID</label>
            <p className="text-gray-600 text-base mt-1">{student.studentId}</p>
          </div>
          <div className="flex flex-col">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;