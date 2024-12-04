import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaceses/error';

const handlerCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessage: errors,
  };
};

export default handlerCastError;
