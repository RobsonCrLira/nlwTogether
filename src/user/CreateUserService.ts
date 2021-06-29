import { AppError } from "@errors/AppError";
import { IUserRequest } from "@interfaces/IUserRequest";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "./UsersRepository";
import * as yup from "yup";

class CreateUserServices {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
      admin: yup.boolean().notRequired(),
    });

    try {
      await schema.validate(
        { name, email, password, admin },
        { abortEarly: false }
      );
    } catch (error) {
      throw new AppError(error);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new AppError("Email/Password Incorrect !");
    }

    if (!password) {
      throw new AppError("Email/Password Incorrect !");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
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
