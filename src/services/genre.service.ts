import { ObjectId, Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import { GenreModel } from "../models/genre.model";
import Genre from "../models/genre.interface";

export default class GenreService {
    private model = GenreModel;

    public async create(name: string): Promise<Genre | null> {
        try {
            const genre = await this.model.create({
                name: name
            });

            return genre;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Genre couldn't be created!`);
        }
    }

    public async findAll(): Promise<Genre[]> {
        try {
            const genres = await this.model.find();

            return genres;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Genres couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Genre | null> {
        try {
            const genre = await this.model.findById(id);

            return genre;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Genre couldn't be read!`);
        }
    }

    public async update(id: Types.ObjectId, name: string): Promise<Genre | null> {
        try {
            const genre = await this.model.findByIdAndUpdate(
                id,
                {
                    name: name
                },
                {
                    returnDocument: 'after'
                });

            return genre;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Genre couldn't be updated!`);
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            await this.model.deleteOne(id);
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Genre couldn't be deleted!`);
        }
    }
}