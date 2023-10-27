import mongoose from "mongoose";

const connectionUrl = "mongodb+srv://lichteransgar:<password>@cluster0.fahxqjk.mongodb.net/?retryWrites=true&w=majority";

export default class Database {
    public static async connect() {
        try {
            await mongoose.connect(connectionUrl);
        } catch (error) {
            console.error(`Connection to MongoDB failed: ${error}`);
            throw error;
        }
    }
}

mongoose.set("strictQuery", false);


