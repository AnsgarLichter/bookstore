import { Request, Response, NextFunction } from "express";

import HttpError from "../utils/httpError.error"
import logger from "./logger.middleware";

const errorMiddleware = (
    error: HttpError,
    request: Request,
    response: Response,
    _next: NextFunction
): void => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "An error occurred!";
    
    logger.info(`Caught http error with statusCode ${statusCode} and message ${message}.`);
    response.status(statusCode).json({
        message: message
    });
    logger.info(`Applied error properties to the response!`);
}

export default errorMiddleware;