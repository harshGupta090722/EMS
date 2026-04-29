import mongoose, { connect } from "mongoose";


export const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("connect to database")
    } catch (error) {
        console.log(error);
    }
}