import { BookModel } from "../models/book.model";
import Book from "../interfaces/book.interface";
import { Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import logger from "../middleware/logger.middleware";
import AuthorService from "./author.service";
import GenreService from "./genre.service";
import Genre from "../interfaces/genre.interface";
import Author from "../interfaces/author.interface";

export default class BookService {
    private bookModel = BookModel;

    private authorService = new AuthorService();
    private genreService = new GenreService();

    public async create(title: string, isbn: string, authorId: Types.ObjectId, genreIds: Types.ObjectId[]): Promise<Book | null> {
        if (!authorId.toString().trim() || genreIds.length === 0) {
            logger.error(`To create a book an author and at least 1 genre must be supplied.`);
            throw new HttpError(400, `To create a book an author and at least 1 genre must be supplied.`);
        }

        const author = this.findAuthorById(authorId);
        const genres = this.findGenresByIds(genreIds);

        try {
            const book = await this.bookModel.create({
                title: title,
                isbn: isbn,
                author: author,
                genres: genres
            });

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be created!`);
        }
    }

    public async findAll(): Promise<Book[]> {
        try {
            const books = await this.bookModel.find()
                .populate("author")
                .populate("genres");;

            return books;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Books couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Book | null> {
        try {
            const book = await this.bookModel.findById(id)
                .populate("author")
                .populate("genres");

            return book;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be read!`);
        }
    }

    public async findByIds(ids: Types.ObjectId[] | undefined) {
        try {
            const books = await this.bookModel.find({ _id: { $in: ids } }).exec();

            return books;
        } catch (error) {
            logger.error(error);
            throw new HttpError(500, `Book couldn't be read!`);
        }
    }

    public async update(
        id: Types.ObjectId,
        title?: string,
        isbn?: string,
        authorId?: Types.ObjectId,
        genreIds?: Types.ObjectId[]
    ): Promise<Book | null> {
        try {
            const propertiesToUpdate = await this.parseProperties(
                title,
                isbn,
                authorId,
                genreIds
            );
            if (Object.keys(propertiesToUpdate).length === 0) {
                logger.warn(`No properties supplied to update. Therefore no update is triggered!`);
                return await this.findById(id);
            }

            const book = await this.bookModel.findByIdAndUpdate(
                id,
                {
                    title: title,
                    isbn: isbn
                },
                {
                    returnDocument: 'after'
                })
                .populate("author")
                .populate("genres");

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

    private async findAuthorById(id: Types.ObjectId): Promise<Author | null> {
        const author = await this.authorService.findById(id);
        if (!author) {
            logger.error(`No author found for the ID ${id}. An author is required to create a book.`);
            throw new HttpError(400, `An author is required to create a book. The author ${id} is invalid!`);
        }

        return author;
    }

    private async findGenresByIds(ids: Types.ObjectId[]): Promise<Genre[] | null> {
        const validGenres = await this.genreService.findByIds(ids);
        if (validGenres?.length !== ids.length) {
            ids.forEach(id => {
                if (!validGenres?.find(validGenre => validGenre._id == id)) {
                    logger.error(`The genre ${id} is invalid!`);
                    throw new HttpError(400, `Please supply only valid genres. The genre ${id} is invalid!`);
                }
            });
        }

        return validGenres;
    }

    private async parseProperties(
        title?: string,
        isbn?: string,
        authorId?: Types.ObjectId,
        genreIds?: Types.ObjectId[]
    ): Promise<Object> {
        const propertiesToUpdate: { [key: string]: any } = {}

        if (title) {
            propertiesToUpdate[`title`] = title;
        }

        if (isbn) {
            propertiesToUpdate[`isbn`] = isbn;
        }

        if (authorId) {
            const author = await this.findAuthorById(authorId);
            propertiesToUpdate[`author`] = author;
        }

        if (genreIds && genreIds.length > 0) {
            const genres = await this.findGenresByIds(genreIds);
            propertiesToUpdate[`genres`] = genres;
        }

        return propertiesToUpdate;
    }
}