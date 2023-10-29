import { Types } from "mongoose";
import HttpError from "../utils/httpError.error";
import { AuthorModel } from "../models/author.model";
import Author from "../interfaces/author.interface";

export default class AuthorService {
    private model = AuthorModel;

    public async create(firstName: string, familyName: string): Promise<Author | null> {
        try {
            const author = await this.model.create({
                firstName: firstName,
                familyName: familyName
            });

            return author;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Author couldn't be created!`);
        }
    }

    public async findAll(): Promise<Author[]> {
        try {
            const authors = await this.model.find();

            return authors;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Author couldn't be read!`);
        }
    }

    public async findById(id: Types.ObjectId): Promise<Author | null> {
        try {
            const author = await this.model.findById(id);

            return author;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Author couldn't be read!`);
        }
    }

    public async update(id: Types.ObjectId, firstName: string, familyName: string): Promise<Author | null> {
        try {
            const author = await this.model.findByIdAndUpdate(
                id,
                {
                    firstName: firstName,
                    familyName: familyName
                },
                {
                    returnDocument: 'after'
                });

            return author;
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Author couldn't be updated!`);
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            await this.model.deleteOne(id);
        } catch (error) {
            console.log(error);
            throw new HttpError(500, `Author couldn't be deleted!`);
        }
    }
}