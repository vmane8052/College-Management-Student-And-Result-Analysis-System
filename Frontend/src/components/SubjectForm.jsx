import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubjectForm = () => {
  const [formData, setFormData] = useState({
    subjectId: "",
    subjectName: "",
    courseId: "",
    semesterId: "",
    teacherId: "",
    credit: "",
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

  const [excelFile, setExcelFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const validate = () => {
    const errs = {};
    ["subjectId", "subjectName", "courseId", "semesterId", "createdBy", "createdOn"].forEach((key) => {
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
      fd.append("file", excelFile);
      try {
        const response = await fetch("http://localhost:8000/uploadSubjectExcel", {
          method: "POST",
          body: fd,
        });
        alert((await response.json()).message);
      } catch {
        alert("Excel upload failed");
      }
    }

    // Handle subject form data submission
    try {
      await axios.post("http://localhost:8000/subject/add", formData);
      alert("Subject Added Successfully!");
      navigate("/ViewSubject");
    } catch (err) {
      alert("Add subject failed");
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Subject ID", name: "subjectId", type: "text" },
            { label: "Subject Name", name: "subjectName", type: "text" },
            { label: "Course ID", name: "courseId", type: "text" },
            { label: "Semester ID", name: "semesterId", type: "text" },
            { label: "Teacher ID", name: "teacherId", type: "text" },
            { label: "Credit", name: "credit", type: "number" },
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
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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

export default SubjectForm;