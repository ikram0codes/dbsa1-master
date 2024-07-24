import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //Set The DB Name name as previous
    await mongoose.connect(process.env.MONGO_URL, { dbName: "menka" });
    console.log("data base connected successfully");
  } catch (error) {
    console.log(`Error : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
