import Semester from '../schema/semester-schema.js';

// Add semester
export const addSemester = async (request, response) => {
  const formData = request.body;
  const newSemester = new Semester(formData);

  try {
    await newSemester.save();
    response.status(201).json(newSemester);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Get all semesters
export const getSemesters = async (request, response) => {
  try {
    const semesters = await Semester.find();
    response.status(200).json(semesters);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Get single semester
export const getSemester = async (request, response) => {
  try {
    const semester = await Semester.findById(request.params.id);
    if (!semester) return response.status(404).json({ message: 'Semester not found' });
    response.status(200).json(semester);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Update semester
export const updateSemester = async (request, response) => {
  try {
    const semester = await Semester.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).json(semester);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Delete semester
export const deleteSemester = async (request, response) => {
  try {
    await Semester.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: 'Semester deleted successfully' });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// New function to get semester by semId
export const getSemesterBySemId = async (request, response) => {
  const { semId } = request.params;

  try {
    const semester = await Semester.findOne({ semId: { $regex: `^${semId}$`, $options: 'i' } });
    if (!semester) {
      return response.status(404).json({ message: `Semester not found for semId: ${semId}` });
    }
    response.status(200).json(semester);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching semester', error: error.message });
  }
};
