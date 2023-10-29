import { BookModel } from "../models/book.model";
import Book from "../models/book.interface";
import { ObjectId } from "mongoose";

export default class BookService {
    private model = BookModel;

    public async create(title: string, isbn: string): Promise<Book | null> {
        try {
            const book = await this.model.create({
                title: title,
                isbn: isbn
            });

            return book;
        } catch (error) {
            console.log(error);
            throw new Error(`Book couldn't be created!`);
        }
    }

    public async findAll(): Promise<Book[]> {
        try {
            const books = await this.model.find();

            return books;
        } catch (error) {
            console.log(error);
            throw new Error(`Books couldn't be read!`);
        }
    }

    public async findById(id: ObjectId): Promise<Book | null> {
        try {
            const book = await this.model.findById(id);

            return book;
        } catch (error) {
            console.log(error);
            throw new Error(`Book couldn't be searched!`);
        }
    }

    public async update(id: string, title: string, isbn: string): Promise<Book | null> {
        try {
            const book = await this.model.findByIdAndUpdate(
                id,
                {
                    title: title,
                    isbn: isbn
                },
                {
                    returnDocument: 'after'
                });

            return book;
        } catch (error) {
            console.log(error);
            throw new Error(`Book couldn't be searched!`);
        }
    }

    public async delete(id: ObjectId): Promise<void> {
        try {
            await this.model.deleteOne(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Book couldn't be searched!`);
        }
    }
}