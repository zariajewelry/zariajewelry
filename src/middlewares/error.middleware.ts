import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';
import { errorResponse } from '../utils/response';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.warn(`[${req.method}] ${req.path} >> ${err.message}`);
    
    return res
      .status(err.statusCode)
      .json(errorResponse(err.message, err.isOperational ? undefined : err));
  } 


  logger.error(`[${req.method}] ${req.path} >> ${err.message}`, { 
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });

  return res.status(500).json(
    errorResponse('Something went wrong', 
      process.env.NODE_ENV === 'development' ? err : undefined
    )
  );
};


export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
};