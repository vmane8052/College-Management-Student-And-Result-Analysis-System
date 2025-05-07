import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherByEmail } from "../service/api.js";

const ViewProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const email = localStorage.getItem('teacherEmail');
      if (!email) {
        setError("Please log in to view your profile");
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

  const handleLogout = () => {
    localStorage.removeItem('teacherEmail');
    navigate("/");
  };

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
          Teacher Profile
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Teacher ID</label>
            <p className="text-gray-600 text-base mt-1">{teacher.teacherId}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">First Name</label>
            <p className="text-gray-600 text-base mt-1">{teacher.firstName}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Last Name</label>
            <p className="text-gray-600 text-base mt-1">{teacher.lastName}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Date of Birth</label>
            <p className="text-gray-600 text-base mt-1">{teacher.dob || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Joining Date</label>
            <p className="text-gray-600 text-base mt-1">{teacher.joiningDate || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Gender</label>
            <p className="text-gray-600 text-base mt-1">{teacher.gender || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Email Address</label>
            <p className="text-gray-600 text-base mt-1">{teacher.email}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Mobile Number</label>
            <p className="text-gray-600 text-base mt-1">{teacher.mobileNumber || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Qualification</label>
            <p className="text-gray-600 text-base mt-1">{teacher.qualification || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Subject Specialization</label>
            <p className="text-gray-600 text-base mt-1">{teacher.subjectSpecialization || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Created By</label>
            <p className="text-gray-600 text-base mt-1">{teacher.createdBy || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Created On</label>
            <p className="text-gray-600 text-base mt-1">{teacher.createdOn || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Updated By</label>
            <p className="text-gray-600 text-base mt-1">{teacher.updatedBy || "Not provided"}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Updated On</label>
            <p className="text-gray-600 text-base mt-1">{teacher.updatedOn || "Not provided"}</p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/TeacherDashboard")}
          >
            Back to Dashboard
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;