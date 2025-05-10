import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, getSemesterBySemId, getAllStudentMarksByCourseAndSemester, getSubjectsByCourseIdAndSemesterId } from "../service/api.js";

const MCAClassTopper = () => {
  const [groupedToppers, setGroupedToppers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToppers = async () => {
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
          acc[semesterId].students.push({
            id: student._id,
            name: `${student.firstName} ${student.lastName}`,
          });
          return acc;
        }, {});

        // Fetch semester names and calculate toppers for each group
        const groupedWithToppers = await Promise.all(
          Object.values(grouped).map(async (group) => {
            // Fetch semester name
            let semesterName = "Unknown Semester";
            try {
              const semesterResponse = await getSemesterBySemId(group.semesterId);
              semesterName = semesterResponse.data.semName || "Unknown Semester";
            } catch (err) {
              console.error(`Failed to fetch semester for semesterId ${group.semesterId}: ${err.message}`);
              semesterName = "Semester Not Found";
            }

            // Fetch subjects for MCA and this semester
            let subjects = [];
            try {
              const subjectsResponse = await getSubjectsByCourseIdAndSemesterId("MCA", group.semesterId);
              subjects = subjectsResponse.data;
            } catch (err) {
              console.error(`Failed to fetch subjects for MCA, semester ${group.semesterId}: ${err.message}`);
            }

            // Fetch student marks for MCA and this semester
            let studentMarks = {};
            let studentPercentages = [];
            try {
              const marksResponse = await getAllStudentMarksByCourseAndSemester("MCA", group.semesterId);
              studentMarks = marksResponse.data.reduce((acc, mark) => {
                acc[mark.studentId] = {
                  overallResult: mark.overallResult,
                  subjects: mark.subjects,
                };
                return acc;
              }, {});

              // Calculate percentage for each student
              studentPercentages = group.students.map((student) => {
                const marks = studentMarks[student.id];
                let grandTotal = 0;
                let maxMarks = 0;
                let allPassed = true;

                if (marks && marks.subjects) {
                  marks.subjects.forEach((subjectMark) => {
                    const subjectType = subjectMark.subjectType;
                    const subjectTotal = subjectMark.total || 0;
                    const status = subjectMark.status || "Fail";

                    grandTotal += subjectTotal;
                    maxMarks += subjectType === "Theory" ? 100 : 50;
                    if (status === "Fail") {
                      allPassed = false;
                    }
                  });
                }

                const percentage = maxMarks > 0 ? (grandTotal / maxMarks) * 100 : 0;
                return {
                  id: student.id,
                  name: student.name,
                  percentage: percentage.toFixed(2),
                  overallResult: allPassed ? "Pass" : "Fail",
                  marksSubmitted: !!marks,
                };
              });
            } catch (err) {
              console.error(`Failed to fetch marks for MCA, semester ${group.semesterId}: ${err.message}`);
            }

            // Determine if all students have submitted their marks
            const allSubmitted = studentPercentages.every((student) => student.marksSubmitted);

            // Find the topper(s)
            let toppers = [];
            if (allSubmitted) {
              const highestPercentage = Math.max(...studentPercentages.map((student) => student.percentage));
              toppers = studentPercentages.filter(
                (student) => student.percentage === highestPercentage
              );
            }

            return {
              semesterId: group.semesterId,
              semesterName,
              allSubmitted,
              toppers,
            };
          })
        );

        setGroupedToppers(groupedWithToppers);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch toppers");
      }
    };

    fetchToppers();
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
      <div className="w-full max-w-2xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          MCA Class Toppers
        </h2>
        <div className="space-y-6">
          {groupedToppers.length > 0 ? (
            groupedToppers.map((group, index) => (
              <div key={index} className="flex flex-col space-y-2 border-b pb-4">
                <p className="text-gray-600 text-xl font-semibold">
                  <strong>Semester Name:</strong> {group.semesterName}
                </p>
                {group.allSubmitted ? (
                  group.toppers.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {group.toppers.length === 1 ? "Topper" : "Toppers (Tie)"}
                      </h3>
                      {group.toppers.map((topper, topperIndex) => (
                        <div key={topperIndex} className="text-gray-600 mt-2">
                          <p>
                            <strong>Name:</strong> {topper.name}
                          </p>
                          <p>
                            <strong>Percentage:</strong> {topper.percentage}%
                          </p>
                          <p>
                            <strong>Result:</strong>{" "}
                            <span
                              className={
                                topper.overallResult === "Pass"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {topper.overallResult}
                            </span>
                          </p>
                          <button
                            className="text-blue-500 hover:underline mt-1"
                            onClick={() =>
                              navigate(`/ViewResult/${topper.id}/${"MCA"}/${group.semesterId}`)
                            }
                          >
                            View Result
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-base">
                      No topper found (all students have 0%).
                    </p>
                  )
                ) : (
                  <p className="text-gray-600 text-base">
                    Waiting for all students to submit their results.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-base">No toppers found for MCA</p>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/TeacherDashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCAClassTopper;