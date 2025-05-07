import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    courseId: "",
    courseName: "",
    effectiveFrom: "",
    studentLimit: "",
    noOfDivision: "",
    noOfSemester: "",
    createdBy: "",
    createdOn: "",
    updatedBy: "",
    updatedOn: "",
  });
  const [excelFile, setExcelFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setExcelFile(e.target.files[0]);

  const validate = () => {    
    const errs = {};

    ["id","courseId","courseName","createdBy","createdOn"].forEach((k) => {
      if (!formData[k]) errs[k] = "Required";
    });
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    
    if (excelFile) {
      const fd = new FormData();
      fd.append("file", excelFile);
      try {
        const r = await fetch("http://localhost:8000/uploadExcel", {
          method: "POST",
          body: fd,
        });
        alert((await r.json()).message);
      } catch {
        alert("Excel upload failed");
      }
    }

    
    try {
      await axios.post("http://localhost:8000/add", formData);
      alert("Course Added Successfully!");
      navigate("/ViewCourse");
    } catch (err) {
      alert("Add course failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/college.png')", backgroundAttachment: "fixed" }}>
      <div className="w-full max-w-lg bg-white bg-opacity-90 p-8 rounded shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Add Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { lbl:"ID", name:"id", type:"text" },
            { lbl:"Course Code", name:"courseId", type:"text" },
            { lbl:"Effective From", name:"effectiveFrom", type:"date" },
            { lbl:"Student Limit", name:"studentLimit", type:"number" },
            { lbl:"No. of Divisions", name:"noOfDivision", type:"number" },
            { lbl:"No. of Semesters", name:"noOfSemester", type:"number" },
            { lbl:"Created By", name:"createdBy", type:"text" },
            { lbl:"Created On", name:"createdOn", type:"date" },
            { lbl:"Updated By", name:"updatedBy", type:"text" },
            { lbl:"Updated On", name:"updatedOn", type:"date" },
          ].map(({lbl,name,type})=>(
            <div key={name}>
              <label className="block text-gray-700">{lbl}</label>
              <input
                type={type} name={name}
                value={formData[name]} onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-gray-700">Course Name</label>
            <select
              name="courseName" value={formData.courseName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
            </select>
            {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Upload Excel File</label>
            <input
              type="file" accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded cursor-pointer"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button" onClick={()=>window.history.back()}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >Back</button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
