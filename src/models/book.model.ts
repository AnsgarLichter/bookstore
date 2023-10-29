import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    //author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    //genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

BookSchema.virtual("url").get(function () {
    return `/books/${this._id}`;
});

const BookModel = mongoose.model('Book', BookSchema);

export { BookModel };