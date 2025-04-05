import React, { useState } from "react";

const AddTeacherForm = () => {
  const [formData, setFormData] = useState({
    UserId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    dob: "",
    email: "",
    mobileNumber: "",
    JoiningDate: "",
    address: "",
    createdBy: "",
    createdOn: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/student/add", formData);
      alert(response.data);
    } catch (error) {
      alert(error.response?.data || "Error submitting form");
    }
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
    <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-2xl rounded-lg p-8" style={{ backgroundImage: "url('/background.jpg')" }}>
      
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "User ID", name: "UserId", type: "text" },
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Middle Name", name: "middleName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Mother Name", name: "motherName", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobileNumber", type: "tel" },
            { label: "Joining Date", name: "JoiningDate", type: "date" },
            { label: "Address", name: "address", type: "text" },
            { label: "Created By", name: "createdBy", type: "text" },
            { label: "Created On", name: "createdOn", type: "date" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

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

export default AddTeacherForm;