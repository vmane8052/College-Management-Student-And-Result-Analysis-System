import React, { useState } from "react";

const AddSemisterForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    semId: "",
    semName: "",
    createdBy: "",
    createdOn: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Course Added Successfully!");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('./public/college.png')", // Public folder image
      backgroundSize: "cover", // Keeps the original size
      backgroundAttachment: "fixed", // Prevents scrolling
      backgroundPosition: "right", // // Background image from the public folder
      }}
    >
      <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Semister</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "ID", name: "id", type: "text" },
            { label: "sem ID", name: "semId", type: "text" },
            { label: "Created By", name: "createdBy", type: "text" },
            { label: "Created On", name: "createdOn", type: "date" },
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
            </div>
          ))}

          {/* SEM Name Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">SEM Name</label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select SEM</option>
              <option value="MCA">SEM1</option>
              <option value="MBA">SEM2</option>
              <option value="BBA">SEM3</option>
              <option value="BCA">SEM4</option>
              <option value="BBA">SEM5</option>
              <option value="BCA">SEM6</option>
            </select>
          </div>

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

export default AddSemisterForm;


