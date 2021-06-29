import auth from "@config/auth";
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
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, auth.secret) as IPayload;
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
