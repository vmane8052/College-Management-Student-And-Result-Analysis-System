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
import ViewCourse from "./Admin/ViewCourse";
import ViewSemester from "./Admin/ViewSemester";
import ViewStudent from "./Admin/ViewStudent"
import ViewTeacher from "./Admin/ViewTeacher";
import UpdateCourse from "./Admin/UpdateCourse";
import UpdateSemester from "./Admin/UpdateSemester";
import ViewSubject from "./Admin/ViewSubject";
import UpdateTeacher from "./Admin/UpdateTeacher";
import UpdateStudent from "./Admin/UpdateStudent";
import UpdateSubject from "./Admin/UpdateSubject";
import Login2 from "./components/Login2";
import StudentLogin from "./components/StudentLogin";
import StudentSideBar from "./Student/StudentSideBar";
import StudentMDashboard from "./Student/StudentMDashboard";
import ViewProfile from "./Student/ViewProfile";
import ViewMProfile from "./Student/ViewMProfile";
import ViewCourseSubject from "./Student/ViewCourseSubject";
import MarkMEntryForm from "./Student/MarkMEntryForm";
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherMDashboard from "./Teacher/TeacherMDashboard";
import TeacherViewMProfile from "./Teacher/TeacherViewMProfile";
import TeacherMViewSubject from "./Teacher/TeacherMViewSubject";
import TeacherMViewStudentList from "./Teacher/TeacherMViewStudentList";
import MCAStudents from "./Teacher/MCAStudents";
import MBAStudents from "./Teacher/MBAStudents";
import BCAStudents from "./Teacher/BCAStudents";
import BBAStudents from "./Teacher/BBAStudents";




function App() {
  return (
    <>
    
     
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login2" element={<Login2/>}/>
        <Route path="/AddStudent" element={<AddStudent/>}/>
        <Route path="/AddSubject" element={<AddSubject/>}/>
        <Route path="/AddCourse" element={<AddCourse/>}/>
        <Route path="/AddCourseForm" element={<AddCourse/>}/>
         <Route path="AddSem" element={<AddSem/>}/>
         <Route path="AddStudentForm" element={<AddStudentForm/>}/>
         <Route path="StudentAdd" element={<StudentAdd/>}/>
         <Route path="AddTeacher" element={<AddTeacher/>}/>
         <Route path="TeacherSidebar" element={<TeacherSidebar/>}/>
         <Route path="ViewCourse" element={<ViewCourse/>}/>
         <Route path="ViewSemester" element={<ViewSemester/>}/>
        
         <Route path="ViewStudent" element={<ViewStudent/>}/>
         <Route path="ViewTeacher" element={<ViewTeacher/>}/>
         <Route path="/UpdateCourse/:id" element={<UpdateCourse />} />
         <Route path="/UpdateSemester/:id" element={<UpdateSemester />} />
          <Route path="ViewSubject" element={<ViewSubject/>}/>
          <Route path="/UpdateTeacher/:id" element={<UpdateTeacher/>}/>
          <Route path="/UpdateStudent/:id" element={<UpdateStudent/>}/>
          <Route path="/UpdateSubject/:id" element={<UpdateSubject/>}/>
          <Route path="/StudentLogin" element={<StudentLogin/>}/>
          <Route path="/StudentSideBar" element={<StudentSideBar/>}/>
          <Route path="/StudentDashboard" element={<StudentMDashboard/>}/>
          <Route path="/ViewProfile" element={<ViewProfile/>}/>
          <Route path="/ViewMProfile" element={<ViewMProfile/>}/>
          <Route path="/ViewCourseSubject" element={<ViewCourseSubject/>}/>
          <Route path="/MarkMEntryForm" element={<MarkMEntryForm/>}/>
          <Route path="/TeacherLogin" element={<TeacherLogin/>}/>
          <Route path="/TeacherDashboard" element={<TeacherMDashboard/>}/>
          <Route path="/TeacherViewMProfile" element={<TeacherViewMProfile/>}/>
          <Route path="/TeacherMViewSubject" element={<TeacherMViewSubject/>}/>
          <Route path="/TeacherViewStudentList" element={<TeacherMViewStudentList/>}/>
          <Route path="/MCAStudents" element={<MCAStudents/>}/>
          <Route path="/MBAStudents" element={<MBAStudents/>}/>
          <Route path="/BCAStudents" element={<BCAStudents/>}/>
          <Route path="/BBAStudents" element={<BBAStudents/>}/>

        
      </Routes>
    </div>

    </>
  )
}

export default App;
