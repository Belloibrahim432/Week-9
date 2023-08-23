import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async (): Promise<void> => {
  try {
    const PASSWORD = process.env.PASSWORD as string;
    const DATABASE_URL = process.env.MONGO_URI as string;

    const connect = await mongoose.connect(DATABASE_URL);
   
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err}`);
    
  }
};

export default connectDB;
