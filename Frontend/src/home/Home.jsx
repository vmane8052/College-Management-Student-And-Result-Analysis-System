import React from 'react'
import Navbar from '../components/navbar'
import Baner from '../components/Baner'
import Footer from '../components/Footer'
import AdminStudentTeacher from '../components/AdminStudentTeacher'

function Home() {
  return (
    <>
    <div>
      <Navbar/>
      <Baner/>
      <AdminStudentTeacher/>
      <Footer/>
    </div>
    </>
  )
}

export default Home
