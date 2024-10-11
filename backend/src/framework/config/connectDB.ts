import mongoose from "mongoose";
const MONGO_ATLAS_URL = process.env.MONGO_ATLAS_URL;

export const connectDB = async () => {
  try {
    const MONGODB_URL = process.env.MONGO_URL;
    await mongoose.connect(MONGODB_URL as string, {
      serverSelectionTimeoutMS: 30000,
    });
  } catch (error) {
    console.error("error in database", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to Database Successfully!!!");
});

mongoose.connection.on("disconnected", () => {
  console.log("Failed to Connect the  Database!!!");
});
