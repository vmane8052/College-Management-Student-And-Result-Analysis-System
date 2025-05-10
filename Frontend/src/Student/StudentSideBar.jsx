import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars, FaBook, FaCalendarAlt, FaClipboardList, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

const StudentSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="hidden md:flex">

  
    <div
      className={`h-screen ${
        collapsed ? "w-16" : "w-64"
      } bg-blue-500 text-white  fixed left-0 top-0 flex flex-col transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {!collapsed && <span className="text-xl font-bold">Student <span className="pl-10">Dashboard</span> </span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Management Section */}
      <div className=" p-2">
        <p className={'text-sm uppercase font-semibold text-gray-400 ${collapsed ? "hidden" : "block"}'}>
        {!collapsed && <span className="text-black ">Management</span>}
        </p>
        <ul className="w-full">
        <li>
            <a href="" className="flex items-center gap-3 p-3 hover:bg-[#c4db8f] rounded w-full justify-left">
              <FaHome className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Dashboard</span>}
            </a>
          </li>
          
          
          <li>
            <a href="/ViewCourseSubject" className="flex items-center gap-3 p-3 hover:bg-[#c4db8f] rounded w-full justify-left">
              <FaClipboardList className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Course,sem and subject <br/></span>}
            </a>
          </li>
          <li>
            <a href="/MarkMEntryForm" className="flex items-center gap-3 p-3 hover:bg-[#c4db8f] rounded w-full justify-left">
              <FaClipboardList className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Mark Fill<br/></span>}
            </a>
          </li>
          <li>
            <a href="/FinalResult" className="flex items-center gap-3 p-3 hover:bg-[#c4db8f] rounded w-full justify-left">
              <FaClipboardList className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Final Result <br/></span>}
            </a>
          </li>
          

         
        </ul>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-left mt-40">
        <ul className="w-full">
         
          <li>
            <a href="/ViewMProfile" className="flex items-center gap-3 p-3 hover:bg-[#c4db8f] rounded w-full justify-left">
              <FaUser className={'transition-all duration-300 ${collapsed ? "text-4xl" : "text-2xl"}'} />
              {!collapsed && <span>Profile</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-3 hover:bg-[#c4db8f] rounded w-full justify-left">
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

export default StudentSideBar;