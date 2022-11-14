import type { ErrorRequestHandler } from "express";
import { ValidationError } from "joi";
import CustomErrorHandler from "../utils/CustomErrorHandler";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;

  // default error msg
  let data: object = {
    message: "Internal Server Error",
    errorMessage: err.message,
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    let data = {
      errorMessage: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      errorMessage: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler