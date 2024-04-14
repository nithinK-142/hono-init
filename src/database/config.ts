import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(String(process.env.MONGODB_URI));
    console.log("Connected");
  } catch (error: any) {
    console.log(error.message);
  }
}
