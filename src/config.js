import { connect } from "mongoose";


const connectDb = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
};

export default connectDb;
