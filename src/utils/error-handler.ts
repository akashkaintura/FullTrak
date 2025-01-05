import { Response } from 'express';
import logger from './logger';

export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const handleErrorResponse = (res: Response, error: any) => {
    logger.error(error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
    }

    res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    });
};

export const catchAsync = (fn: Function) => {
    return (req: any, res: Response, next: Function) => {
        fn(req, res, next).catch(next);
    };
};