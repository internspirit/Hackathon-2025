import mongoose from "mongoose";
// require('dotenv')

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connection established")
        });
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
