import mongoose from "mongoose";
import { serverConfig } from ".";

export async function connectDB() {
    try {
        await mongoose.connect(serverConfig.MONGODB_URI);
    } catch (error) {
        process.exit(1);
    }
}