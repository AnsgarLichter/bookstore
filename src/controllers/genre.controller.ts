import { Request, Response } from "express";
import { Types } from "mongoose";
import GenreService from "../services/genre.service";
import bind from "bind-decorator";

export default class GenreController {
    private service = new GenreService();

    @bind
    async create(request: Request, response: Response) {
        const body = request.body;

        const genre = await this.service.create(body.name);

        response.status(201).json(genre);
    }

    @bind
    async findAll(request: Request, response: Response) {
        const genres = await this.service.findAll();

        response.json(genres);
    }

    @bind
    async findById(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        const genre = await this.service.findById(id);

        response.json(genre);
    }

    @bind
    async update(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);
        const body = request.body;

        const updatedGenre = await this.service.update(id, body.name);

        response.status(200).json(updatedGenre);
    }

    @bind
    async delete(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        await this.service.delete(id);
        response.status(200);
    }
}