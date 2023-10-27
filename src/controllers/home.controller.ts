import { Request, Response } from "express";

export function welcome(request: Request, response: Response): Response {
    return response.send('Hello, TypeScript Express!');
}