import React, { useEffect, useState } from "react";
import { getSubject, updateSubject } from "../service/api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSubjectForm = () => {
  const [formData, setFormData] = useState({
    subjectId: "",
    subjectName: "",
    courseId: "",
    semesterId: "",
    teacherId: "",
    credit: "",
    subjectType: "Theory", 
    internalMinMarks: "",
    internalMaxMarks: "",
    externalMinMarks: "",
    externalMaxMarks: "",
    effectiveForm: "",
    createdBy: "",
    createdOn: "",
    updatedBy: "",
    updatedOn: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectDetails();
  }, []);

  const fetchSubjectDetails = async () => {
    try {
      const response = await getSubject(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSubject(id, formData);
      alert("Subject Updated Successfully!");
      navigate("/ViewSubject");
    } catch (error) {
      console.error("Error updating subject:", error);
      alert("Failed to update subject");
    }
  };

  const handleBack = () => {
    navigate(-1);
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Subject ID", name: "subjectId", type: "text" },
            { label: "Subject Name", name: "subjectName", type: "text" },
            { label: "Course ID", name: "courseId", type: "text" },
            { label: "Semester ID", name: "semesterId", type: "text" },
            { label: "Teacher ID", name: "teacherId", type: "text" },
            { label: "Credit", name: "credit", type: "number" },
            { label: "Subject Type", name: "subjectType", type: "select" }, // New field
            { label: "Internal Min Marks", name: "internalMinMarks", type: "number" },
            { label: "Internal Max Marks", name: "internalMaxMarks", type: "number" },
            { label: "External Min Marks", name: "externalMinMarks", type: "number" },
            { label: "External Max Marks", name: "externalMaxMarks", type: "number" },
            { label: "Effective Form", name: "effectiveForm", type: "text" },
            { label: "Created By", name: "createdBy", type: "text" },
            { label: "Created On", name: "createdOn", type: "date" },
            { label: "Updated By", name: "updatedBy", type: "text" },
            { label: "Updated On", name: "updatedOn", type: "date" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || "Theory"}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Theory">Theory</option>
                  <option value="Practical">Practical</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              )}
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

export default UpdateSubjectForm;