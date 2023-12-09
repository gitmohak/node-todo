import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URI, {
        dbName: "ToDo"
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(err);
    });
}