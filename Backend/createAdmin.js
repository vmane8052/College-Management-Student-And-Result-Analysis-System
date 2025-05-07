import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from './schema/admin-schema.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  const URL = process.env.MONGO_URI || 'mongodb://student:system@ac-t8bb9bw-shard-00-00.qww7iey.mongodb.net:27017,ac-t8bb9bw-shard-00-01.qww7iey.mongodb.net:27017,ac-t8bb9bw-shard-00-02.qww7iey.mongodb.net:27017/Student?ssl=true&replicaSet=atlas-11c3g2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

  try {
    await mongoose.connect(URL);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      createdBy: 'system',
      createdOn: new Date(),
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

createAdmin();