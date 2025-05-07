import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  createdBy: { type: String },
  createdOn: { type: Date },
  updatedBy: { type: String },
  updatedOn: { type: Date },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;