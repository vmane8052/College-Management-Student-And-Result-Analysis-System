import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherByEmail, getSubjectsByTeacherId, getUserByCourseId, getSemesterBySemId } from "../service/api.js";

const TeacherViewSubject = () => {
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [groupedSubjects, setGroupedSubjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const email = localStorage.getItem('teacherEmail');
      if (!email) {
        setError("Please log in to view assigned subjects");
        navigate("/teacher/login");
        return;
      }

      try {
        const teacherResponse = await getTeacherByEmail(email);
        setTeacher(teacherResponse.data);

        // Fetch subjects assigned to the teacher
        const subjectsResponse = await getSubjectsByTeacherId(teacherResponse.data.teacherId);
        const subjectsData = subjectsResponse.data;

        // Fetch course and semester names for each subject
        const subjectsWithDetails = await Promise.all(
          subjectsData.map(async (subject) => {
            let courseName = "Unknown Course";
            let semesterName = "Unknown Semester";

            try {
              const courseResponse = await getUserByCourseId(subject.courseId);
              courseName = courseResponse.data.courseName || "Unknown Course";
            } catch (err) {
              console.error(`Failed to fetch course for courseId ${subject.courseId}: ${err.message}`);
              courseName = "Course Not Found";
            }

            try {
              console.log(`Fetching semester for semesterId: ${subject.semesterId}`);
              const semesterResponse = await getSemesterBySemId(subject.semesterId);
              semesterName = semesterResponse.data.semName || "Unknown Semester";
            } catch (err) {
              console.error(`Failed to fetch semester for semesterId ${subject.semesterId}: ${err.message}`);
              semesterName = "Semester Not Found";
            }

            return {
              ...subject,
              courseName,
              semesterName,
            };
          })
        );

        // Group subjects by course and semester
        const grouped = subjectsWithDetails.reduce((acc, subject) => {
          const key = `${subject.courseId}-${subject.semesterId}`;
          if (!acc[key]) {
            acc[key] = {
              courseId: subject.courseId,
              semesterId: subject.semesterId,
              courseName: subject.courseName,
              semesterName: subject.semesterName,
              subjects: [],
            };
          }
          acc[key].subjects.push(subject.subjectName);
          return acc;
        }, {});

        setGroupedSubjects(Object.values(grouped));
        setSubjects(subjectsWithDetails);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch subjects");
        navigate("/teacher/login");
      }
    };

    fetchTeacherDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('teacherEmail');
    navigate("/teacher/login");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!teacher) {
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
          Total Subjects
        </h2>
        <div className="space-y-6">
          {groupedSubjects.length > 0 ? (
            groupedSubjects.map((group, index) => (
              <div key={index} className="flex flex-col space-y-2 border-b pb-4">
                <p className="text-gray-600 text-base">
                  <strong>Class Name:</strong> {group.courseName}
                </p>
                <p className="text-gray-600 text-base">
                  <strong>Semester Name:</strong> {group.semesterName}
                </p>
                <p className="text-gray-600 text-base">
                  <strong>Subject</strong>
                </p>
                {group.subjects.map((subject, subIndex) => (
                  <p key={subIndex} className="text-gray-600 text-base pl-4">
                    {subject}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-base">No subjects assigned</p>
          )}
        </div>
        <div className="flex justify-between mt-6">
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

export default TeacherViewSubject;