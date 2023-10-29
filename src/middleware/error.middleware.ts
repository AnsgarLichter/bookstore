import { Request, Response, NextFunction } from "express";

import HttpError from "../utils/httpError.error"

const errorMiddleware = (
    error: HttpError,
    request: Request,
    response: Response,
    _next: NextFunction
): void => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "An error occurred!";

    response.status(statusCode).json({
        message: message
    });
}

export default errorMiddleware;