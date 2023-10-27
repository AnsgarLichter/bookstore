import { Request, Response } from "express";

import { Books } from "../models/books.model";

export default class BooksController {
    async create(request: Request, response: Response) {
        try {
            response.status(201).json({
                reqBody: request.body
            });
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            return Books.find();
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async findById(request: Request, response: Response) {
        try {
            const id = request.params.id;

            return Books.findById(id);
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async update(request: Request, response: Response) {
        try {
            response.status(200).json({
                reqParamId: request.params.id,
                reqBody: request.body
            });
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            response.status(200).json({
                reqParamId: request.params.id
            });
        } catch (error) {
            response.status(500).json({
                message: "Internal Server error!"
            });
        }
    }
}