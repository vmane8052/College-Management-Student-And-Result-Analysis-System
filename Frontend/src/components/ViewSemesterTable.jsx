import React, { useEffect, useState } from "react";
import { getSemesters, deleteSemester } from "../service/api";
import { useNavigate } from "react-router-dom";

const ViewSemesterTable = () => {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const response = await getSemesters();
      setSemesters(response.data);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSemester(id);
      fetchSemesters();
    } catch (error) {
      console.error("Error deleting semester:", error);
    }
  };

  const handleUpdate = (id) => {
    if (!id) {
      console.error("Invalid semester ID");
      return;
    }
    navigate(`/UpdateSemester/${id}`);
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Semester List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="px-4 py-2">ID</th>
            
              <th className="px-4 py-2">Semester Name</th>
              <th className="px-4 py-2">Created By</th>
              <th className="px-4 py-2">Created On</th>
              <th className="px-4 py-2">Updated By</th>
              <th className="px-4 py-2">Updated On</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((sem) => (
              <tr key={sem._id || sem.id} className="text-center">
                <td className="border px-4 py-2">{sem.id}</td>
                
                <td className="border px-4 py-2">{sem.semName}</td>
                <td className="border px-4 py-2">{sem.createdBy}</td>
                <td className="border px-4 py-2">{sem.createdOn}</td>
                <td className="border px-4 py-2">{sem.updatedBy}</td>
                <td className="border px-4 py-2">{sem.updatedOn}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(sem._id || sem.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleUpdate(sem._id || sem.id)}
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

export default ViewSemesterTable;
