import { Document, Types } from 'mongoose';
import Book from './book.interface';

export default interface Genre extends Document {
    name: string;
    books: Types.ObjectId[]; 
}