import Admin from "../schema/admin-schema.js";
import bcrypt from "bcrypt";

// Function to login admin
export const loginAdmin = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Log the incoming request
    console.log(`Login request received: email=${email}, password=${password}`);

    // Check total number of admins in the database
    console.log("Counting admins in database...");
    const adminCount = await Admin.countDocuments();
    console.log(`Total admins in database: ${adminCount}`);

    // Fetch all admins to debug
    console.log("Fetching all admins...");
    const allAdmins = await Admin.find();
    console.log("All admins in database:", allAdmins);

    // Find admin by email (case-insensitive)
    console.log(`Searching for admin with email: ${email}`);
    const admin = await Admin.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    console.log("Admin found:", admin);

    if (!admin) {
      console.log("Admin not found, returning 404...");
      return response.status(404).json({ message: "Admin not found" });
    }

    // Check if the password field exists and is a string
    console.log("Checking password field...");
    if (!admin.password || typeof admin.password !== "string") {
      console.log("Password field is missing or invalid:", admin);
      return response.status(500).json({ message: "Invalid admin record: password missing or invalid" });
    }

    // Compare password (plain text comparison since the password is not hashed)
    console.log(`Comparing passwords: stored=${admin.password}, provided=${password}`);
    if (admin.password !== password) {
      console.log("Passwords do not match, returning 401...");
      return response.status(401).json({ message: "Invalid password" });
    }

    // Return response in the same format as student login
    console.log("Login successful, sending response...");
    response.status(200).json({ message: "Login successful", email: admin.email });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    console.error("Full error:", error);
    response.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Function to add an admin directly to the database (for initial setup)
export const addAdmin = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Log the incoming request
    console.log(`Add admin request received: email=${email}, password=${password}`);

    // Check if admin already exists (case-insensitive)
    console.log("Checking if admin already exists...");
    const existingAdmin = await Admin.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin);
      return response.status(400).json({ message: "Admin with this email already exists" });
    }

    // Create new admin (not hashing the password to match the existing database entry)
    console.log("Creating new admin...");
    const newAdmin = new Admin({
      email,
      password,
    });

    // Save to database
    console.log("Saving admin to database...");
    await newAdmin.save();
    console.log("Admin saved successfully:", newAdmin);

    response.status(201).json({ message: "Admin created successfully", email });
  } catch (error) {
    console.error("Error during admin creation:", error.message);
    console.error("Full error:", error);
    response.status(500).json({ message: "Failed to create admin", error: error.message });
  }
};

// Function to fetch an admin by email
export const getAdmin = async (request, response) => {
  try {
    const { email } = request.params;

    // Log the email being searched
    console.log(`Fetching admin with email: ${email}`);

    // Check total number of admins in the database
    console.log("Counting admins in database...");
    const adminCount = await Admin.countDocuments();
    console.log(`Total admins in database: ${adminCount}`);

    // Fetch all admins to debug
    console.log("Fetching all admins...");
    const allAdmins = await Admin.find();
    console.log("All admins in database:", allAdmins);

    // Find admin by email (case-insensitive)
    console.log(`Searching for admin with email: ${email}`);
    const admin = await Admin.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!admin) {
      console.log("Admin not found, returning 404...");
      return response.status(404).json({ message: "Admin not found" });
    }

    console.log("Admin fetched successfully:", admin);
    response.status(200).json({
      message: "Admin fetched successfully",
      email: admin.email,
      password: admin.password, // For debugging purposes
    });
  } catch (error) {
    console.error("Error fetching admin:", error.message);
    console.error("Full error:", error);
    response.status(500).json({ message: "Error fetching admin", error: error.message });
  }
};