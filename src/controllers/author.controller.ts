import { Request, Response } from "express";
import AuthorService from "../services/author.service";
import { Types } from "mongoose";
import bind from "bind-decorator";

export default class AuthorController {
    private service = new AuthorService();

    @bind
    async create(request: Request, response: Response) {
        const body = request.body;

        const author = await this.service.create(body.firstName, body.familyName);

        response.status(201).json(author);
    }

    @bind
    async findAll(request: Request, response: Response) {
        const authors = await this.service.findAll();

        response.json(authors);
    }

    @bind
    async findById(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        const author = await this.service.findById(id);

        response.json(author);
    }

    @bind
    async update(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);
        const body = request.body;

        const updatedAuthor = await this.service.update(id, body.firstName, body.lastName);

        response.status(200).json(updatedAuthor);
    }

    @bind
    async delete(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        await this.service.delete(id);
        response.status(200);
    }
}