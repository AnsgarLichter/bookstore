import { NextFunction, Request, Response } from "express";
import BookService from "../services/book.service";
import { Types } from "mongoose";
import bind from "bind-decorator";
import AuthorService from "../services/author.service";
import Author from "../interfaces/author.interface";
import HttpError from "../utils/httpError.error";
import logger from "../middleware/logger.middleware";

export default class BookController {
    private bookService = new BookService();
    private authorService = new AuthorService();

    @bind
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body;
            const author: Author = body.author;

            const validAuthor: Author = await this.authorService.findByName(author.name) || await this.authorService.create(author.name);
            const book = await this.bookService.create(body.title, body.isbn, validAuthor);

            response.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            const books = await this.bookService.findAll();

            response.json(books);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = new Types.ObjectId(request.params.id);

            const book = await this.bookService.findById(id);

            response.json(book);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async findByIdAndReturnAuthor(request: Request, response: Response, next: NextFunction) {
        try {
            const id = new Types.ObjectId(request.params.id);

            const book = await this.bookService.findById(id);

            response.json(book?.author);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = new Types.ObjectId(request.params.id);
            const body = request.body;

            const updatedBook = await this.bookService.update(id, body.title, body.isbn, body.author);

            response.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = new Types.ObjectId(request.params.id);

            const book = await this.bookService.findById(id);
            if (!book) {
                return response.status(200).send();
            }

            await this.bookService.delete(id);
            const author = await this.authorService.findById(book.author);
            if (!author?.books?.length) {
                await this.authorService.delete(id);
            }

            response.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}