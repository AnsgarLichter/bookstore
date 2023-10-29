import { Request, Response } from "express";
import BookService from "../services/book.service";
import { ObjectId } from "mongoose";

export default class BookController {
    private service = new BookService();

    async create(request: Request, response: Response) {
        try {
            const body = request.body;

            const book = await this.service.create(body.title, body.isbn);

            response.status(201).json(book);
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const books = await this.service.findAll();

            response.json(books);
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async findById(request: Request, response: Response) {
        try {
            const id = request.params.id;

            const book = await this.service.findById(id);

            response.json(book);
        } catch (error) {
            console.log(error);
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const id = request.params.id;
            const body = request.body;

            const updatedBook = await this.service.update(id, body.title, body.isbn);

            response.status(200).json(updatedBook);
        } catch (error) {
            console.log(error);
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id as ObjectId;

            await this.service.delete(id);
            response.status(200);
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }
}