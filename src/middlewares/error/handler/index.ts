import APIError from '../../../models/APIError';

/**
 * An error handler must have 4 parameters:
 *
 * err -> the error object;
 *
 * req -> the request object;
 *
 * res -> the response object;
 *
 * next -> a function to call to continue the execution of the application.
 *
 * If a error handler does not has the four parameters, it will not be called.
 * */
const errorHandler: ErrorMiddleware = async (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof APIError) {
    return res.status(err.status).json({
      message: err.message
    });
  }

  return res.status(500).json({
    message: 'Something went wrong, please try again later.'
  });
};

export default errorHandler;
