import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  subjectId: String,
  subjectName: String,
  courseId: String,
  semesterId: String,
  teacherId: String,
  credit: String,
  internalMinMarks: String,
  internalMaxMarks: String,
  externalMinMarks: String,
  externalMaxMarks: String,
  effectiveForm: String,
  createdBy: String,
  createdOn: String,
  updatedBy: String,
  updatedOn: String
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;