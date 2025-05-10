import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUsers, getSemesters } from "../service/api.js"; // Import API calls to fetch courses and semesters

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    dob: "",
    email: "",
    mobileNumber: "",
    admissionDate: "",
    address: "",
    createdBy: "",
    createdOn: "",
    updatedBy: "",
    updatedOn: "",
    rollNo: "",
    gender: "",
    password: "",
    nationality: "",
    religion: "",
    casteCategory: "",
    bloodGroup: "",
    courseId: "",
    semesterId: "",
  });

  const [excelFile, setExcelFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [semesters, setSemesters] = useState([]); // State to store fetched semesters
  const navigate = useNavigate();

  // Fetch courses and semesters when the component mounts
  useEffect(() => {
    const fetchCoursesAndSemesters = async () => {
      try {
        // Fetch courses
        const courseResponse = await getUsers();
        setCourses(courseResponse.data);

        // Fetch semesters
        const semesterResponse = await getSemesters();
        setSemesters(semesterResponse.data);
      } catch (error) {
        console.error("Failed to fetch courses or semesters:", error);
        alert("Failed to load courses or semesters. Please try again.");
      }
    };

    fetchCoursesAndSemesters();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const validate = () => {
    const errs = {};
    ["studentId", "firstName", "lastName", "email", "createdBy", "createdOn"].forEach((key) => {
      if (!formData[key]) errs[key] = "Required";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Handle Excel upload
    if (excelFile) {
      const fd = new FormData();
      fd.append("file", excelFile); // Backend expects 'file'
      try {
        const response = await fetch("http://localhost:8000/uploadStudentExcel", {
          method: "POST",
          body: fd,
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Excel upload failed");
        }
        alert(result.message);
      } catch (error) {
        console.error("Excel upload error:", error);
        alert(`Excel upload failed: ${error.message}`);
      }
    }

    // Handle student form data submission
    try {
      await axios.post("http://localhost:8000/student/add", formData);
      alert("Student Added Successfully!");
      navigate("/ViewStudent"); // Adjust the route as per your app
    } catch (err) {
      alert("Add student failed");
    }
  };

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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Student ID", name: "studentId", type: "text" },
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Middle Name", name: "middleName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Mother Name", name: "motherName", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Admission Date", name: "admissionDate", type: "date" },
            { label: "Mobile Number", name: "mobileNumber", type: "tel" },
            { label: "Nationality", name: "nationality", type: "select" },
            { label: "Religion", name: "religion", type: "select" },
            { label: "Caste Category", name: "casteCategory", type: "select" },
            { label: "Roll No", name: "rollNo", type: "text" },
            { label: "Gender", name: "gender", type: "select" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Password", name: "password", type: "text" },
            { label: "Blood Group", name: "bloodGroup", type: "select" },
            { label: "Course ID", name: "courseId", type: "select" },
            { label: "Semester ID", name: "semesterId", type: "select" },
            { label: "Address", name: "address", type: "text" },
            { label: "Created By", name: "createdBy", type: "text" },
            { label: "Created On", name: "createdOn", type: "date" },
            { label: "Updated By", name: "updatedBy", type: "text" },
            { label: "Updated On", name: "updatedOn", type: "date" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-700 font-medium">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>
                    Select {field.label}
                  </option>
                  {field.name === "nationality" &&
                    [
                      "American",
                      "Australian",
                      "British",
                      "Canadian",
                      "Chinese",
                      "French",
                      "German",
                      "Indian",
                      "Japanese",
                      "Mexican",
                      "Russian",
                      "South African",
                      "Other",
                    ].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  {field.name === "religion" &&
                    [
                      "Hinduism",
                      "Islam",
                      "Christianity",
                      "Sikhism",
                      "Buddhism",
                      "Jainism",
                      "Other",
                    ].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  {field.name === "casteCategory" &&
                    ["General", "OBC", "SC", "ST", "EWS", "Other"].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  {field.name === "gender" &&
                    ["Male", "Female", "Other"].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  {field.name === "bloodGroup" &&
                    ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  {field.name === "courseId" &&
                    courses.map((course) => (
                      <option key={course.courseId} value={course.courseId}>
                        {course.courseId}
                      </option>
                    ))}
                  {field.name === "semesterId" &&
                    semesters.map((semester) => (
                      <option key={semester.semId} value={semester.semId}>
                        {semester.semId}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Upload Excel File</label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;