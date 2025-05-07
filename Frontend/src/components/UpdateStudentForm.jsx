import React, { useEffect, useState } from "react";
import { getStudent, updateStudent } from "../service/api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateStudentForm = () => {
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
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await getStudent(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, formData);
      alert("Student Updated Successfully!");
      navigate("/ViewStudent");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Student</h2>
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
            { label: "Email Address", name: "email", type: "email" },
            { label: "Password", name: "password", type: "text" },
            { label: "Roll No", name: "rollNo", type: "text" },
            { label: "Course ID", name: "courseId", type: "text" },
            { label: "Semester ID", name: "semesterId", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Created By", name: "createdBy", type: "text" },
            { label: "Created On", name: "createdOn", type: "date" },
            { label: "Updated By", name: "updatedBy", type: "text" },
            { label: "Updated On", name: "updatedOn", type: "date" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
          {[
            { label: "Gender", name: "gender", options: ["Male", "Female", "Other"] },
            { label: "Nationality", name: "nationality", options: ["American", "Australian", "British", "Canadian", "Chinese", "French", "German", "Indian", "Japanese", "Mexican", "Russian", "South African", "Other"] },
            { label: "Religion", name: "religion", options: ["Hinduism", "Islam", "Christianity", "Sikhism", "Buddhism", "Jainism", "Other"] },
            { label: "Caste Category", name: "casteCategory", options: ["General", "OBC", "SC", "ST", "EWS", "Other"] },
            { label: "Blood Group", name: "bloodGroup", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium">{field.label}</label>
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-1/3 bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentForm;