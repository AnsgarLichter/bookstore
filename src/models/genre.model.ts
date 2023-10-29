import mongoose, { Schema } from "mongoose";

const GenreSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

GenreSchema.virtual("url").get(function () {
    return `/genres/${this._id}`;
});

const GenreModel = mongoose.model('Genre', GenreSchema);

export { GenreModel };