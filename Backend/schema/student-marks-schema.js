import mongoose from "mongoose";

const studentMarksSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  courseId: { type: String, required: true },
  semesterId: { type: String, required: true },
  
  subjects: [
    {
      subjectId: { type: String, required: true },
      subjectType: { type: String, enum: ["Theory", "Practical"], required: true },
      internal: { type: Number, default: 0 },
      external: { type: Number, default: 0 },
      practicalMarks: { type: Number, default: 0 },
      total: { type: Number, required: true },
      status: { type: String, enum: ["Pass", "Fail"], required: true },
    },
  ],
  grandTotal: { type: Number, required: true },
  percentage: { type: Number, required: true },
  overallResult: { type: String, enum: ["Pass", "Fail"], required: true },
  createdOn: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
});

export default mongoose.model("StudentMarks", studentMarksSchema);