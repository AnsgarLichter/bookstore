import { Document } from 'mongoose';

export default interface Book extends Document {
    title: string;
    isbn: string;
}