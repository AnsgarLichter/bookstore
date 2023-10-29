import { Document, ObjectId, Types } from 'mongoose';

export default interface Author extends Document {
    firstName: string;
    familyName: string;
    books: Types.ObjectId[];
}