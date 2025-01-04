// db.ts
import mongoose from "mongoose";
//import Blog from 

export
const url: string = process.env.MONGO_URI as string;
let connection: typeof mongoose;

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function at the start of api routes and data fetches
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  if (!connection) {
    try {
      console.log("Connecting to MongoDB...");
      connection = await mongoose.connect(url);
      console.log("Connected to MongoDB!");
      return connection;
    } catch (errror){
      console.error("Error connecting:");
      throw new Error("database connection failed");
  }
}
};

export default connectDB;
