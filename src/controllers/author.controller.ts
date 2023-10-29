import { Request, Response } from "express";
import AuthorService from "../services/author.service";
import { Types } from "mongoose";

export default class AuthorController {
    private service = new AuthorService();

    async create(request: Request, response: Response) {
        const body = request.body;

        const author = await this.service.create(body.firstName, body.lastName);

        response.status(201).json(author);
    }

    async findAll(request: Request, response: Response) {
        const authors = await this.service.findAll();

        response.json(authors);
    }

    async findById(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        const author = await this.service.findById(id);

        response.json(author);
    }

    async update(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);
        const body = request.body;

        const updatedAuthor = await this.service.update(id, body.firstName, body.lastName);

        response.status(200).json(updatedAuthor);
    }

    async delete(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        await this.service.delete(id);
        response.status(200);
    }
}