export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFound = (resource: string) => {
  return new AppError(`${resource} not found`, 404);
};

export const badRequest = (message: string) => {
  return new AppError(message, 400);
};

export const unauthorized = (message = 'Unauthorized') => {
  return new AppError(message, 401);
};

export const forbidden = (message = 'Forbidden') => {
  return new AppError(message, 403);
};