import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    
    const ADMIN_EMAIL = "admin4407@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    
    if (formData.email !== ADMIN_EMAIL) {
      setError("Admin not found");
      return;
    }

    if (formData.password !== ADMIN_PASSWORD) {
      setError("Invalid password");
      return;
    }

    // Login successful
    try {
      localStorage.setItem("adminEmail", formData.email);
      alert("Login successful");
      navigate("/AddStudent");
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  const handleBack = () => {
    navigate("/"); // Go back
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
      <div className="w-full max-w-md bg-white bg-opacity-90 shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;