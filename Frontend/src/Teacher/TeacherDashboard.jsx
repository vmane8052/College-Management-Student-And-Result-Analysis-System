import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherByEmail } from "../service/api.js";

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const email = localStorage.getItem('teacherEmail');
      if (!email) {
        setError("Please log in to access the dashboard");
        navigate("/teacher/login");
        return;
      }

      try {
        const response = await getTeacherByEmail(email);
        setTeacher(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch teacher details");
        navigate("/teacher/login");
      }
    };

    fetchTeacherDetails();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!teacher) {
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
      <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome, {teacher.firstName} {teacher.lastName}
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Email Address</label>
            <p className="text-gray-600 text-base mt-1">{teacher.email}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Teacher ID</label>
            <p className="text-gray-600 text-base mt-1">{teacher.teacherId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;