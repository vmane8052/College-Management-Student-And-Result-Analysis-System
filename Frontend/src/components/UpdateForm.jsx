import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSemester = () => {
  const [formData, setFormData] = useState({
    id: "",
    semId: "",
    semName: "",
    createdBy: "",
    createdOn: "",
    updatedBy: "",
    updatedOn: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/semester/${id}`);
        console.log("Fetched data:", res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to fetch semester:", err);
      }
    };
    fetchSemester();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    ["id", "semId", "semName", "createdBy", "createdOn"].forEach((k) => {
      if (!formData[k]) errs[k] = "Required";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:8000/semester/${id}`, formData);
      alert("Semester updated successfully!");
      navigate("/ViewSemester");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/college.png')" }}
    >
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-lg bg-opacity-90">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Semester</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { lbl: "ID", name: "id", type: "text" },
            { lbl: "Semester Code", name: "semId", type: "text" },
            { lbl: "Created By", name: "createdBy", type: "text" },
            { lbl: "Created On", name: "createdOn", type: "date" },
            { lbl: "Updated By", name: "updatedBy", type: "text" },
            { lbl: "Updated On", name: "updatedOn", type: "date" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block font-medium">{f.lbl}</label>
              <input
                {...f}
                value={formData[f.name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors[f.name] && (
                <p className="text-red-500 text-sm">{errors[f.name]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block font-medium">SEM Name</label>
            <select
              name="semName"
              value={formData.semName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select SEM</option>
              {["SEM1", "SEM2", "SEM3", "SEM4", "SEM5", "SEM6"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.semName && (
              <p className="text-red-500 text-sm">{errors.semName}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-400 px-4 py-2 rounded text-white"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSemester;
