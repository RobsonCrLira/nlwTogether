import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IAuthenticateRequest } from "@interfaces/IAuthenticateRequest";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "./UsersRepository";
import * as yup from "yup";
class AuthenticateUserServices {
  async execute({ email, password }: IAuthenticateRequest) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
    });

    try {
      await schema.validate({ email, password }, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("Email/Password Incorrect !");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email/Password Incorrect !");
    }
    const token = sign(
      {
        email: user.email,
      },
      auth.secret,
      {
        subject: user.id,
        expiresIn: auth.tokenExpiryTimeInSeconds,
      }
    );
    return token;
  }
}
export { AuthenticateUserServices };
