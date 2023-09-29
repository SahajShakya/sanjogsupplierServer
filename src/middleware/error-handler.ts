import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (true) {
    case typeof err === "string":
      // custom application error
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ status: 400, message: err });
    case err.name === "ValidationError":
      // mongoose validation error
      return res.status(400).json({ message: err.message, status: 400 });
    case err.name === "UnauthorizedError":
      // jwt authentication error
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    default:
      return res.status(500).json({ message: err.message, status: 500 });
  }
};
