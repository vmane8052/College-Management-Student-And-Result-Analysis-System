import Teacher from '../schema/teacher-schema.js';

// Add teacher
export const addTeacher = async (request, response) => {
  const formData = request.body;
  const newTeacher = new Teacher(formData);

  try {
    await newTeacher.save();
    response.status(201).json(newTeacher);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Get all teachers
export const getTeachers = async (request, response) => {
  try {
    const teachers = await Teacher.find();
    response.status(200).json(teachers);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Get single teacher by ID
export const getTeacher = async (request, response) => {
  try {
    const teacher = await Teacher.findById(request.params.id);
    if (!teacher) return response.status(404).json({ message: 'Teacher not found' });
    response.status(200).json(teacher);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Delete teacher
export const deleteTeacher = async (request, response) => {
  try {
    await Teacher.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Update teacher
export const updateTeacher = async (request, response) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).json(teacher);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
// Login teacher
export const loginTeacher = async (request, response) => {
  try {
    const { email, password } = request.body;
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return response.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.password !== password) {
      return response.status(401).json({ message: "Invalid password" });
    }

    response.status(200).json(teacher);
  } catch (error) {
    response.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Get teacher by email
export const getTeacherByEmail = async (request, response) => {
  try {
    const teacher = await Teacher.findOne({ email: request.params.email });
    if (!teacher) {
      return response.status(404).json({ message: "Teacher not found" });
    }
    response.status(200).json(teacher);
  } catch (error) {
    response.status(500).json({ message: "Failed to fetch teacher", error: error.message });
  }
};