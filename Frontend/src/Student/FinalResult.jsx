import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentMarks, getSubjectsByCourseIdAndSemesterId, getStudentByEmail, getSemesterBySemId } from "../service/api.js";

const FinalResult = () => {
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState(null);
  const [semesterName, setSemesterName] = useState("Unknown Semester");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const studentEmail = localStorage.getItem("studentEmail");

      if (!studentEmail) {
        setError("Please log in to access this page");
        navigate("/student/login");
        return;
      }

      try {
        // Fetch student details
        const studentResponse = await getStudentByEmail(studentEmail);
        const studentData = studentResponse.data;
        setStudent(studentData);

        const studentId = studentData._id;
        const courseId = studentData.courseId;
        const semesterId = studentData.semesterId;

        if (!courseId || !semesterId) {
          setError("No course or semester assigned to this student");
          return;
        }

        // Fetch semester name
        try {
          const semesterResponse = await getSemesterBySemId(semesterId);
          setSemesterName(semesterResponse.data.semName || "Unknown Semester");
        } catch (err) {
          console.error(`Failed to fetch semester for semesterId ${semesterId}: ${err.message}`);
          setSemesterName("Semester Not Found");
        }

        // Fetch subjects
        const subjectsResponse = await getSubjectsByCourseIdAndSemesterId(courseId, semesterId);
        setSubjects(subjectsResponse.data);

        // Fetch student marks
        const marksResponse = await getStudentMarks(studentId, courseId, semesterId);
        const marksData = marksResponse.data;
        setMarks(marksData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch result details");
      }
    };

    fetchDetails();
  }, [navigate]);

  const calculateResults = () => {
    let grandTotal = 0;
    let maxMarks = 0;
    let allPassed = true;

    if (!marks || !marks.subjects) return { grandTotal: 0, percentage: 0, overallResult: "Fail" };

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

    const percentage = maxMarks > 0 ? (grandTotal / maxMarks) * 100 : 0;
    const overallResult = allPassed ? "Pass" : "Fail";

    return { grandTotal, percentage: percentage.toFixed(2), overallResult };
  };

  const { grandTotal, percentage, overallResult } = marks ? calculateResults() : { grandTotal: 0, percentage: 0, overallResult: "Fail" };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!student || !marks) {
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
      <div className="w-full max-w-3xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Final Result</h2>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label className="text-gray-700 text-lg font-bold mr-2">College Name:</label>
              <p className="text-gray-600 text-base">Chintamanrao Institute of Management, Development & Research, Sangli</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label className="text-gray-700 text-lg font-bold mr-2">Student Name:</label>
              <p className="text-gray-600 text-base">{student.firstName} {student.lastName}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label className="text-gray-700 text-lg font-bold mr-2">Mother's Name:</label>
              <p className="text-gray-600 text-base">{student.motherName || "Not Provided"}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Marks Details</h3>
            <div className="mb-4 flex flex-wrap gap-4">
              <p className="text-gray-600 text-lg">
                <strong>Course:</strong> {student.courseId}
              </p>
              <p className="text-gray-600 text-lg">
                <strong>Semester:</strong> {semesterName}
              </p>
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Subject</th>
                  <th className="border border-gray-300 p-2 text-left">Subject Type</th>
                  <th className="border border-gray-300 p-2 text-left">Marks</th>
                  <th className="border border-gray-300 p-2 text-left">Total Marks</th>
                  <th className="border border-gray-300 p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {marks.subjects.map((subjectMark, index) => {
                  const subject = subjects.find(sub => (sub._id || sub.subjectId) === subjectMark.subjectId);
                  return (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{subject?.subjectName || "Unknown Subject"}</td>
                      <td className="border border-gray-300 p-2">{subjectMark.subjectType}</td>
                      <td className="border border-gray-300 p-2">
                        {subjectMark.subjectType === "Theory"
                          ? `TW: ${subjectMark.internal}, TH: ${subjectMark.external}`
                          : `Practical: ${subjectMark.practicalMarks}`}
                      </td>
                      <td className="border border-gray-300 p-2">{subjectMark.total}</td>
                      <td className="border border-gray-300 p-2">
                        <span className={subjectMark.status === "Pass" ? "text-green-500" : "text-red-500"}>
                          {subjectMark.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Summary</h3>
            <div className="flex flex-col space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Grand Total:</span> {grandTotal}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Percentage:</span> {percentage}%
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Result:</span>{" "}
                <span className={overallResult === "Pass" ? "text-green-500" : "text-red-500"}>
                  {overallResult}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/StudentDashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalResult;