import React, { useState } from "react";
import {
  FaHome, FaUser, FaCog, FaBars, FaBook, FaCalendarAlt,
  FaClipboardList, FaUsers, FaChalkboardTeacher
} from "react-icons/fa";

const AdminNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="hidden md:flex">
      <div
        className={`h-screen ${
          collapsed ? "w-16" : "w-64"
        } bg-gradient-to-r from-blue-500 to-purple-500 text-white fixed left-0 top-0 flex flex-col transition-all duration-300`}
      >
        {/* Top Section */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          {!collapsed && <span className="text-xl font-bold">ADMIN</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <FaBars className="text-xl" />
          </button>
        </div>

    
        <div className="">
          <p className={`text-sm uppercase font-semibold text-gray-400 ${collapsed ? "hidden" : "block"}`}>
            {!collapsed && <span className="text-black">Management</span>}
          </p>
        </div>

        
        <div className="flex-1 overflow-y-auto">
          <ul className="w-full">
            {/* Dashboard */}
            <li>
              <a href="AddStudent" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaHome className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Dashboard</span>}
              </a>
            </li>

            {/* Add Course */}
            <li>
              <a href="AddCourse" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaBook className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Add Course</span>}
              </a>
            </li>

            {/* View Course */}
            <li>
              <a href="ViewCourse" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaBook className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>View Course</span>}
              </a>
            </li>

           

            {/* Add Semester */}
            <li>
              <a href="AddSem" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaCalendarAlt className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Add Semester</span>}
              </a>
            </li>

            {/* View Semester */}
            <li>
              <a href="ViewSemester" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaCalendarAlt className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>View Semester Table</span>}
              </a>
            </li>

           

            

           

            {/* Add Students */}
            <li>
              <a href="StudentAdd" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaUsers className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Add Students</span>}
              </a>
            </li>

            {/* View Students */}
            <li>
              <a href="ViewStudent" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaUsers className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>View Students</span>}
              </a>
            </li>

           

            {/* Add Teacher */}
            <li>
              <a href="AddTeacher" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaChalkboardTeacher className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Add Teacher</span>}
              </a>
            </li>

            {/* View Teacher */}
            <li>
              <a href="ViewTeacher" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaChalkboardTeacher className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>View Teacher</span>}
              </a>
            </li>

           
            {/* Add Subject */}
            <li>
              <a href="/AddSubject" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaClipboardList className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Add Subject</span>}
              </a>
            </li>

            {/* View Subject */}
            <li>
              <a href="ViewSubject" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaClipboardList className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>View Subject</span>}
              </a>
            </li>
            <li>
                         <a href="/ReportM" className="flex items-center gap-3 p-3 hover:bg-[#c4db8f] rounded w-full justify-left">
                           <FaClipboardList className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                           {!collapsed && <span>Reports</span>}
                         </a>
            </li>

          </ul>
        </div>

        
        <div className="border-t border-gray-700 p-2">
          <ul className="w-full">
            <li>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaUser className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Profile</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full">
                <FaCog className={`transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}`} />
                {!collapsed && <span>Settings</span>}
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;
