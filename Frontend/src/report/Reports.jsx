import React from "react";

const Reports = () => {
  return (
    <div className="relative min-h-screen">
      {/* Fullscreen background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/college.png')`,
        }}
      ></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-5xl w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Reports Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="/MCAToppersGraph"
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 text-center"
            >
              MCA Toppers Report
            </a>
            <a
              href="/MBAToppersGraph"
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 text-center"
            >
              MBA Toppers Report
            </a>
            <a
              href="/BCAToppersGraph"
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 text-center"
            >
              BCA Toppers Report
            </a>
            <a
              href="/BBAToppersGraph"
              className="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 text-center"
            >
              BBA Toppers Report
            </a>

            <a
              href="/MCAPassFailPieChart"
              className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 text-center"
            >
              MCA Pass/Fail Report
            </a>
            <a
              href="/MBAPassFailPieChart"
              className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 text-center"
            >
              MBA Pass/Fail Report
            </a>
            <a
              href="/BCAPassFailPieChart"
              className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 text-center"
            >
              BCA Pass/Fail Report
            </a>
            <a
              href="/BBAPassFailPieChart"
              className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 text-center"
            >
              BBA Pass/Fail Report
            </a>

            <a
              href="/TotalGenderGraph"
              className="bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 text-center"
            >
              Total Gender Strength Report
            </a>
            <a
              href="/GenderDistributionGraph"
              className="bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 text-center"
            >
              Course-wise Gender Strength Report
            </a>
            <a
              href="/CasteDistributionGraph"
              className="bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 text-center"
            >
              Caste-wise Report
            </a>
            <a
              href="/ReligionDistributionGraph"
              className="bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 text-center"
            >
              Religion-wise Report
            </a>
            <a
              href="/BloodGroupDistributionGraph"
              className="bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 text-center"
            >
              Blood Group-wise Report
            </a>
            
            <a
              href="/PercentageDistributionGraph"
              className="bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 text-center"
            >
              Course-wise Percentage Report
            </a>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-all duration-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;