import { Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import { AuthorModel } from "../models/author.model";
import Author from "../interfaces/author.interface";
import logger from "../middleware/logger.middleware";
import Book from "../interfaces/book.interface";
import BookService from "./book.service";

export default class AuthorService {
    private model = AuthorModel;

    private bookService = new BookService();

    public async create(firstName: string, familyName: string, bookIds?: Types.ObjectId[]): Promise<Author | null> {
        try {
            const books = await this.findBooksByIds(bookIds);

            const author = await this.model.create({
                firstName: firstName,
                familyName: familyName,
                books: books
            });

            return author;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be created!`);
        }
    }

    public async findAll(): Promise<Author[]> {
        try {
            const authors = await this.model.find();

            return authors;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Author | null> {
        try {
            const author = await this.model.findById(id);

            return author;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be read!`);
        }
    }

    public async update(id: Types.ObjectId, firstName: string, familyName: string): Promise<Author | null> {
        try {
            const author = await this.model.findByIdAndUpdate(
                id,
                {
                    firstName: firstName,
                    familyName: familyName
                },
                {
                    returnDocument: 'after'
                });

            return author;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be updated!`);
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            await this.model.deleteOne(id);
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Author couldn't be deleted!`);
        }
    }

    private async findBooksByIds(ids: Types.ObjectId[] | undefined): Promise<Book[] | null> {
        if (!ids || ids.length === 0) {
            return null;
        }

        const books = await this.bookService.findByIds(ids);
        ids.forEach(id => {
            if (!books?.find(book => book._id === id)) {
                logger.error(`The book id ${id} is invalid!`);
                throw new HttpError(400, `The book id ${id} is invalid!`);
            }
        });

        return books;
    }
}