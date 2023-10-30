import { BookModel } from "../models/book.model";
import Book from "../interfaces/book.interface";
import { ObjectId, Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import logger from "../middleware/logger.middleware";

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
            logger.error(error);
            throw new HttpError(500, `Book couldn't be created!`);
        }
    }

    public async findAll(): Promise<Book[]> {
        try {
            const books = await this.model.find();

            return books;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Books couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Book | null> {
        try {
            const book = await this.model.findById(id);

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be read!`);
        }
    }

    public async update(id: Types.ObjectId, title: string, isbn: string): Promise<Book | null> {
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
            logger.error(error);
            throw new HttpError(500, `Book couldn't be updated!`);
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            await this.model.deleteOne(id);
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be deleted!`);
        }
    }
}