import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentMarks, getSubjectsByCourseIdAndSemesterId, getStudent, getStudentByEmail, updateStudentMarks } from "../service/api.js";

const ViewResult = () => {
  const { studentId: studentIdFromParams, courseId: courseIdFromParams, semesterId: semesterIdFromParams } = useParams();
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState(null);
  const [editableMarks, setEditableMarks] = useState([]);
  const [error, setError] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const teacherEmail = localStorage.getItem("teacherEmail");
      const studentEmail = localStorage.getItem("studentEmail");

      if (!teacherEmail && !studentEmail) {
        setError("Please log in to access this page");
        navigate("/student/login");
        return;
      }

      setIsTeacher(!!teacherEmail);

      try {
        let studentId, courseId, semesterId;

        if (teacherEmail) {
          // For teachers, use the studentId, courseId, and semesterId from URL params
          studentId = studentIdFromParams;
          courseId = courseIdFromParams;
          semesterId = semesterIdFromParams;

          // Fetch the student details using the studentId from params
          const studentResponse = await getStudent(studentId);
          setStudent(studentResponse.data);
        } else if (studentEmail) {
          // For students, fetch their own details using their email
          const studentResponse = await getStudentByEmail(studentEmail);
          const studentData = studentResponse.data;
          setStudent(studentData);
          studentId = studentData._id;
          courseId = studentData.courseId;
          semesterId = studentData.semesterId;
        }

        if (!courseId || !semesterId) {
          setError("No course or semester assigned to this student");
          return;
        }

        // Fetch subjects to get subject names
        const subjectsResponse = await getSubjectsByCourseIdAndSemesterId(courseId, semesterId);
        setSubjects(subjectsResponse.data);

        // Fetch marks for the student
        const marksResponse = await getStudentMarks(studentId, courseId, semesterId);
        const marksData = marksResponse.data;
        setMarks(marksData);
        setEditableMarks(marksData.subjects);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch result details");
      }
    };

    fetchDetails();
  }, [studentIdFromParams, courseIdFromParams, semesterIdFromParams, navigate]);

  const handleMarksChange = (index, field, value) => {
    setEditableMarks((prevMarks) => {
      const updatedMarks = [...prevMarks];
      updatedMarks[index] = {
        ...updatedMarks[index],
        [field]: parseFloat(value) || 0,
      };

      const subject = subjects.find(sub => (sub._id || sub.subjectId) === updatedMarks[index].subjectId);
      const internalMinMarks = subject?.internalMinMarks || 0;
      const externalMinMarks = subject?.externalMinMarks || 0;

      if (updatedMarks[index].subjectType === "Theory") {
        const internal = updatedMarks[index].internal || 0;
        const external = updatedMarks[index].external || 0;
        updatedMarks[index].total = internal + external;
        updatedMarks[index].status =
          internal >= internalMinMarks && external >= externalMinMarks ? "Pass" : "Fail";
      } else {
        const practicalMarks = updatedMarks[index].practicalMarks || 0;
        updatedMarks[index].total = practicalMarks;
        updatedMarks[index].status = practicalMarks >= externalMinMarks ? "Pass" : "Fail";
      }

      return updatedMarks;
    });
  };

  const calculateResults = () => {
    let grandTotal = 0;
    let maxMarks = 0;
    let allPassed = true;

    editableMarks.forEach((subjectMark) => {
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

  const handleUpdate = async () => {
    const { grandTotal, percentage, overallResult } = calculateResults();

    const updatedMarksData = {
      studentId: student._id,
      courseId: student.courseId,
      semesterId: student.semesterId,
      subjects: editableMarks.map(subjectMark => ({
        subjectId: subjectMark.subjectId,
        subjectType: subjectMark.subjectType,
        internal: subjectMark.internal || 0,
        external: subjectMark.external || 0,
        practicalMarks: subjectMark.practicalMarks || 0,
        total: subjectMark.total || 0,
        status: subjectMark.status || "Fail",
      })),
      grandTotal,
      percentage: parseFloat(percentage),
      overallResult,
      createdOn: marks.createdOn,
    };

    try {
      await updateStudentMarks(student._id, student.courseId, student.semesterId, updatedMarksData);
      alert("Marks updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err.response?.data);
      alert(err.response?.data?.message || "Failed to update marks");
    }
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isTeacher ? "Student Result (Re-check)" : "Final Result"}
        </h2>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label className="text-gray-700 text-lg font-bold mr-2">Student Name:</label>
              <p className="text-gray-600 text-base">
                {student.firstName} {student.lastName}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Marks Details</h3>
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
                {editableMarks.map((subjectMark, index) => {
                  const subject = subjects.find(sub => (sub._id || sub.subjectId) === subjectMark.subjectId);
                  return (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{subject?.subjectName || "Unknown Subject"}</td>
                      <td className="border border-gray-300 p-2">{subjectMark.subjectType}</td>
                      <td className="border border-gray-300 p-2">
                        {isTeacher && subjectMark.subjectType === "Theory" ? (
                          <div className="space-y-2">
                            <input
                              type="number"
                              className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              placeholder="Internal marks"
                              value={subjectMark.internal}
                              onChange={(e) =>
                                handleMarksChange(index, "internal", e.target.value)
                              }
                            />
                            <input
                              type="number"
                              className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              placeholder="External marks"
                              value={subjectMark.external}
                              onChange={(e) =>
                                handleMarksChange(index, "external", e.target.value)
                              }
                            />
                          </div>
                        ) : isTeacher && subjectMark.subjectType === "Practical" ? (
                          <input
                            type="number"
                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Practical marks"
                            value={subjectMark.practicalMarks}
                            onChange={(e) =>
                              handleMarksChange(index, "practicalMarks", e.target.value)
                            }
                          />
                        ) : (
                          subjectMark.subjectType === "Theory"
                            ? `Internal: ${subjectMark.internal}, External: ${subjectMark.external}`
                            : `Practical: ${subjectMark.practicalMarks}`
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">{subjectMark.total}</td>
                      <td className="border border-gray-300 p-2">
                        <span
                          className={
                            subjectMark.status === "Pass" ? "text-green-500" : "text-red-500"
                          }
                        >
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
                <span
                  className={
                    overallResult === "Pass" ? "text-green-500" : "text-red-500"
                  }
                >
                  {overallResult}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate(isTeacher ? -1 : "/StudentDashboard")}
          >
            Back {isTeacher ? "" : "to Dashboard"}
          </button>
          {isTeacher && (
            <button
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={handleUpdate}
            >
              Update Marks
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewResult;