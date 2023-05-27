import {Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

export const errorMiddleware = (
    error: Error & Partial<ApiError>, //define que nem todos os atributos podem vir
    request: Request,
    response: Response, 
    nextFunction: NextFunction
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message: 'Internal server Error'

    return response.status(statusCode).json({ message: message })
}