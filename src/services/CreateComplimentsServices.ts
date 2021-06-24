import { Compliment } from "@entities/Compliment";
import { User } from "@entities/User";
import { IComplimentRequest } from "@interfaces/IComplimentRequest";
import { ComplimentsRepository } from "@repositories/ComplimentsRepository";
import { UsersRepositories } from "@repositories/UsersRepository";
import { getCustomRepository, Repository } from "typeorm";

class CreateComplimentServices {
  private complimentRepository: Repository<Compliment>;
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepositories);
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
