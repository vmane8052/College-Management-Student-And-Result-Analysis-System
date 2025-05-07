import React, { useEffect, useState } from "react";
import { getTeachers, deleteTeacher } from "../service/api.js";
import { useNavigate } from "react-router-dom";

const ViewTeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTeachers();
  }, []);

  const getAllTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error('Error while fetching teachers:', error);
    }
  };

  const deleteTeacherDetails = async (id) => {
    try {
      await deleteTeacher(id);
      getAllTeachers(); // Refresh the list
    } catch (error) {
      console.error("Error while deleting teacher:", error);
    }
  };

  const updateTeacherDetails = (id) => {
    if (!id) {
      console.error("Invalid teacher ID");
      return;
    }
    navigate(`/UpdateTeacher/${id}`);
  };

  return (
    <div
      className="flex justify-center min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/college.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "right",
      }}
    >
      <div className="w-full bg-white bg-opacity-80 shadow-2xl rounded-lg pl-40 ml-28">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Teacher List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Teacher ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Created By</th>
              <th className="px-4 py-2">Created On</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id || teacher.teacherId} className="text-center">
                <td className="border px-4 py-2">{teacher.teacherId}</td>
                <td className="border px-4 py-2">{teacher.firstName}</td>
                <td className="border px-4 py-2">{teacher.lastName}</td>
                <td className="border px-4 py-2">{teacher.email}</td>
                <td className="border px-4 py-2">{teacher.createdBy}</td>
                <td className="border px-4 py-2">{teacher.createdOn}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteTeacherDetails(teacher._id || teacher.teacherId)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => updateTeacherDetails(teacher._id || teacher.teacherId)}
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

export default ViewTeacherTable;