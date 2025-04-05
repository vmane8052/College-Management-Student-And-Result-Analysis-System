import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars, FaBook, FaCalendarAlt, FaClipboardList, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

const AdminNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="hidden md:flex">

  
    <div
      className={`h-screen ${
        collapsed ? "w-16" : "w-64"
      } bg-gradient-to-r from-blue-500 to-purple-500 text-white  fixed left-0 top-0 flex flex-col transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {!collapsed && <span className="text-xl font-bold">ADMIN </span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Management Section */}
      <div className="border-b border-gray-700 p-2">
        <p className={'text-sm uppercase font-semibold text-gray-400 ${collapsed ? "hidden" : "block"}'}>
        {!collapsed && <span className="text-black ">Management</span>}
        </p>
        <ul className="w-full">
        <li>
            <a href="AddStudent" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaHome className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a href="AddCourse" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaBook className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Add Course</span>}
            </a>
          </li>
          <li>
            <a href="AddSem" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaCalendarAlt className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Add Semester</span>}
            </a>
          </li>
          <li>
            <a href="/AddSubject" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaClipboardList className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Add Subject</span>}
            </a>
          </li>
          <li>
            <a href="StudentAdd" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaUsers className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Add Students</span>}
            </a>
          </li>
          <li>
            <a href="AddTeacher" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaChalkboardTeacher className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Add Teacher</span>}
            </a>
          </li>
        </ul>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-left">
        <ul className="w-full">
         
          <li>
            <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaUser className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Profile</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
              <FaCog className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Settings</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default AdminNavbar;