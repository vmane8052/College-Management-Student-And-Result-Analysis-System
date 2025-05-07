import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentByEmail } from "../service/api.js";

const ViewProfile = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const email = localStorage.getItem('studentEmail');
      if (!email) {
        setError("Please log in to view your profile");
        navigate("/student/login");
        return;
      }

      try {
        const response = await getStudentByEmail(email);
        setStudent(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        navigate("/student/login");
      }
    };

    fetchStudentDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('studentEmail'); // Clear email from local storage
    alert("Logged out successfully");
    navigate("/StudentLogin");
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "Not provided";
    return new Date(date).toLocaleDateString();
  };

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
      <div className="w-full max-w-2xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Student Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Student ID", value: student.studentId },
            { label: "First Name", value: student.firstName },
            { label: "Middle Name", value: student.middleName || "Not provided" },
            { label: "Last Name", value: student.lastName },
            { label: "Mother's Name", value: student.motherName || "Not provided" },
            { label: "Date of Birth", value: formatDate(student.dob) },
            { label: "Email Address", value: student.email },
            { label: "Mobile Number", value: student.mobileNumber || "Not provided" },
            { label: "Admission Date", value: formatDate(student.admissionDate) },
            { label: "Address", value: student.address || "Not provided" },
            { label: "Roll Number", value: student.rollNo || "Not provided" },
            { label: "Gender", value: student.gender || "Not provided" },
            { label: "Nationality", value: student.nationality || "Not provided" },
            { label: "Religion", value: student.religion || "Not provided" },
            { label: "Caste Category", value: student.casteCategory || "Not provided" },
            { label: "Blood Group", value: student.bloodGroup || "Not provided" },
            { label: "Course ID", value: student.courseId || "Not assigned" },
            { label: "Semester ID", value: student.semesterId || "Not assigned" },
            { label: "Created By", value: student.createdBy },
            { label: "Created On", value: formatDate(student.createdOn) },
            { label: "Updated By", value: student.updatedBy || "Not updated" },
            { label: "Updated On", value: formatDate(student.updatedOn) },
          ].map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="text-gray-700 font-medium">{field.label}</label>
              <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
                {field.value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/StudentDashboard")}
          >
            Back to Dashboard
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
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