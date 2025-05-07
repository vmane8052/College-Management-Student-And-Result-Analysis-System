import Student from '../schema/student-schema.js';

// Add student
export const addStudent = async (request, response) => {
  const formData = request.body;
  const newStudent = new Student(formData);

  try {
    await newStudent.save();
    response.status(201).json(newStudent);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Get all students
export const getStudents = async (request, response) => {
  try {
    const students = await Student.find();  
    response.status(200).json(students);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Get single student by ID
export const getStudent = async (request, response) => {
  try {
    const student = await Student.findById(request.params.id);
    if (!student) return response.status(404).json({ message: 'Student not found' });
    response.status(200).json(student);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Delete student
export const deleteStudent = async (request, response) => {
  try {
    await Student.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Update student
export const updateStudent = async (request, response) => {
  try {
    const student = await Student.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).json(student);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Student login using email
export const loginStudent = async (request, response) => {
  const { email, password } = request.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return response.status(404).json({ message: 'Student not found' });
    }
    if (student.password !== password) {
      return response.status(401).json({ message: 'Invalid password' });
    }
    response.status(200).json({ message: 'Login successful', email: student.email });
  } catch (error) {
    response.status(500).json({ message: 'Login failed', error: error.message });
  }
};
// New function to get student by email
export const getStudentByEmail = async (request, response) => {
  const { email } = request.params;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return response.status(404).json({ message: 'Student not found' });
    }
    response.status(200).json(student);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching student', error: error.message });
  }
};
