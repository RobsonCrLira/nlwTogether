import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IPayload } from "@interfaces/IPayload";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Unauthorized", 401);
  }
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, auth.secret) as IPayload;
    request.user_id = sub;
    return next();
  } catch (error) {
    throw new AppError("Unauthorized", 401);
  }
}
