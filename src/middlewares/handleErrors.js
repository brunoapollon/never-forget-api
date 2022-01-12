import 'express-async-errors';

import { AppError } from '../errors/AppError';

function handleErros(err, request, response, next) {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: err.statusCode, error: err.message });
  }
  return response
    .status(500)
    .json({ status: 500, messgae: 'Internal server error' });
}

export { handleErros };
