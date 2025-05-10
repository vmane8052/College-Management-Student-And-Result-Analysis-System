import StudentMarks from '../schema/student-marks-schema.js';

// Add student marks
export const addStudentMarks = async (request, response) => {
  const marksData = request.body;

  try {
    const existingMarks = await StudentMarks.findOne({
      studentId: marksData.studentId,
      courseId: marksData.courseId,
      semesterId: marksData.semesterId,
    });

    if (existingMarks) {
      return response.status(400).json({ message: "Marks already submitted for this student, course, and semester" });
    }

    const newMarks = new StudentMarks(marksData);
    await newMarks.save();
    response.status(201).json(newMarks);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// Update student marks and set isApproved to true
export const updateStudentMarks = async (request, response) => {
  const { studentId, courseId, semesterId } = request.params;
  const updatedMarksData = request.body;

  console.log("Received update request:", { studentId, courseId, semesterId, updatedMarksData }); // Debug log

  try {
    const updatedMarks = await StudentMarks.findOneAndUpdate(
      { studentId, courseId, semesterId },
      { ...updatedMarksData, isApproved: true }, // Set isApproved to true on update
      { new: true, runValidators: true }
    );

    if (!updatedMarks) {
      console.log("Marks not found for:", { studentId, courseId, semesterId });
      return response.status(404).json({ message: "Marks not found for this student, course, and semester" });
    }

    console.log("Updated marks:", updatedMarks);
    response.status(200).json(updatedMarks);
  } catch (error) {
    console.error("Error updating marks:", error); // Debug log
    response.status(409).json({ message: error.message });
  }
};

// Get student marks by studentId, courseId, and semesterId
export const getStudentMarks = async (request, response) => {
  const { studentId, courseId, semesterId } = request.params;

  try {
    const marks = await StudentMarks.findOne({ studentId, courseId, semesterId });
    if (!marks) {
      return response.status(404).json({ message: "Marks not found" });
    }
    response.status(200).json(marks);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get all student marks for a course and semester (for teacher view)
export const getAllStudentMarksByCourseAndSemester = async (request, response) => {
  const { courseId, semesterId } = request.params;

  try {
    const marks = await StudentMarks.find({ courseId, semesterId });
    response.status(200).json(marks);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};