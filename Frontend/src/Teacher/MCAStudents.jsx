import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, getSemesterBySemId } from "../service/api.js";

const MCAStudents = () => {
  const [groupedStudents, setGroupedStudents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch all students
        const studentsResponse = await getStudents();
        const studentsData = studentsResponse.data;

        // Filter students for MCA
        const mcaStudents = studentsData.filter(student => student.courseId === "MCA");

        // Group students by semesterId
        const grouped = mcaStudents.reduce((acc, student) => {
          const semesterId = student.semesterId;
          if (!acc[semesterId]) {
            acc[semesterId] = {
              semesterId,
              students: [],
            };
          }
          acc[semesterId].students.push(`${student.firstName} ${student.lastName}`);
          return acc;
        }, {});

        // Fetch semester names for each group
        const groupedWithDetails = await Promise.all(
          Object.values(grouped).map(async (group) => {
            let semesterName = "Unknown Semester";
            try {
              const semesterResponse = await getSemesterBySemId(group.semesterId);
              semesterName = semesterResponse.data.semName || "Unknown Semester";
            } catch (err) {
              console.error(`Failed to fetch semester for semesterId ${group.semesterId}: ${err.message}`);
              semesterName = "Semester Not Found";
            }
            return {
              ...group,
              semesterName,
            };
          })
        );

        setGroupedStudents(groupedWithDetails);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-red-500 text-lg">{error}</p>
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
        <h2 className="text-3xl font-bold text-center text-black-800 mb-6">
          MCA Students
        </h2>
        <div className="space-y-6">
          {groupedStudents.length > 0 ? (
            groupedStudents.map((group, index) => (
              <div key={index} className="flex flex-col space-y-2 border-b pb-4">
                <p className="text-gray-600 text-xl font-semibold">
                  <strong>Semester Name:</strong> {group.semesterName}
                </p>
                {group.students.map((student, subIndex) => (
                  <p key={subIndex} className="text-gray-600 text-lg pl-4">
                    {student}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-base">No students found for MCA</p>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCAStudents;