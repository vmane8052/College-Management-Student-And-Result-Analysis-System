import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../service/api.js";
import { useNavigate } from "react-router-dom";

const ViewCourseTable = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      const response = await getUsers();
      setCourses(response.data);
    } catch (error) {
      console.error('Error while fetching courses:', error);
    }
  };

  const deleteCourseDetails = async (id) => {
    try {
      await deleteUser(id);
      getAllCourses(); // Refresh the list
    } catch (error) {
      console.error("Error while deleting course:", error);
    }
  };

  const updateCourseDetails = (id) => {
    if (!id) {
      console.error("Invalid course ID");
      return;
    }
    navigate(`/UpdateCourse/${id}`);
  };

  return (
    <div
      className="flex justify-center min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('./public/college.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "right",
      }}
    >
      <div className="w-full bg-white bg-opacity-80 shadow-2xl rounded-lg pl-40 ml-28">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Course List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Course Code</th>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Created By</th>
              <th className="px-4 py-2">Created On</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id || course.id} className="text-center">
                <td className="border px-4 py-2">{course.id}</td>
                <td className="border px-4 py-2">{course.courseId}</td>
                <td className="border px-4 py-2">{course.courseName}</td>
                <td className="border px-4 py-2">{course.createdBy}</td>
                <td className="border px-4 py-2">{course.createdOn}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteCourseDetails(course._id || course.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => updateCourseDetails(course._id || course.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCourseTable;
