
import mongoose from "mongoose";

const semesterSchema = mongoose.Schema({
  id: String,
  semId: String,
  semName: String,
  createdBy: String,
  createdOn: String,
  updatedBy: String,
  updatedOn: String
});

const Semester = mongoose.model('semester', semesterSchema);
export default Semester;

