import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentByEmail, getUserByCourseId, getSemesterBySemId, getSubjectsByCourseIdAndSemesterId } from "../service/api.js";

const ViewCourses = () => {
  const [course, setCourse] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const email = localStorage.getItem('studentEmail');
      if (!email) {
        setError("Please log in to view your courses");
        navigate("/student/login");
        return;
      }

      try {
        // Fetch student to get courseId and semesterId
        const studentResponse = await getStudentByEmail(email);
        const { courseId, semesterId } = studentResponse.data;

        if (!courseId && !semesterId) {
          setError("No course or semester assigned to this student");
          return;
        }

        // Fetch course by courseId
        if (courseId) {
          try {
            const courseResponse = await getUserByCourseId(courseId);
            setCourse(courseResponse.data);
          } catch (err) {
            setError(err.response?.data?.message || "Course not found");
          }
        }

        // Fetch semester by semesterId
        if (semesterId) {
          try {
            const semesterResponse = await getSemesterBySemId(semesterId);
            setSemester(semesterResponse.data);
          } catch (err) {
            setError(err.response?.data?.message || "Semester not found");
          }
        }

        // Fetch subjects by courseId and semesterId
        if (courseId && semesterId) {
          try {
            const subjectsResponse = await getSubjectsByCourseIdAndSemesterId(courseId, semesterId);
            setSubjects(subjectsResponse.data);
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!course && !semester && subjects.length === 0) {
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
      <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Course and Semester
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold">Course Code</label>
            <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
              {course ? course.courseId : "Not assigned"}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold">Course Name</label>
            <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
              {course ? course.courseName : "Not assigned"}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold">Semester Code</label>
            <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
              {semester ? semester.semId : "Not assigned"}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold">Semester Name</label>
            <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
              {semester ? semester.semName : "Not assigned"}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold">Subjects</label>
            {subjects.length > 0 ? (
              <ul className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
                {subjects.map((subject) => (
                  <li key={subject._id || subject.subjectId} className="py-1">
                    {subject.subjectId} - {subject.subjectName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
                No subjects assigned
              </p>
            )}
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

export default ViewCourses;