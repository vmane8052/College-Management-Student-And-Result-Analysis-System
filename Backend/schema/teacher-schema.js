import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  teacherId: String,
  firstName: String,
  lastName: String,
  dob: String,
  joiningDate: String,
  gender: String,
  email: String,
  mobileNumber: String,
  qualification: String,
  subjectSpecialization: String,
  password: String,
  createdBy: String,
  createdOn: String,
  updatedBy: String,
  updatedOn: String
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;