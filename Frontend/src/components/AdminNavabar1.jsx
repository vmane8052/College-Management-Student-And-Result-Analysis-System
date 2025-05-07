import React from 'react'
import { FaHome, FaUser, FaCog, FaBars, FaBook, FaCalendarAlt, FaClipboardList, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

function AdminNavabar1() {
  return (
   <>
   <div className="navbar bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm md:hidden">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow bg-opacity-90 font-bold">
        <li><a href='/AddStudent'>Dashboard</a></li>
        <li><a href='/AddCourse'>Add Course</a></li>
        <li><a href='/ViewCourse'>View Course</a></li>
        <li><a href='/AddSem'>Add Semister</a></li>
        <li><a href='/AddSubject'>Add Subject</a></li>
        <li><a href='StudentAdd'>Add Student</a></li>
        <li><a href='AddTeacher'>Add Teacher</a></li>
        <li><a href=''>Settings</a></li>

      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl text-white">ADMIN DASHBOARD</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button>
    <button className="btn btn-ghost btn-circle">
  <div>
     <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded w-full justify-left">
    <FaUser className={'transition-all duration-300 ${collapsed ? "text-6xl" : "text-2xl"}'} />
                   
                 </a>
  </div>
    </button>
  </div>
</div>
   </>
  )
}

export default AdminNavabar1
