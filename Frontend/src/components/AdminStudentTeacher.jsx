import React from 'react'

function AdminStudentTeacher() {
  return (
<>

<div>


    <div className="min-h-screen flex items-center justify-center bg-white-100 -my-32 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 md:w-3/4">
        
        {/* Admin Box */}
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg text-center hover:scale-105 transition ">
          <h2 className="text-2xl font-bold">Admin</h2>
          <p className="mt-2">Manage users, courses, Teacher and system settings.</p>
          <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200">
           <a href='/AdminLogin'> Login </a>
          </button>
        </div>
        {/* Teacher Box */}
        <div className="bg-yellow-500 text-white p-8 rounded-lg shadow-lg text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold">Teachers</h2>
          <p className="mt-2">Manage students, Review Mark and check .</p>
          <button className="mt-4 bg-white text-yellow-500 px-4 py-2 rounded-lg hover:bg-gray-200">
           <a href='/TeacherLogin'> Login </a>
          </button>
        </div>

        {/* Student Box */}
        <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold">Students</h2>
          <p className="mt-2">Access courses, Teacher , Subject and Fill Mark </p>
          <button className="mt-4 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-gray-200">
            <a href='/StudentLogin'>
            Login
            </a>
          </button>
        </div>

        
        
        
      </div>
    </div>
  
</div>
</>
  )
}

export default AdminStudentTeacher
