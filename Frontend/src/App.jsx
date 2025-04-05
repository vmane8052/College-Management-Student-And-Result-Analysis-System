import React from "react";
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom"

import Signup from "./components/Signup";
import AdminNavabar1 from "./components/AdminNavabar1";
import SubjectForm from "./components/SubjectForm";
import AddStudent from "./Admin/AddStudent";
import AddSubject from "./Admin/AddSubject";
import AddCourse from "./Admin/AddCourse";
import AddSem from "./Admin/AddSem";
import AddStudentForm from "./components/AddStudentForm"
import StudentAdd from "./Admin/StudentAdd";
import AddTeacher from "./Admin/AddTeacher";
import TeacherSidebar from "./Teacher/TeacherSidebar";



function App() {
  return (
    <>
    
     
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/AddStudent" element={<AddStudent/>}/>
        <Route path="/AddSubject" element={<AddSubject/>}/>
        <Route path="/AddCourse" element={<AddCourse/>}/>
        <Route path="/AddCourseForm" element={<AddCourse/>}/>
         <Route path="AddSem" element={<AddSem/>}/>
         <Route path="AddStudentForm" element={<AddStudentForm/>}/>
         <Route path="StudentAdd" element={<StudentAdd/>}/>
         <Route path="AddTeacher" element={<AddTeacher/>}/>
         <Route path="TeacherSidebar" element={<TeacherSidebar/>}/>
      </Routes>
    </div>

    </>
  )
}

export default App;
