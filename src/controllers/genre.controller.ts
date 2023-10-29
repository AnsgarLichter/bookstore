import { Request, Response } from "express";
import { Types } from "mongoose";
import GenreService from "../services/genre.service";

export default class GenreController {
    private service = new GenreService();

    async create(request: Request, response: Response) {
        const body = request.body;

        const genre = await this.service.create(body.name);

        response.status(201).json(genre);
    }

    async findAll(request: Request, response: Response) {
        const genres = await this.service.findAll();

        response.json(genres);
    }

    async findById(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        const genre = await this.service.findById(id);

        response.json(genre);
    }

    async update(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);
        const body = request.body;

        const updatedGenre = await this.service.update(id, body.name);

        response.status(200).json(updatedGenre);
    }

    async delete(request: Request, response: Response) {
        const id = new Types.ObjectId(request.params.id);

        await this.service.delete(id);
        response.status(200);
    }
}