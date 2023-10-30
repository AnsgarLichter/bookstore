import { Request, Response } from "express";
import BookService from "../services/book.service";
import { Types } from "mongoose";
import bind from "bind-decorator";

export default class BookController {
    private service = new BookService();

    @bind
    async create(request: Request, response: Response) {
        const body = request.body;
        console.log(request.body);
        const book = await this.service.create(body.title, body.isbn, body.author, body.genres);

        response.status(201).json(book);
    }

    @bind
    async findAll(request: Request, response: Response) {
        const books = await this.service.findAll();

        response.json(books);
    }

    @bind
    async findById(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        const book = await this.service.findById(id);

        response.json(book);
    }

    @bind
    async update(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);
        const body = request.body;

        const updatedBook = await this.service.update(id, body.title, body.isbn);

        response.status(200).json(updatedBook);
    }

    @bind
    async delete(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        await this.service.delete(id);
        response.status(200);
    }
}