import Admin from "../schema/admin-schema.js";
import bcrypt from "bcrypt";

export const loginAdmin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return response.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return response.status(401).json({ message: "Invalid email or password" });
    }
    response.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};