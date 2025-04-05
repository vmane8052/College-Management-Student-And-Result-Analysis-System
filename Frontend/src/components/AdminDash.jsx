import React from 'react'

function AdminDash() {
  return (
    <>
    <div>
<div
  className="  flex items-center  justify-center min-h-screen bg-center bg-no-repeat sm:bg-contain md:bg-cover lg:bg-cover"
  style={{
    backgroundImage: "url('./public/college.png')", // Public folder image
    backgroundSize: "cover", // Keeps the original size
    backgroundAttachment: "fixed", // Prevents scrolling
    backgroundPosition: "right", // Centers the image
  }}>
    <h1 className=' flex items-center justify-center font-bold text-4xl  bg-gradient-to-r from-blue-500 to-purple-500 text-white mt-10 mr-80 ml-80 mt-20 mb-96 pl-10'>
      ADMIN DASHBOARD
    </h1>
  </div>
</div>
    </>
  )
}

export default AdminDash
