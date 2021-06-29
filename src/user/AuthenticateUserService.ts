import auth from "@config/auth";
import { IAuthenticateRequest } from "@interfaces/IAuthenticateRequest";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "./UsersRepository";

class AuthenticateUserServices {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ email });
    if (!user) {
      throw new Error("Email/Password Incorrect !");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password Incorrect !");
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
