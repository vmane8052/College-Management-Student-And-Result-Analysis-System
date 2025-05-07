import mongoose from "mongoose";

const connection = async (username, password) => {
  const URL ='mongodb://student:system@ac-t8bb9bw-shard-00-00.qww7iey.mongodb.net:27017,ac-t8bb9bw-shard-00-01.qww7iey.mongodb.net:27017,ac-t8bb9bw-shard-00-02.qww7iey.mongodb.net:27017/Student?ssl=true&replicaSet=atlas-11c3g2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};

export default connection;