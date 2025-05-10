import mongoose from "mongoose";

const userSchema = mongoose.Schema({
 
  courseId: String,
  effectiveFrom: String,
  studentLimit: String,
  noOfDivision: String,
  noOfSemister: String,
  createdBy: String,
  createdOn: String,
  updatedBy: String,
  updatedOn: String,
  courseName: String
});

const user = mongoose.model('user', userSchema);

export default user;