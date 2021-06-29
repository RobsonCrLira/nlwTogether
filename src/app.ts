import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { routes } from "./routes";

import "./database";
import { AppError } from "./errors/AppError";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/nlw06", routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error${err.message}`,
    });
  }
);

export { app };
