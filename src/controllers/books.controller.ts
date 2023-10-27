import { Request, Response } from "express";

import { Books } from "../models/books.model";

export default class BooksController {
    async create(request: Request, response: Response) {
        try {
            const body = request.body;

            const book = await Books.create({
                title: body.title,
                isbn: body.isbn
            });

            response.status(201).json(book);
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const books = await Books.find({});

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

            const book = await Books.findById({ _id: id });

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

            const book = await Books.findByIdAndUpdate(
                id,
                {
                    title: body.title,
                    isbn: body.isbn
                },
                {
                    returnDocument: 'after'
                });

            response.status(200).json(book);
        } catch (error) {
            console.log(error);
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id;

            await Books.deleteOne({ _id: id });
            response.status(200);
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }
}