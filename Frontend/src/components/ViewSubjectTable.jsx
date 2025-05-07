import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewSubjectTable = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllSubjects();
  }, []);

  const getAllSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:8000/subjects"); // ✅ Fixed route
      setSubjects(response.data);
    } catch (error) {
      console.error("Error while fetching subjects:", error);
    }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/subject/delete/${id}`); // ✅ Make sure this matches backend
      getAllSubjects(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error while deleting subject:", error);
    }
  };

  const updateSubject = (id) => {
    navigate(`/UpdateSubject/${id}`);
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Subject List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Subject Name</th>
              <th className="px-4 py-2">Course ID</th>
              <th className="px-4 py-2">Semester ID</th>
              <th className="px-4 py-2">Teacher ID</th>
              <th className="px-4 py-2">Credit</th>
              <th className="px-4 py-2">Created On</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id || subject.id} className="text-center">
                <td className="border px-4 py-2">{subject.subjectId}</td>
                <td className="border px-4 py-2">{subject.subjectName}</td>
                <td className="border px-4 py-2">{subject.courseId}</td>
                <td className="border px-4 py-2">{subject.semesterId}</td>
                <td className="border px-4 py-2">{subject.teacherId}</td>
                <td className="border px-4 py-2">{subject.credit}</td>
                <td className="border px-4 py-2">{subject.createdOn}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteSubject(subject._id || subject.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => updateSubject(subject._id || subject.id)}
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

export default ViewSubjectTable;
