import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentByEmail, getUserByCourseId, getSemesterBySemId, getSubjectsByCourseIdAndSemesterId, addStudentMarks } from "../service/api.js";

const MarkEntryForm = () => {
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState(""); // For max marks validation
  const navigate = useNavigate();
  const collegeName = "Chintamanrao Institute of Management, Development&Research,Sangli";

  useEffect(() => {
    const fetchDetails = async () => {
      const email = localStorage.getItem('studentEmail');
      if (!email) {
        setError("Please log in to access this page");
        navigate("/student/login");
        return;
      }

      try {
        const studentResponse = await getStudentByEmail(email);
        const studentData = studentResponse.data;
        setStudent(studentData);
        const { courseId, semesterId } = studentData;

        if (!courseId || !semesterId) {
          setError("No course or semester assigned to this student");
          return;
        }

        if (courseId) {
          try {
            const courseResponse = await getUserByCourseId(courseId);
            setCourse(courseResponse.data);
          } catch (err) {
            setError(err.response?.data?.message || "Course not found");
          }
        }

        if (semesterId) {
          try {
            const semesterResponse = await getSemesterBySemId(semesterId);
            setSemester(semesterResponse.data);
          } catch (err) {
            setError(err.response?.data?.message || "Semester not found");
          }
        }

        if (courseId && semesterId) {
          try {
            const subjectsResponse = await getSubjectsByCourseIdAndSemesterId(courseId, semesterId);
            setSubjects(subjectsResponse.data);
            const initialMarks = {};
            subjectsResponse.data.forEach((subject) => {
              const subjectId = subject._id || subject.subjectId;
              initialMarks[subjectId] = {
                subjectType: subject.subjectType || "Theory",
                internal: "",
                external: "",
                total: 0,
                practicalMarks: "",
                status: "Fail",
                hasSpecialPass: false, // To track if "$" is used
              };
            });
            setMarks(initialMarks);
          } catch (err) {
            setError(err.response?.data?.message || "No subjects found");
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch details");
      }
    };

    fetchDetails();
  }, [navigate]);

  const handleMarksChange = (subjectId, field, value) => {
    setValidationError(""); // Clear previous validation error

    // Define maximum marks
    const maxInternalMarks = 40;
    const maxExternalMarks = 60;
    const maxPracticalMarks = 50;

    // Parse the input value to check for "$" and extract the numeric part
    const hasSpecialPass = value.startsWith("$");
    const numericValue = hasSpecialPass ? parseFloat(value.slice(1)) : parseFloat(value);

    // Validate the numeric value against maximum marks
    let isValid = true;
    if (field === "internal" && numericValue > maxInternalMarks) {
      setValidationError(`Internal marks for subject ${subjectId} cannot exceed ${maxInternalMarks}`);
      isValid = false;
    }
    if (field === "external" && numericValue > maxExternalMarks) {
      setValidationError(`External marks for subject ${subjectId} cannot exceed ${maxExternalMarks}`);
      isValid = false;
    }
    if (field === "practicalMarks" && numericValue > maxPracticalMarks) {
      setValidationError(`Practical marks for subject ${subjectId} cannot exceed ${maxPracticalMarks}`);
      isValid = false;
    }

    if (!isValid) return; // Stop if validation fails

    setMarks((prevMarks) => {
      const updatedMarks = { ...prevMarks };
      updatedMarks[subjectId] = {
        ...updatedMarks[subjectId],
        [field]: value, // Store the raw input (e.g., "$25" or "25")
        hasSpecialPass: field === "internal" || field === "external" || field === "practicalMarks" ? hasSpecialPass : updatedMarks[subjectId].hasSpecialPass,
      };

      const subject = subjects.find((sub) => (sub._id || sub.subjectId) === subjectId);
      const internalMinMarks = subject?.internalMinMarks || 0;
      const externalMinMarks = subject?.externalMinMarks || 0;

      if (updatedMarks[subjectId].subjectType === "Theory") {
        const internalInput = updatedMarks[subjectId].internal || "";
        const externalInput = updatedMarks[subjectId].external || "";
        const internalHasSpecialPass = internalInput.startsWith("$");
        const externalHasSpecialPass = externalInput.startsWith("$");
        const internal = internalHasSpecialPass ? parseFloat(internalInput.slice(1)) || 0 : parseFloat(internalInput) || 0;
        const external = externalHasSpecialPass ? parseFloat(externalInput.slice(1)) || 0 : parseFloat(externalInput) || 0;
        updatedMarks[subjectId].total = internal + external;
        updatedMarks[subjectId].hasSpecialPass = internalHasSpecialPass || externalHasSpecialPass;
        updatedMarks[subjectId].status = updatedMarks[subjectId].hasSpecialPass
          ? "Pass"
          : (internal >= internalMinMarks && external >= externalMinMarks ? "Pass" : "Fail");
      } else {
        const practicalInput = updatedMarks[subjectId].practicalMarks || "";
        const practicalHasSpecialPass = practicalInput.startsWith("$");
        const practicalMarks = practicalHasSpecialPass ? parseFloat(practicalInput.slice(1)) || 0 : parseFloat(practicalInput) || 0;
        updatedMarks[subjectId].total = practicalMarks;
        updatedMarks[subjectId].hasSpecialPass = practicalHasSpecialPass;
        updatedMarks[subjectId].status = updatedMarks[subjectId].hasSpecialPass
          ? "Pass"
          : (practicalMarks >= externalMinMarks ? "Pass" : "Fail");
      }

      return updatedMarks;
    });
  };

  const calculateResults = () => {
    let grandTotal = 0;
    let maxMarks = 0;
    let allPassed = true;

    subjects.forEach((subject) => {
      const subjectId = subject._id || subject.subjectId;
      const subjectType = marks[subjectId]?.subjectType || "Theory";
      const subjectTotal = marks[subjectId]?.total || 0;
      const status = marks[subjectId]?.status || "Fail";

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

  const handleSubmit = async () => {
    if (validationError) {
      alert("Please correct the validation errors before submitting.");
      return;
    }

    const { grandTotal, percentage, overallResult } = calculateResults();

    // Prepare marks data for submission (remove "$" before submitting)
    const marksData = {
      studentId: student._id,
      courseId: student.courseId,
      semesterId: student.semesterId,
      subjects: subjects.map((subject) => {
        const subjectId = subject._id || subject.subjectId;
        const markEntry = marks[subjectId];
        const cleanInternal = markEntry?.internal?.startsWith("$")
          ? parseFloat(markEntry.internal.slice(1)) || 0
          : parseFloat(markEntry?.internal) || 0;
        const cleanExternal = markEntry?.external?.startsWith("$")
          ? parseFloat(markEntry.external.slice(1)) || 0
          : parseFloat(markEntry?.external) || 0;
        const cleanPractical = markEntry?.practicalMarks?.startsWith("$")
          ? parseFloat(markEntry.practicalMarks.slice(1)) || 0
          : parseFloat(markEntry?.practicalMarks) || 0;

        return {
          subjectId,
          subjectType: markEntry?.subjectType || "Theory",
          internal: cleanInternal,
          external: cleanExternal,
          practicalMarks: cleanPractical,
          total: markEntry?.total || 0,
          status: markEntry?.status || "Fail",
        };
      }),
      grandTotal,
      percentage: parseFloat(percentage),
      overallResult,
    };

    try {
      await addStudentMarks(marksData);
      alert("Marks submitted successfully!");
      navigate("/StudentDashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit marks");
    }
  };

  const { grandTotal, percentage, overallResult } = calculateResults();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!student) {
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
      <div className="w-full max-w-3xl bg-white bg-opacity-90 shadow-2xl rounded-lg p-8 ml-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Mark Entry Form
        </h2>
        {validationError && (
          <p className="text-red-500 text-center mb-4">{validationError}</p>
        )}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <label className="text-gray-700 text-lg font-bold mr-2">Student Name:</label>
              <p className="text-gray-600 text-base">
                {student.firstName} {student.lastName}
              </p>
            </div>
            <div className="flex items-center">
              <label className="text-gray-700 text-lg font-bold mr-2">College Name:</label>
              <p className="text-gray-600 text-base">{collegeName}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Mother's Name</label>
            <p className="text-gray-600 text-base mt-1">
              {student.motherName || "Not provided"}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Marks Details</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Subject</th>
                  <th className="border border-gray-300 p-2 text-left">Paper Code</th>
                  <th className="border border-gray-300 p-2 text-left">Subject Type</th>
                  <th className="border border-gray-300 p-2 text-left">Marks</th>
                  <th className="border border-gray-300 p-2 text-left">Total Marks</th>
                  <th className="border border-gray-300 p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="border border-gray-300 p-2 text-center bg-gray-50">
                    {course && semester ? (
                      `${course.courseName} - ${semester.semName}`
                    ) : (
                      "Course and Semester not assigned"
                    )}
                  </td>
                </tr>
                {subjects.length > 0 ? (
                  subjects.map((subject) => {
                    const subjectId = subject._id || subject.subjectId;
                    const subjectType = marks[subjectId]?.subjectType || "Theory";
                    return (
                      <tr key={subjectId}>
                        <td className="border border-gray-300 p-2">{subject.subjectName}</td>
                        <td className="border border-gray-300 p-2">{subject.subjectId}</td>
                        <td className="border border-gray-300 p-2">{subjectType}</td>
                        <td className="border border-gray-300 p-2">
                          {subjectType === "Theory" ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                placeholder="Internal marks (max 40)"
                                value={marks[subjectId]?.internal || ""}
                                onChange={(e) =>
                                  handleMarksChange(subjectId, "internal", e.target.value)
                                }
                              />
                              <input
                                type="text"
                                className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                placeholder="External marks (max 60)"
                                value={marks[subjectId]?.external || ""}
                                onChange={(e) =>
                                  handleMarksChange(subjectId, "external", e.target.value)
                                }
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              placeholder="Practical marks (max 50)"
                              value={marks[subjectId]?.practicalMarks || ""}
                              onChange={(e) =>
                                handleMarksChange(subjectId, "practicalMarks", e.target.value)
                              }
                            />
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {subjectType === "Theory" ? (
                            <input
                              type="number"
                              className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                              value={marks[subjectId]?.total || 0}
                              disabled
                            />
                          ) : (
                            <input
                              type="number"
                              className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                              value={marks[subjectId]?.total || 0}
                              disabled
                            />
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span
                            className={
                              marks[subjectId]?.status === "Pass"
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {marks[subjectId]?.status || "Fail"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="border border-gray-300 p-2 text-center">
                      No subjects assigned
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {subjects.length > 0 && (
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
          )}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/StudentDashboard")}
          >
            Back to Dashboard
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkEntryForm;