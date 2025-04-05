import React, { useState } from "react";

const SubjectForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    subjectCode: "",
    subjectName: "",
    courseId: "",
    semId: "",
    approverUserId: "",
    minMark: "",
    maxMark: "",
    createdBy: "",
    createdOn: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    for (let key in formData) {
      if (!formData[key]) newErrors[key] = "This field is required";
    }
    if (formData.minMark && formData.maxMark && Number(formData.minMark) > Number(formData.maxMark)) {
      newErrors.minMark = "Min Mark cannot be greater than Max Mark";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Subject Added Successfully!");
      console.log(formData);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
  className="flex items-center justify-center min-h-screen bg-center bg-no-repeat sm:bg-contain md:bg-cover lg:bg-cover"
  style={{
    backgroundImage: "url('./public/college.png')", // Public folder image
    backgroundSize: "cover", // Keeps the original size
    backgroundAttachment: "fixed", // Prevents scrolling
    backgroundPosition: "right", // Centers the image
  }}
>
      <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "ID", name: "id", type: "text" },
            { label: "Subject Code", name: "subjectCode", type: "text" },
            { label: "Subject Name", name: "subjectName", type: "text" },
            { label: "Course ID", name: "courseId", type: "text" },
            { label: "Sem ID", name: "semId", type: "text" },
            { label: "Approver User ID", name: "approverUserId", type: "text" },
            { label: "Min Mark", name: "minMark", type: "number" },
            { label: "Max Mark", name: "maxMark", type: "number" },
            { label: "Created By", name: "createdBy", type: "text" },
            { label: "Created On", name: "createdOn", type: "date" }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-1/3 bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-500 transition duration-300 shadow-md"
            >
              Back
            </button>

            <button
              type="submit"
              className="w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition duration-300 shadow-md"
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