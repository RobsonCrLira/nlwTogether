import { Compliment } from "@entities/Compliment";
import { User } from "@entities/User";
import { AppError } from "@errors/AppError";
import { IComplimentRequest } from "@interfaces/IComplimentRequest";
import { UsersRepository } from "@user/UsersRepository";
import { getCustomRepository, Repository } from "typeorm";
import { ComplimentsRepository } from "./ComplimentsRepository";
import * as yup from "yup";
class CreateComplimentServices {
  private complimentRepository: Repository<Compliment>;
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.complimentRepository = getCustomRepository(ComplimentsRepository);
  }
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const schema = yup.object().shape({
      tag_id: yup.string().required(),
      user_receiver: yup.string().required(),
      message: yup.string().required(),
    });

    try {
      await schema.validate(
        {
          tag_id,
          user_receiver,
          message,
        },
        { abortEarly: false }
      );
    } catch (error) {
      throw new AppError(error);
    }

    if (user_sender === user_receiver) {
      throw new AppError("Incorrect  User Receiver");
    }

    const userReceiver = await this.usersRepository.findOne(user_receiver);

    if (!userReceiver) {
      throw new AppError("User Receiver does not exists");
    }

    const compliment = this.complimentRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await this.complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentServices };
