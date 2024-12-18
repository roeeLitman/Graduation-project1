import { connect } from "mongoose";
export const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log(error);
  }
};
