import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../service/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourseForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    courseId: "",
    courseName: "",
    createdBy: "",
    createdOn: "",
  });
  const { id } = useParams();  // 🔥 This gets URL id
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await getUser(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, formData);
    alert("Course Updated Successfully!");
    navigate("/ViewCourse");
  };

  const handleBack = () => {
    navigate(-1); // go back
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/college.png')",  // ✅ Correct: remove './public'
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "right",
      }}
    >
      <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "ID", name: "id", type: "text" },
            { label: "Course Code", name: "courseId", type: "text" },
            { label:"Effective From",name :"effectiveFrom",type:"text"},
            { label:"Student Limit",name :"studentLimit",type:"text"},
            { label:"No.Of Division",name :"noOfDivision",type:"text"},
            { label:"No.Of Semister",name :"noOfSemister",type:"text"},
            { label: "Created By", name: "createdBy", type: "text" },
            { label: "Created On", name: "createdOn", type: "date" },
            { label: "Updated By", name: "updatedBy", type: "text" },
            { label: "Updated On ", name: "updatedOn", type: "date" },
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
          <div>
            <label className="block text-gray-700 font-medium">Course Name</label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
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

export default UpdateCourseForm;
