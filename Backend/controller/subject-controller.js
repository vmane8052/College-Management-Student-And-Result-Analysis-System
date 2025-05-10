import Subject from '../schema/subject-schema.js';

// Add subject
export const addSubject = async (request, response) => {
  const formData = request.body;

  // Validate subjectType
  if (formData.subjectType && !["Theory", "Practical"].includes(formData.subjectType)) {
    return response.status(400).json({ message: "Invalid subject type. Must be 'Theory' or 'Practical'." });
  }

  const newSubject = new Subject(formData);

  try {
    await newSubject.save();
    response.status(201).json(newSubject);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Get all subjects
export const getSubjects = async (request, response) => {
  try {
    const subjects = await Subject.find();
    response.status(200).json(subjects);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Get single subject by ID
export const getSubject = async (request, response) => {
  try {
    const subject = await Subject.findById(request.params.id);
    if (!subject) return response.status(404).json({ message: 'Subject not found' });
    response.status(200).json(subject);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Delete subject
export const deleteSubject = async (request, response) => {
  try {
    await Subject.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Update subject
export const updateSubject = async (request, response) => {
  const formData = request.body;

  // Validate subjectType
  if (formData.subjectType && !["Theory", "Practical"].includes(formData.subjectType)) {
    return response.status(400).json({ message: "Invalid subject type. Must be 'Theory' or 'Practical'." });
  }

  try {
    const subject = await Subject.findByIdAndUpdate(request.params.id, formData, { new: true });
    response.status(200).json(subject);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// New function to get subjects by courseId and semesterId
export const getSubjectsByCourseIdAndSemesterId = async (request, response) => {
  const { courseId, semesterId } = request.params;

  try {
    const subjects = await Subject.find({ courseId, semesterId });
    if (!subjects || subjects.length === 0) {
      return response.status(404).json({ message: 'No subjects found for this course and semester' });
    }
    response.status(200).json(subjects);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
};

// Get subjects by teacherId
export const getSubjectsByTeacherId = async (request, response) => {
  try {
    const subjects = await Subject.find({ teacherId: request.params.teacherId });
    if (!subjects || subjects.length === 0) {
      return response.status(404).json({ message: 'No subjects found for this teacher' });
    }
    response.status(200).json(subjects);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch subjects', error: error.message });
  }
};