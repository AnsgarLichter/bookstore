import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

AuthorSchema.virtual("name").get(function () {
    if (!this.firstName || !this.familyName) {
        return "";
    }

    return `${this.familyName}, ${this.firstName}`;
});

AuthorSchema.virtual("url").get(function () {
    return `authors/${this._id}`;
});


const AuthorModel = mongoose.model("Author", AuthorSchema);

export { AuthorModel };