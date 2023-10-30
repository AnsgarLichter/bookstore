import { BookModel } from "../models/book.model";
import Book from "../interfaces/book.interface";
import { Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import logger from "../middleware/logger.middleware";
import { AuthorModel } from "../models/author.model";
import { GenreModel } from "../models/genre.model";

export default class BookService {
    private bookModel = BookModel;
    private authorModel = AuthorModel;
    private genreModel = GenreModel;

    public async create(title: string, isbn: string, authorId: Types.ObjectId, genreIds: Types.ObjectId[]): Promise<Book | null> {
        try {
            const author = await this.authorModel.findById(authorId);
            if (!author) {
                logger.error(`No author found for the ID ${authorId}. An author is required to create a book.`);
                throw new HttpError(400, `An author is required to create a book. The author ${authorId} is invalid!`);
            }

            const validGenres = await this.genreModel.find({ _id: { $in: genreIds } }).exec();
            if (validGenres.length !== genreIds.length) {
                genreIds.forEach(genreId => {
                    if (!validGenres.find(validGenre => validGenre._id == genreId)) {
                        logger.error(`The genre ${genreId} is invalid!`);
                        throw new HttpError(400, `Please supply only valid genres. The genre ${genreId} is invalid!`);
                    }
                });
            }

            const book = await this.bookModel.create({
                title: title,
                isbn: isbn,
                author: author,
                genres: validGenres || []
            });

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be created!`);
        }
    }

    public async findAll(): Promise<Book[]> {
        try {
            const books = await this.bookModel.find();

            return books;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Books couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Book | null> {
        try {
            const book = await this.bookModel.findById(id);

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be read!`);
        }
    }

    public async update(id: Types.ObjectId, title: string, isbn: string): Promise<Book | null> {
        try {
            const book = await this.bookModel.findByIdAndUpdate(
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
            await this.bookModel.deleteOne(id);
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be deleted!`);
        }
    }
}