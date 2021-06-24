import { User } from "@entities/User";
import { IAuthenticateRequest } from "@interfaces/IAuthenticateRequest";
import { UsersRepositories } from "@repositories/UsersRepository";
import { compare } from "bcryptjs";
import { getCustomRepository, Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

class AuthenticateUserServices {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }
  async execute({ email, password }: IAuthenticateRequest) {
    const user = await this.usersRepository.findOne({ email });
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
