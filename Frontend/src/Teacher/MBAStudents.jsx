import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStudents, getSemesterBySemId, getAllStudentMarksByCourseAndSemester } from "../service/api.js";

const MBAStudents = () => {
  const [groupedStudents, setGroupedStudents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchStudents = async () => {
    try {
      const studentsResponse = await getStudents();
      const studentsData = studentsResponse.data;

      const mbaStudents = studentsData.filter(student => student.courseId === "MBA");

      const grouped = mbaStudents.reduce((acc, student) => {
        const semesterId = student.semesterId;
        if (!acc[semesterId]) {
          acc[semesterId] = {
            semesterId,
            students: [],
          };
        }
        acc[semesterId].students.push({
          id: student._id,
          name: `${student.firstName} ${student.lastName}`,
        });
        return acc;
      }, {});

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

          let studentMarks = {};
          try {
            const marksResponse = await getAllStudentMarksByCourseAndSemester("MBA", group.semesterId);
            studentMarks = marksResponse.data.reduce((acc, mark) => {
              acc[mark.studentId] = {
                overallResult: mark.overallResult,
                isApproved: mark.isApproved || false,
              };
              return acc;
            }, {});
          } catch (err) {
            console.error(`Failed to fetch marks for MBA, semester ${group.semesterId}: ${err.message}`);
          }

          return {
            ...group,
            semesterName,
            students: group.students.map(student => ({
              ...student,
              result: studentMarks[student.id]?.overallResult || "Not Submitted",
              isApproved: studentMarks[student.id]?.isApproved || false,
            })),
          };
        })
      );

      setGroupedStudents(groupedWithDetails);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [location]); // Refetch when location changes (i.e., after returning from ViewResult)

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
      <div className="w-full max-w-2xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-black-800 mb-6">
          MBA Students
        </h2>
        <div className="space-y-6">
          {groupedStudents.length > 0 ? (
            groupedStudents.map((group, index) => (
              <div key={index} className="flex flex-col space-y-2 border-b pb-4">
                <p className="text-gray-600 text-xl font-semibold">
                  <strong>Semester Name:</strong> {group.semesterName}
                </p>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left">Student Name</th>
                      <th className="border border-gray-300 p-2 text-left">Result</th>
                      <th className="border border-gray-300 p-2 text-left">Approval Status</th>
                      <th className="border border-gray-300 p-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.students.map((student, subIndex) => (
                      <tr key={subIndex}>
                        <td className="border border-gray-300 p-2">{student.name}</td>
                        <td className="border border-gray-300 p-2">
                          <span
                            className={
                              student.result === "Pass"
                                ? "text-green-500"
                                : student.result === "Fail"
                                ? "text-red-500"
                                : "text-gray-500"
                            }
                          >
                            {student.result}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span
                            className={
                              student.isApproved ? "text-green-500" : "text-red-500"
                            }
                          >
                            {student.isApproved ? "Approved" : "Unapproved"}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() =>
                              navigate(`/ViewResult/${student.id}/${"MBA"}/${group.semesterId}`)
                            }
                          >
                            View & Update Marks
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-base">No students found for MBA</p>
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

export default MBAStudents;