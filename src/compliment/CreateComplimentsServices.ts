import { Compliment } from "@entities/Compliment";
import { User } from "@entities/User";
import { IComplimentRequest } from "@interfaces/IComplimentRequest";
import { UsersRepository } from "@user/UsersRepository";
import { getCustomRepository, Repository } from "typeorm";
import { ComplimentsRepository } from "./ComplimentsRepository";

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
    if (user_sender === user_receiver) {
      throw new Error("Incorrect  User Receiver");
    }

    const userReceiver = await this.usersRepository.findOne(user_receiver);

    if (!userReceiver) {
      throw new Error("User Receiver does not exists");
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
