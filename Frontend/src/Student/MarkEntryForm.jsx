import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentByEmail, getUserByCourseId, getSemesterBySemId, getSubjectsByCourseIdAndSemesterId } from "../service/api.js";

const MarkEntryForm = () => {
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({}); // State to track marks for each subject
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const collegeName = "Chintamanrao Institute of Management, Development&Research,Sangli"; // Default college name

  useEffect(() => {
    const fetchDetails = async () => {
      const email = localStorage.getItem('studentEmail');
      if (!email) {
        setError("Please log in to access this page");
        navigate("/student/login");
        return;
      }

      try {
        // Fetch student details
        const studentResponse = await getStudentByEmail(email);
        const studentData = studentResponse.data;
        setStudent(studentData);
        const { courseId, semesterId } = studentData;

        if (!courseId && !semesterId) {
          setError("No course or semester assigned to this student");
          return;
        }

        // Fetch course details
        if (courseId) {
          try {
            const courseResponse = await getUserByCourseId(courseId);
            setCourse(courseResponse.data);
          } catch (err) {
            setError(err.response?.data?.message || "Course not found");
          }
        }

        // Fetch semester details
        if (semesterId) {
          try {
            const semesterResponse = await getSemesterBySemId(semesterId);
            setSemester(semesterResponse.data);
          } catch (err) {
            setError(err.response?.data?.message || "Semester not found");
          }
        }

        // Fetch subjects
        if (courseId && semesterId) {
          try {
            const subjectsResponse = await getSubjectsByCourseIdAndSemesterId(courseId, semesterId);
            setSubjects(subjectsResponse.data);
            // Initialize marks state for each subject
            const initialMarks = {};
            subjectsResponse.data.forEach((subject) => {
              initialMarks[subject._id || subject.subjectId] = {
                internal: "",
                external: "",
                total: 0,
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

  // Handle marks input changes
  const handleMarksChange = (subjectId, field, value) => {
    setMarks((prevMarks) => {
      const updatedMarks = { ...prevMarks };
      updatedMarks[subjectId] = {
        ...updatedMarks[subjectId],
        [field]: value,
      };

      // Calculate total marks
      const internal = parseFloat(updatedMarks[subjectId].internal) || 0;
      const external = parseFloat(updatedMarks[subjectId].external) || 0;
      updatedMarks[subjectId].total = internal + external;

      return updatedMarks;
    });
  };

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
        <div className="space-y-6">
          {/* Student and College Name in Same Row */}
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
          {/* Mother's Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg font-bold">Mother's Name</label>
            <p className="text-gray-600 text-base mt-1">
              {student.motherName || "Not provided"}
            </p>
          </div>

          {/* Marks Table */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Marks Details</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Subject</th>
                  <th className="border border-gray-300 p-2 text-left">Paper Code</th>
                  <th className="border border-gray-300 p-2 text-left">Internal Marks</th>
                  <th className="border border-gray-300 p-2 text-left">External Marks</th>
                  <th className="border border-gray-300 p-2 text-left">Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {/* Course and Semester Row */}
                <tr>
                  <td colSpan="5" className="border border-gray-300 p-2 text-center bg-gray-50">
                    {course && semester ? (
                      `${course.courseName} - ${semester.semName}`
                    ) : (
                      "Course and Semester not assigned"
                    )}
                  </td>
                </tr>
                {/* Subject Rows */}
                {subjects.length > 0 ? (
                  subjects.map((subject) => {
                    const subjectId = subject._id || subject.subjectId;
                    return (
                      <tr key={subjectId}>
                        <td className="border border-gray-300 p-2">{subject.subjectName}</td>
                        <td className="border border-gray-300 p-2">{subject.subjectId}</td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter internal marks"
                            value={marks[subjectId]?.internal || ""}
                            onChange={(e) =>
                              handleMarksChange(subjectId, "internal", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter external marks"
                            value={marks[subjectId]?.external || ""}
                            onChange={(e) =>
                              handleMarksChange(subjectId, "external", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                            value={marks[subjectId]?.total || 0}
                            disabled
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="border border-gray-300 p-2 text-center">
                      No subjects assigned
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-6">
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

export default MarkEntryForm;