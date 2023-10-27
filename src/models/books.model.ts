import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    //author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    //genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

BooksSchema.virtual("url").get(function () {
    return `/books/${this._id}`;
});

const Books = mongoose.model('Books', BooksSchema);

export { Books };