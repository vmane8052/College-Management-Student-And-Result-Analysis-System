import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import User from '../schema/user-schema.js';
import Semester from '../schema/semester-schema.js';
import Subject from '../schema/subject-schema.js';
import Student from '../schema/student-schema.js';
import Teacher from '../schema/teacher-schema.js';
import { loginAdmin, addAdmin } from '../controller/admin-controller.js';
import {
  addUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserByCourseId
} from '../controller/user-controller.js';
import {
  addSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
  getSemesterBySemId
} from '../controller/semester-controller.js';
import {
  addStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  loginStudent,
  getStudentByEmail
} from '../controller/student-controller.js';
import {
  addTeacher,
  getTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
  loginTeacher,
  getTeacherByEmail
} from '../controller/teacher-controller.js';
import {
  addSubject,
  getSubjects,
  getSubject,
  deleteSubject,
  updateSubject,
  getSubjectsByCourseIdAndSemesterId,
  getSubjectsByTeacherId
} from '../controller/subject-controller.js';
import {
  addStudentMarks,
  getStudentMarks,
  getAllStudentMarksByCourseAndSemester,
  updateStudentMarks,

} from '../controller/student-marks-controller.js';

const router = express.Router();

const upload = multer({ dest: 'Uploads/' });

// User Routes
router.post('/add', addUser);
router.get('/courses', getUsers);
router.get('/course/:id', getUser);
router.delete('/delete/:id', deleteUser);
router.put('/course/:id', updateUser);
router.get('/course/byCourseId/:courseId', getUserByCourseId);
router.post('/uploadExcel', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    await User.insertMany(rawData, { ordered: false });
    res.status(200).json({ message: 'Excel data uploaded successfully' });
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({ message: 'Duplicate course ID(s) detected in Excel file' });
    } else {
      res.status(500).json({ message: 'Failed to upload Excel file', error: error.message });
    }
  }
});

// Semester Routes
router.post('/semester/add', addSemester);
router.get('/semester/list', getSemesters);
router.get('/semester/:id', getSemester);
router.put('/semester/:id', updateSemester);
router.delete('/semester/delete/:id', deleteSemester);
router.get('/semester/bySemId/:semId', getSemesterBySemId);
router.post('/uploadSemesterExcel', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    await Semester.insertMany(data);
    res.status(200).json({ message: 'Semester Excel uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Excel upload failed', error: error.message });
  }
});

// Student Routes
router.post('/student/add', addStudent);
router.get('/students', getStudents);
router.get('/student/:id', getStudent);
router.delete('/student/delete/:id', deleteStudent);
router.put('/student/:id', updateStudent);
router.get('/student/email/:email', getStudentByEmail);
router.post('/student/login', loginStudent);
router.post('/uploadStudentExcel', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    // Validate required fields
    const requiredFields = ['studentId', 'firstName', 'lastName', 'email', 'createdBy', 'createdOn', 'password'];
    for (const row of data) {
      for (const field of requiredFields) {
        if (!row[field]) {
          throw new Error(`Missing required field '${field}' in Excel data`);
        }
      }
      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        throw new Error(`Invalid email format for student: ${row.email}`);
      }
      // Validate unique studentId and email (optional, MongoDB will handle this, but we can pre-check)
      const existingStudent = await Student.findOne({ $or: [{ studentId: row.studentId }, { email: row.email }] });
      if (existingStudent) {
        throw new Error(`Duplicate studentId (${row.studentId}) or email (${row.email}) found in Excel data`);
      }
    }

    await Student.insertMany(data);
    res.status(200).json({ message: 'Student Excel uploaded successfully' });
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({ message: `Duplicate studentId or email detected in Excel file: ${error.message}` });
    } else {
      res.status(500).json({ message: `Excel upload failed: ${error.message}` });
    }
  }
});

// Teacher Routes
router.post('/teacher/add', addTeacher);
router.get('/teachers', getTeachers);
router.get('/teacher/:id', getTeacher);
router.delete('/teacher/delete/:id', deleteTeacher);
router.put('/teacher/:id', updateTeacher);
router.post('/teacher/login', loginTeacher);
router.get('/teacher/email/:email', getTeacherByEmail);
router.get('/subjects/teacher/:teacherId', getSubjectsByTeacherId);
router.post('/uploadTeacherExcel', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    await Teacher.insertMany(data);
    res.status(200).json({ message: 'Teacher Excel uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Teacher Excel upload failed', error: error.message });
  }
});

// Subject Routes
router.post('/subject/add', addSubject);
router.get('/subjects', getSubjects);
router.get('/subject/:id', getSubject);
router.delete('/subject/delete/:id', deleteSubject);
router.put('/subject/:id', updateSubject);
router.get('/subjects/:courseId/:semesterId', getSubjectsByCourseIdAndSemesterId);
router.post('/uploadSubjectExcel', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    await Subject.insertMany(data);
    res.status(200).json({ message: 'Subject Excel uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Subject Excel upload failed', error: error.message });
  }
});

// Student Marks Routes
router.post('/student-marks/add', addStudentMarks);
router.get('/student-marks/:studentId/:courseId/:semesterId', getStudentMarks);
router.get('/student-marks/course/:courseId/semester/:semesterId', getAllStudentMarksByCourseAndSemester);
router.put('/student-marks/:studentId/:courseId/:semesterId', updateStudentMarks);

router.post("/admin/login", loginAdmin);
router.post("/admin/add", addAdmin);
export default router;