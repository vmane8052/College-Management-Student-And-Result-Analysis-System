import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  motherName: { type: String },
  dob: { type: Date },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String },
  admissionDate: { type: Date },
  address: { type: String },
  createdBy: { type: String, required: true },
  createdOn: { type: Date, required: true },
  updatedBy: { type: String },
  updatedOn: { type: Date },
  rollNo: { type: String },
  gender: { type: String },
  password: { type: String, required: true },
  nationality: { type: String },
  religion: { type: String },
  casteCategory: { type: String },
  bloodGroup: { type: String },
  courseId: { type: String },
  semesterId: { type: String }
});

export default mongoose.model('Student', studentSchema);