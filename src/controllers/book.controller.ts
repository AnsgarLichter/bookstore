import { Request, Response } from "express";
import BookService from "../services/book.service";
import { Schema } from "mongoose";

export default class BookController {
    private service = new BookService();

    async create(request: Request, response: Response) {
        const body = request.body;

        const book = await this.service.create(body.title, body.isbn);

        response.status(201).json(book);
    }

    async findAll(request: Request, response: Response) {
        const books = await this.service.findAll();

        response.json(books);
    }

    async findById(request: Request, response: Response) {
        const id = new Schema.Types.ObjectId(request.params.id);

        const book = await this.service.findById(id);

        response.json(book);
    }

    async update(request: Request, response: Response) {
        const id = new Schema.Types.ObjectId(request.params.id);
        const body = request.body;

        const updatedBook = await this.service.update(id, body.title, body.isbn);

        response.status(200).json(updatedBook);
    }

    async delete(request: Request, response: Response) {
        const id = new Schema.Types.ObjectId(request.params.id);

        await this.service.delete(id);
        response.status(200);
    }
}