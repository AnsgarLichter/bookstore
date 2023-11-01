import { NextFunction, Request, Response } from "express";
import AuthorService from "../services/author.service";
import { Types } from "mongoose";
import bind from "bind-decorator";

export default class AuthorController {
    private service = new AuthorService();

    @bind
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body;

            const author = await this.service.create(body.name);

            response.status(201).json(author);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            const authors = await this.service.findAll();

            response.json(authors);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = new Types.ObjectId(request.params.id);

            const author = await this.service.findById(id);

            response.json(author);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = new Types.ObjectId(request.params.id);
            const body = request.body;

            const updatedAuthor = await this.service.update(id, body.name);

            response.status(200).json(updatedAuthor);
        } catch (error) {
            next(error);
        }
    }

    @bind
    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = new Types.ObjectId(request.params.id);

            await this.service.delete(id);
            response.status(200);
        } catch (error) {
            next(error);
        }
    }
}