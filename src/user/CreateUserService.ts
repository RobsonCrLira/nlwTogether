import { IUserRequest } from "@interfaces/IUserRequest";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "./UsersRepository";

class CreateUserServices {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    if (!email) {
      throw new Error("Email Incorrect !");
    }

    if (!password) {
      throw new Error("Password Incorrect !");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const passwordHash = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}
export { CreateUserServices };
