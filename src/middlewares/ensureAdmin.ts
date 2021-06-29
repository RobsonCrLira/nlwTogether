import { AppError } from "@errors/AppError";
import { UsersRepository } from "@user/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const userRepositories = getCustomRepository(UsersRepository);

  const admin = await userRepositories.findOne(user_id);

  if (admin) {
    return next();
  }
  throw new AppError("Unauthorized", 401);
}
