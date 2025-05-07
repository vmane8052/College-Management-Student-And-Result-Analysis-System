import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../service/api.js";
import { useNavigate } from "react-router-dom";

const ViewStudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error while fetching students:', error);
    }
  };

  const deleteStudentDetails = async (id) => {
    try {
      await deleteStudent(id);
      getAllStudents(); // Refresh the list
    } catch (error) {
      console.error("Error while deleting student:", error);
    }
  };

  const updateStudentDetails = (id) => {
    if (!id) {
      console.error("Invalid student ID");
      return;
    }
    navigate(`/UpdateStudent/${id}`);
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Student List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Created By</th>
              <th className="px-4 py-2">Created On</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id || student.studentId} className="text-center">
                <td className="border px-4 py-2">{student.studentId}</td>
                <td className="border px-4 py-2">{student.firstName}</td>
                <td className="border px-4 py-2">{student.lastName}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.createdBy}</td>
                <td className="border px-4 py-2">{student.createdOn}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteStudentDetails(student._id || student.studentId)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => updateStudentDetails(student._id || student.studentId)}
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

export default ViewStudentTable;