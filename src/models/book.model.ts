import mongoose, { Schema } from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 100 },
    isbn: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true }
});

const BookModel = mongoose.model('Book', BookSchema);

export { BookModel };