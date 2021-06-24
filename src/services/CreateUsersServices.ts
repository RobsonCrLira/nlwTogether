import { User } from "@entities/User";
import { IUserRequest } from "@interfaces/IUserRequest";
import { UsersRepositories } from "@repositories/UsersRepository";
import { hash } from "bcryptjs";
import { getCustomRepository, Repository } from "typeorm";

class CreateUsersServices {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
  }

  async execute({ name, email, password, admin = false }: IUserRequest) {
    if (!email) {
      throw new Error("Email Incorrect !");
    }

    if (!password) {
      throw new Error("Password Incorrect !");
    }

    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const passwordHash = await hash(password, 8);
    const user = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
export { CreateUsersServices };
