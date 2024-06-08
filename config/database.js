import mongoose from "mongoose";

let connected = false;
const connectDB = async () => {
    mongoose.set("strictQuery", true);
  if (connected) {
    console.log("mongodb is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("mongodb is connected successfully");
  } catch (error) {
    console.log("error in connecting db");
    console.log(error.message);
  }
};

export default connectDB;