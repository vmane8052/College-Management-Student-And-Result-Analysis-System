import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherViewStudentList = () => {
  const navigate = useNavigate();

  const courses = [
    { name: "MCA", route: "/MCAStudents" },
    { name: "MBA", route: "/MBAStudents" },
    { name: "BCA", route: "/BCAStudents" },
    { name: "BBA", route: "/BBAStudents" },
  ];

  const handleViewClick = (route) => {
    navigate(route);
  };

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
      <div className="w-full max-w-3xl bg-white bg-opacity-70 shadow-2xl rounded-lg p-8 ml-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">{course.name}</h3>
              <button
                className="px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition"
                onClick={() => handleViewClick(course.route)}
              >
                View
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate(-1)}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherViewStudentList;