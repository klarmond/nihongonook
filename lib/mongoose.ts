import mongoose from "mongoose";

let iseConnected = false; // check if mongoose is connected bro


export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if(!process.env.MONGODB_URL) return console.log("MONGODB_URL NOT FOUND");

    if(iseConnected) return console.log("Connected already");

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        iseConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}