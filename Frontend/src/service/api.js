import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
// Student Marks API calls
export const addStudentMarks = async (marksData) => {
  return await axios.post(`${API_BASE_URL}/student-marks/add`, marksData);
};

export const getStudentMarks = async (studentId, courseId, semesterId) => {
  return await axios.get(`${API_BASE_URL}/student-marks/${studentId}/${courseId}/${semesterId}`);
};
export const updateStudentMarks = async (studentId, courseId, semesterId, marksData) => {
  return await axios.put(`${API_BASE_URL}/student-marks/${studentId}/${courseId}/${semesterId}`, marksData);
};

export const getAllStudentMarksByCourseAndSemester = async (courseId, semesterId) => {
  return await axios.get(`${API_BASE_URL}/student-marks/course/${courseId}/semester/${semesterId}`);
};





// User API calls
export const addUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/add`, userData);
};

export const getUsers = async () => {
  return await axios.get(`${API_BASE_URL}/courses`);
};

export const getUser = async (id) => {
  return await axios.get(`${API_BASE_URL}/course/${id}`);
};

export const updateUser = async (id, userData) => {
  return await axios.put(`${API_BASE_URL}/course/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_BASE_URL}/delete/${id}`);
};

export const uploadUserExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.post(`${API_BASE_URL}/uploadExcel`, formData);
};
export const getUserByCourseId = async (courseId) => {
  return await axios.get(`${API_BASE_URL}/course/byCourseId/${courseId}`);
};

// Semester API calls
export const addSemester = async (semesterData) => {
  return await axios.post(`${API_BASE_URL}/semester/add`, semesterData);
};

export const getSemesters = async () => {
  return await axios.get(`${API_BASE_URL}/semester/list`);
};

export const getSemester = async (id) => {
  return await axios.get(`${API_BASE_URL}/semester/${id}`);
};

export const updateSemester = async (id, semesterData) => {
  return await axios.put(`${API_BASE_URL}/semester/${id}`, semesterData);
};

export const deleteSemester = async (id) => {
  return await axios.delete(`${API_BASE_URL}/semester/delete/${id}`);
};

export const uploadSemesterExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.post(`${API_BASE_URL}/uploadSemesterExcel`, formData);
};
export const getSemesterBySemId = async (semId) => {
  return await axios.get(`${API_BASE_URL}/semester/bySemId/${semId}`);
};

// Student API calls
export const addStudent = async (studentData) => {
  return await axios.post(`${API_BASE_URL}/student/add`, studentData);
};

export const getStudents = async () => {
  return await axios.get(`${API_BASE_URL}/students`);
};

export const getStudent = async (id) => {
  return await axios.get(`${API_BASE_URL}/student/${id}`);
};

export const updateStudent = async (id, studentData) => {
  return await axios.put(`${API_BASE_URL}/student/${id}`, studentData);
};

export const deleteStudent = async (id) => {
  return await axios.delete(`${API_BASE_URL}/student/delete/${id}`);
};

export const uploadStudentExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.post(`${API_BASE_URL}/uploadStudentExcel`, formData);
};

export const loginStudent = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/student/login`, credentials);
};

export const getStudentByEmail = async (email) => {
  return await axios.get(`${API_BASE_URL}/student/email/${email}`);
};


// Teacher API calls


export const addTeacher = async (teacherData) => {
  return await axios.post(`${API_BASE_URL}/teacher/add`, teacherData);
};

export const getTeachers = async () => {
  return await axios.get(`${API_BASE_URL}/teachers`);
};

export const getTeacher = async (id) => {
  return await axios.get(`${API_BASE_URL}/teacher/${id}`);
};

export const updateTeacher = async (id, teacherData) => {
  return await axios.put(`${API_BASE_URL}/teacher/${id}`, teacherData);
};

export const deleteTeacher = async (id) => {
  return await axios.delete(`${API_BASE_URL}/teacher/delete/${id}`);
};


export const uploadTeacherExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.post(`${API_BASE_URL}/uploadTeacherExcel`, formData);
};
export const loginTeacher = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/teacher/login`, credentials);
};
export const getTeacherByEmail = async (email) => {
  return await axios.get(`${API_BASE_URL}/teacher/email/${email}`);
};

// Subject API calls
export const addSubject = async (subjectData) => {
  return await axios.post(`${API_BASE_URL}/subject/add`, subjectData);
};

export const getSubjects = async () => {
  return await axios.get(`${API_BASE_URL}/subjects`);
};

export const getSubject = async (id) => {
  return await axios.get(`${API_BASE_URL}/subject/${id}`);
};

export const updateSubject = async (id, subjectData) => {
  return await axios.put(`${API_BASE_URL}/subject/${id}`, subjectData);
};

export const deleteSubject = async (id) => {
  return await axios.delete(`${API_BASE_URL}/subject/delete/${id}`);
};

export const uploadSubjectExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.post(`${API_BASE_URL}/uploadSubjectExcel`, formData);
};


export const getSubjectsByCourseIdAndSemesterId = async (courseId, semesterId) => {
  return await axios.get(`${API_BASE_URL}/subjects/${courseId}/${semesterId}`);
};

export const getSubjectsByTeacherId = async (teacherId) => {
  return await axios.get(`${API_BASE_URL}/subjects/teacher/${teacherId}`);
};





// Admin Login
export const loginAdmin = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/admin/login`, credentials);
};

