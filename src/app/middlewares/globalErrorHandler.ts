/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaceses/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { errorlogger } from '../../shared/loger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handlerCastError from '../../errors/handlerCastError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log(`globalErrorHandler ~`, error)
    : errorlogger.error(`globalErrorHandler ~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'validationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handlerCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
