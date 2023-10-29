import mongoose from "mongoose";

const connectionUrl = "mongodb+srv://lichteransgar:qNXAYYqRQEpM5poI@cluster0.fahxqjk.mongodb.net/?retryWrites=true&w=majority";

export default class Database {
    public static async connect() {
        try {
            await mongoose.connect(connectionUrl);
            console.log("Successfully connected to MongoDB.");
        } catch (error) {
            console.error(`Connection to MongoDB failed: ${error}`);
            throw error;
        }
    }
}

mongoose.set("strictQuery", false);


