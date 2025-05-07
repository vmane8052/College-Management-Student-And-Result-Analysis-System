import React, { useEffect, useState } from "react";
import { getTeacher, updateTeacher } from "../service/api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTeacherForm = () => {
  const [formData, setFormData] = useState({
    teacherId: "",
    firstName: "",
    lastName: "",
    dob: "",
    joiningDate: "",
    gender: "",
    email: "",
    mobileNumber: "",
    qualification: "",
    subjectSpecialization: "",
    password: "",
    createdBy: "",
    createdOn: "",
    updatedBy: "",
    updatedOn: "",
  });
  const { id } = useParams(); // Get teacher ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeacherDetails();
  }, []);

  const fetchTeacherDetails = async () => {
    try {
      const response = await getTeacher(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTeacher(id, formData);
      alert("Teacher Updated Successfully!");
      navigate("/ViewTeacher");
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Failed to update teacher");
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Teacher ID", name: "teacherId", type: "text" },
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Joining Date", name: "joiningDate", type: "date" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobileNumber", type: "tel" },
            { label: "Qualification", name: "qualification", type: "text" },
            { label: "Subject Specialization", name: "subjectSpecialization", type: "text" },
            { label: "Password", name: "password", type: "text" },
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
          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
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

export default UpdateTeacherForm;