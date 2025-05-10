import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  courseId: { type: String, required: true },
  semesterId: { type: String, required: true },
  teacherId: { type: String },
  credit: { type: Number },
  subjectType: { type: String, enum: ["Theory", "Practical"], default: "Theory" }, 
  internalMinMarks: { type: Number },
  internalMaxMarks: { type: Number },
  externalMinMarks: { type: Number },
  externalMaxMarks: { type: Number },
  effectiveForm: { type: String },
  createdBy: { type: String, required: true },
  createdOn: { type: Date, required: true },
  updatedBy: { type: String },
  updatedOn: { type: Date },
});

export default mongoose.model("Subject", subjectSchema);